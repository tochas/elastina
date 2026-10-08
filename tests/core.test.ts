import {describe,it,expect} from 'vitest';
import {elastin} from '../src/data/elastin';
import {buttonMap,deadzone,smooth,parseResidue,validResidue,validateProtein,missingResources,toggleOrganization,MuseumClock,tourIndex} from '../src/core';
describe('Infraestructura compartida del museo',()=>{
 it('mapea botones estándar Xbox',()=>{expect(buttonMap[0]).toBe('confirm');expect(buttonMap[3]).toBe('organization');expect(buttonMap[14]).toBe('previousStation');expect(buttonMap[9]).toBe('pause');});
 it('filtra deriva, respeta signo y satura',()=>{expect(deadzone(.15)).toBe(0);expect(deadzone(-1)).toBe(-1);expect(deadzone(2)).toBe(1);expect(smooth(0,1,.016)).toBeGreaterThan(0);expect(smooth(0,1,.016)).toBeLessThan(1);});
 it('valida extremos reales de secuencia',()=>{expect(parseResidue('A786')).toEqual({chain:'A',resi:786});expect(validResidue(elastin,'A786')).toBe(true);for(const x of ['A0','A787','B1','bad'])expect(validResidue(elastin,x)).toBe(false);});
 it('no inventa puentes en la fibra',()=>{expect(elastin.bridges).toEqual([]);expect(elastin.chains[0].sequence.length).toBe(786);expect(elastin.chains[0].sequence[60]).toBe('K');expect(elastin.chains[0].sequence[29]).toBe('P');});
 it('configura niveles y narraciones independientes',()=>{expect(validateProtein(elastin)).toEqual([]);expect(elastin.stations[1].audio).not.toBe(elastin.stations[2].audio);expect(elastin.audios.sequence.file).not.toBe(elastin.audios.structure.file);});
 it('alterna precursor y red',()=>{expect(toggleOrganization('monomer')).toBe('complex');expect(toggleOrganization('complex')).toBe('monomer');});
 it('espera 20 segundos e interrumpe al interactuar',()=>{const c=new MuseumClock(88,20);expect(c.tick(19999,11)).toBe(-1);expect(c.tick(20000,11)).toBe(0);c.interact(22000);expect(c.start).toBe(null);expect(c.tick(22001,11)).toBe(-1);});
 it('respeta narraciones de distinta duración',()=>{expect(tourIndex(4000,12,2,[3,9])).toBe(1);});
 it('detecta archivos faltantes sin detener toda la comprobación',async()=>{const mock=async(p:any)=>{if(p==='error')throw Error();return {ok:p==='ok'} as Response;};expect(await missingResources(['ok','missing','error'],mock as any)).toEqual(['missing','error']);});
});
