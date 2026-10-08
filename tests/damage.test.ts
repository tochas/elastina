import {describe,it,expect} from 'vitest';
import {networkState,stretchNetwork,releaseNetwork,continuity,damageQuestion} from '../src/damage';
describe('Comparación didáctica de integridad de red',()=>{
 it('limita la entrada de estiramiento sin unidades físicas inventadas',()=>{
  expect(stretchNetwork(networkState(),Infinity).extension).toBe(0);
  expect(stretchNetwork(networkState(),2).extension).toBe(1);
  expect(stretchNetwork(networkState(),-1).extension).toBe(0);
 });
 it('retira la deformación ilustrativa de la red íntegra al soltar',()=>{
  expect(releaseNetwork(stretchNetwork(networkState(),.8))).toEqual({condition:'intact',extension:0,released:true});
 });
 it('retirar la carga no repara cortes por proteólisis',()=>{
  const damaged=releaseNetwork(stretchNetwork(networkState('proteolysis'),.8));
  expect(damaged.condition).toBe('proteolysis');
  expect(continuity(damaged.condition,3)).toBe(false);
 });
 it('un cambio conformacional no corta enlaces por definición',()=>{
  for(let i=0;i<50;i++)expect(continuity('conformational',i)).toBe(true);
  expect(damageQuestion.answers[damageQuestion.correct]).toBe('Degradación proteolítica');
 });
});
