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
      this.setup.initialCardDeck = undefined
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
  initialCardDeck?: CardDeckPersistence
  debugMode?: boolean
}

export interface Round {
  round: number
}

export interface CardDeckPersistence {
  pile: number[]
  discard: number[]
}
