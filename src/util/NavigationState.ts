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

  public constructor(route: RouteLocation, state: State) {
    this.turn = getIntRouteParam(route, 'turn')

    const lastTurn = (route.name == 'EndGameScoring')
    const bot = getLastBotPersistence(state, this.turn, lastTurn)

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
  }

  public get retrieveLimit(): number {
    return this.cardDeck.actionCard?.retrieveLimit ?? 0
  }

  public get carveSteps(): number|undefined {
    return this.cardDeck.actionCard?.carveSteps ?? 0
  }

  public get action(): Action {
    return this.cardDeck.actionCard?.action ?? Action.EXPLORE
  }

  public get worker(): Worker {
    return this.cardDeck.supportCard?.worker ?? Worker.GRAY
  }
  
  public get sCurve(): SCurve {
    return this.cardDeck.supportCard?.sCurve ?? SCurve.LEFT_TOP
  }
  
  public get resource(): Resource {
    return this.cardDeck.supportCard?.resource ?? Resource.FIBER
  }

}

function getLastBotPersistence(state: State, turn: number, lastTurn: boolean) : BotPersistence | undefined {
  return state.turns
      .toSorted((item1,item2) => item1.turn - item2.turn)
      .findLast(item => ((item.turn < turn) || lastTurn) && item.bot)?.bot
}
