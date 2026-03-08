import { atom } from 'nanostores'

export const completedDaysStore = atom<Set<number>>(new Set())
