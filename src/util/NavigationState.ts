import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'

export default class NavigationState {

  readonly round : number
  readonly turn : number

  public constructor(route: RouteLocation) {
    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
  }

}
