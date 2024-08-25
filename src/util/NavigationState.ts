import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import { State } from '@/store/state'

export default class NavigationState {

  readonly round : number
  readonly turn : number

  public constructor(route: RouteLocation, state: State) {
    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
  }

}
