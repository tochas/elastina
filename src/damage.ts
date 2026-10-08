/** Qualitative teaching diagram, not a constitutive material law or molecular dynamics. */
export type NetworkCondition = 'intact' | 'conformational' | 'proteolysis';
export const conditionDescriptions: Record<NetworkCondition, string> = {
  intact: 'Red íntegra: el estiramiento almacena energía mecánica. Al retirar la carga, la red puede recuperar su forma.',
  conformational: 'Cambio conformacional: cambia la disposición espacial sin cortar la cadena peptídica. La flexibilidad normal de la elastina no significa que esté desnaturalizada.',
  proteolysis: 'Degradación por proteasas: se cortan enlaces peptídicos y se altera la continuidad de la red. Volver a enfriar o retirar la carga no vuelve a unir esos enlaces.',
};
export interface NetworkState { condition: NetworkCondition; extension: number; released: boolean }
export function networkState(condition: NetworkCondition = 'intact'): NetworkState {
  return {condition, extension: 0, released: true};
}
export function stretchNetwork(state: NetworkState, extension: number): NetworkState {
  return {...state, extension: Math.max(0, Math.min(1, Number.isFinite(extension) ? extension : 0)), released: false};
}
export function releaseNetwork(state: NetworkState): NetworkState {
  // Residual displacement is solely a visual teaching convention, not an experimentally fitted fraction.
  return {...state, extension: state.condition === 'proteolysis' ? state.extension : 0, released: true};
}
export function continuity(condition: NetworkCondition, segmentIndex: number): boolean {
  // Cuts are illustrative, never identified as measured protease cleavage sites.
  return condition !== 'proteolysis' || segmentIndex % 7 !== 3;
}
export const damageQuestion = {
  q: 'Una proteasa corta la cadena. ¿Qué proceso estás observando?',
  answers: ['Degradación proteolítica', 'Solo desnaturalización', 'Estiramiento elástico normal'],
  correct: 0,
  explanation: 'La proteólisis rompe enlaces peptídicos. La desnaturalización describe la pérdida de organización conformacional, sin requerir esos cortes.',
};
