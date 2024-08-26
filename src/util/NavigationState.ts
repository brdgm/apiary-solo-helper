import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import { BotPersistence, State } from '@/store/state'
import CardDeck from '@/services/CardDeck'
import BotTiles from '@/services/BotTiles'

export default class NavigationState {

  readonly turn : number
  readonly cardDeck : CardDeck
  readonly tiles : BotTiles

  public constructor(route: RouteLocation, state: State) {
    this.turn = getIntRouteParam(route, 'turn')

    const bot = getLastBotPersistence(state, this.turn)
    if (bot) {
      this.cardDeck = CardDeck.fromPersistence(bot.cardDeck)
      this.tiles = BotTiles.fromPersistence(bot.tiles)
    }
    else {
      if (state.setup.initialCardDeck) {
        this.cardDeck = CardDeck.fromPersistence(state.setup.initialCardDeck)
      }
      else {
        this.cardDeck = CardDeck.new()
      }
      this.tiles = BotTiles.new()
    }
  }

}

function getLastBotPersistence(state: State, turn: number) : BotPersistence | undefined {
  return state.turns
    .toSorted((item1,item2) => item1.turn - item2.turn)
    .findLast(item => item.turn < turn && item.bot)?.bot
}
