import type {ProteinConfig,Organization,Representation,ResidueId} from './types';
import {parseResidue} from './core';
import {continuity,networkState,stretchNetwork,releaseNetwork,type NetworkCondition} from './damage';
declare const $3Dmol:any;
export class Molecule {
 viewer:any;model:any;organization:Organization='monomer';representation:Representation='combined';selected:ResidueId|null=null;selectedChain:string|null=null;focus='';labels=true;reduced=false;separated=false;completed:string[]=[];
 network=networkState();confidence=false;assemblyProgress=3;onSelect:(id:ResidueId,chain:string)=>void=()=>{};
 private text='';private version=0;private initialView:number[]=[];private observer:ResizeObserver;private animation=0;
 constructor(public element:HTMLElement,public config:ProteinConfig){
  this.viewer=$3Dmol.createViewer(element,{backgroundColor:'#17130e',backgroundAlpha:0,antialias:true});this.viewer.setZoomLimits(12,420);
  this.observer=new ResizeObserver(()=>this.viewer.resize());this.observer.observe(element);
  element.addEventListener('pointerdown',()=>cancelAnimationFrame(this.animation));
 }
 async load(org:Organization='monomer',preserve=true){
  const version=++this.version,old=this.model?this.viewer.getView():null;
  if(!this.text){const r=await fetch(this.config.models.monomer);if(!r.ok)throw Error('Falta el modelo local de AlphaFold');this.text=await r.text();}if(version!==this.version)return;
  this.organization=org;this.viewer.clear();
  this.model=this.viewer.addModel(org==='complex'?'':this.text,'pdb',{keepH:false});
  // Never transform or invent atomic coordinates. Mature view only hides the signal sequence.
  for(const atom of this.atoms())atom.ss='c';
  this.viewer.setClickable({chain:'A',hetflag:false},true,(atom:any)=>this.onSelect(`A${atom.resi}`,'A'));
  this.applyStyle();this.fit();if(preserve&&old){const view=this.viewer.getView();for(let i=4;i<8;i++)view[i]=old[i];this.viewer.setView(view);}
  if(!this.reduced)this.element.animate([{opacity:.4},{opacity:1}],{duration:350});
 }
 atoms(selection:any={}){return this.model?.selectedAtoms(selection)||[];}
 applyStyle(){
  if(!this.model)return;const v=this.viewer;v.removeAllLabels();v.removeAllShapes();v.removeAllSurfaces();v.setStyle({},{});
  if(this.organization==='complex'){this.drawNetwork();v.render();return;}
  const sel=this.organization==='binary'?{chain:'A',resi:Array.from({length:760},(_,i)=>i+27)}:{chain:'A'};
  const color=this.confidence?undefined:'#efba69',colorscheme=this.confidence?{prop:'b',gradient:new $3Dmol.Gradient.RWB(0,100)}:undefined;
  if(this.representation==='sticks')v.setStyle(sel,{stick:{radius:.1,color,colorscheme},sphere:{scale:.18,color,colorscheme}});
  else v.setStyle(sel,{cartoon:{style:'trace',thickness:.5,color,colorscheme},sphere:{radius:.24,color,colorscheme}});
  if(this.representation==='combined')v.addStyle({and:[sel,{resn:'LYS'}]},{stick:{radius:.13,color:'#fbda91'}});
  if(this.representation==='surface'){const version=this.version;v.addSurface($3Dmol.SurfaceType.SAS,{opacity:.35,color:'#d49a4a'},sel).then(()=>{if(version===this.version)v.render();});}
  if(this.organization==='monomer')v.addStyle({resi:Array.from({length:26},(_,i)=>i+1)},{cartoon:{color:'#82928c'}});
  if(this.focus==='lysine'||this.representation==='bridges')v.addStyle({resn:'LYS'},{stick:{color:'#f7e7bd',radius:.2},sphere:{color:'#f7e7bd',scale:.3}});
  if(this.selected){const n=parseResidue(this.selected)!.resi;v.addStyle({chain:'A',resi:n},{stick:{color:'white',radius:.25},sphere:{color:'white',scale:.4}});const atom=this.atoms({chain:'A',resi:n,atom:'CA'})[0];if(atom&&this.labels)v.addLabel(`${this.selected} · ${atom.resn} · pLDDT ${atom.b.toFixed(1)}`,{position:atom,fontSize:14,fontColor:'white',backgroundColor:'#382515',backgroundOpacity:.9});}
  v.render();
 }
 private drawNetwork(){
  const v=this.viewer,e=this.network.extension,condition=this.network.condition;
  // Abstract fibers: no residues, no atom names, no implied native cross-link topology.
  for(let row=0;row<5;row++){
   const points=Array.from({length:33},(_,i)=>({x:(i-16)*2*(1+e*.75),y:(row-2)*9+Math.sin(i*.55+row)*3*(1-e*.7),z:Math.cos(i*.4+row)*3}));
   for(let i=1;i<points.length;i++)if(continuity(condition,i+row*2))v.addCylinder({start:points[i-1],end:points[i],radius:.58,color:row%2?'#d88c4c':'#f4c675',fromCap:1,toCap:1});
   for(const i of [6,16,26])if(row<4&&continuity(condition,i+row*2)){const p=points[i],q={...p,y:p.y+9};if(this.assemblyProgress>=3)v.addCylinder({start:p,end:q,radius:.28,color:'#e9e6c8'});if(this.assemblyProgress>=2)v.addSphere({center:p,radius:.95,color:'#f6edd6'});}
  }
  if(this.labels)v.addLabel(condition==='proteolysis'?'Cortes simbólicos · NO son sitios medidos':condition==='conformational'?'Cambio de disposición · cadena continua':'Red esquemática · NO son átomos',{position:{x:0,y:29,z:0},fontSize:14,fontColor:'#fff1ce',backgroundColor:'#382515',backgroundOpacity:.8});
 }
 setNetwork(condition:NetworkCondition=this.network.condition,extension=this.network.extension){this.network=stretchNetwork(networkState(condition),extension);this.applyStyle();}
 release(){const from=this.network.extension,target=releaseNetwork(this.network);this.network=target;if(this.reduced||from===target.extension){this.applyStyle();return;}const t0=performance.now();cancelAnimationFrame(this.animation);const frame=(now:number)=>{const t=Math.min(1,(now-t0)/650);this.network={...target,extension:from+(target.extension-from)*(1-(1-t)**3)};this.applyStyle();if(t<1)this.animation=requestAnimationFrame(frame);};this.animation=requestAnimationFrame(frame);}
 select(id:ResidueId,chain='A'){this.selected=id;this.selectedChain=chain;this.applyStyle();const n=parseResidue(id)!.resi;this.viewer.zoomTo({chain,resi:[Math.max(1,n-3),n,n+3]},this.reduced?0:600);}
 focusRegion(focus:string){this.focus=focus;this.selected=null;this.applyStyle();if(this.organization!=='complex')this.viewer.zoomTo({},this.reduced?0:500);}
 setRepresentation(rep:Representation){this.representation=rep;this.applyStyle();}
 fit(scale=this.element.clientWidth<480?.85:1.1){this.viewer.zoomTo();this.viewer.zoom(scale);this.initialView=[...this.viewer.getView()];this.viewer.render();}
 reset(){cancelAnimationFrame(this.animation);this.viewer.setView(this.initialView);this.viewer.render();}
 rotate(x:number,y:number,_cancel=true){this.viewer.rotate(x,'y');this.viewer.rotate(y,'x');}
 pan(x:number,y:number){this.viewer.translateScene(x,y);}
 zoom(factor:number){this.viewer.zoom(factor);}
 dispose(){cancelAnimationFrame(this.animation);this.observer.disconnect();this.viewer.clear();this.element.innerHTML='';}
}
