import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import { BotPersistence, State } from '@/store/state'
import CardDeck from '@/services/CardDeck'
import BotTiles from '@/services/BotTiles'
import Action from '@/services/enum/Action'
import Worker from '@/services/enum/Worker'
import SCurve from '@/services/enum/SCurve'
import Resource from '@/services/enum/Resource'

export default class NavigationState {

  readonly turn : number
  readonly cardDeck : CardDeck
  readonly tiles : BotTiles
  readonly victoryPoints : number
  readonly expertMode : boolean

  readonly retrieveLimit: number
  readonly carveSteps?: number
  readonly action: Action
  readonly worker: Worker
  readonly sCurve: SCurve
  readonly resource: Resource

  public constructor(route: RouteLocation, state: State) {
    this.turn = getIntRouteParam(route, 'turn')

    const bot = getLastBotPersistence(state, this.turn)
    if (bot) {
      this.cardDeck = CardDeck.fromPersistence(bot.cardDeck)
      this.tiles = BotTiles.fromPersistence(bot.tiles)
      this.victoryPoints = bot.victoryPoints
    }
    else {
      if (state.setup.initialCardDeck) {
        this.cardDeck = CardDeck.fromPersistence(state.setup.initialCardDeck)
      }
      else {
        this.cardDeck = CardDeck.new()
      }
      this.tiles = BotTiles.new()
      this.victoryPoints = 0
    }

    this.expertMode = state.setup.difficultyLevel >= 5

    const actionCard = this.cardDeck.actionCard
    this.retrieveLimit = actionCard?.retrieveLimit ?? 0
    this.carveSteps = actionCard?.carveSteps
    this.action = actionCard?.action ?? Action.EXPLORE
    
    const supportCard = this.cardDeck.supportCard
    this.worker = supportCard?.worker ?? Worker.GRAY
    this.sCurve = supportCard?.sCurve ?? SCurve.LEFT_TOP
    this.resource = supportCard?.resource ?? Resource.FIBER
  }

}

function getLastBotPersistence(state: State, turn: number) : BotPersistence | undefined {
  return state.turns
    .toSorted((item1,item2) => item1.turn - item2.turn)
    .findLast(item => item.turn < turn && item.bot)?.bot
}
