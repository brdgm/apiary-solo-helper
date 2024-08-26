import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.NORMAL_1
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.rounds = []
    }
  },
  persist: true
})

export interface State {
  language: string,
  baseFontSize: number,
  setup: Setup,
  rounds: Round[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  debugMode?: boolean
}

export interface Round {
  round: number
}

export interface CardDeckPersistence {
  roundPile: string[]
  roundDiscard: string[]
  auxiliaryPile: string[]
  auxiliaryDiscard: string[]
}
