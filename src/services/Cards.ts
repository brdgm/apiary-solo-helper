import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'
import Worker from './enum/Worker'
import SCurve from './enum/SCurve'
import Resource from './enum/Resource'

/**
 * Automa cards.
 */
const cards : Card[] = [
  {
    id: 1,
    retrieveLimit: 0,
    carveSteps: 1,
    action: Action.EXPLORE,
    worker: Worker.GRAY,
    sCurve: SCurve.LEFT_TOP,
    resource: Resource.FIBER
  },
  {
    id: 2,
    retrieveLimit: 0,
    carveSteps: 2,
    action: Action.GROW,
    worker: Worker.GRAY,
    sCurve: SCurve.LEFT_TOP,
    resource: Resource.WATER
  },
  {
    id: 3,
    retrieveLimit: 1,
    carveSteps: 3,
    action: Action.CONVERT,
    worker: Worker.GRAY,
    sCurve: SCurve.RIGHT_BOTTOM,
    resource: Resource.POLLEN
  },
  {
    id: 4,
    retrieveLimit: 1,
    carveSteps: 1,
    action: Action.RESEARCH,
    worker: Worker.YELLOW,
    sCurve: SCurve.LEFT_TOP,
    resource: Resource.WATER
  },
  {
    id: 5,
    retrieveLimit: 0,
    carveSteps: 2,
    action: Action.ADVANCE,
    worker: Worker.GRAY,
    sCurve: SCurve.LEFT_TOP,
    resource: Resource.POLLEN
  },
  {
    id: 6,
    retrieveLimit: 0,
    action: Action.ADVANCE,
    worker: Worker.YELLOW,
    sCurve: SCurve.RIGHT_BOTTOM,
    resource: Resource.WATER
  },
  {
    id: 7,
    retrieveLimit: 1,
    carveSteps: 1,
    action: Action.RESEARCH,
    worker: Worker.YELLOW,
    sCurve: SCurve.RIGHT_BOTTOM,
    resource: Resource.POLLEN
  },
  {
    id: 8,
    retrieveLimit: 1,
    action: Action.CONVERT,
    worker: Worker.YELLOW,
    sCurve: SCurve.RIGHT_BOTTOM,
    resource: Resource.FIBER
  },
  {
    id: 9,
    retrieveLimit: 0,
    carveSteps: 3,
    action: Action.GROW,
    worker: Worker.YELLOW,
    sCurve: SCurve.RIGHT_BOTTOM,
    resource: Resource.FIBER
  },
  {
    id: 10,
    retrieveLimit: 0,
    carveSteps: 1,
    action: Action.EXPLORE,
    worker: Worker.YELLOW,
    sCurve: SCurve.RIGHT_BOTTOM,
    resource: Resource.WATER
  },
  {
    id: 11,
    retrieveLimit: 1,
    carveSteps: 2,
    action: Action.EXPLORE,
    worker: Worker.YELLOW,
    sCurve: SCurve.LEFT_TOP,
    resource: Resource.POLLEN
  },
  {
    id: 12,
    retrieveLimit: 0,
    carveSteps: 2,
    action: Action.CONVERT,
    worker: Worker.GRAY,
    sCurve: SCurve.RIGHT_BOTTOM,
    resource: Resource.WATER
  },
  {
    id: 13,
    retrieveLimit: 1,
    action: Action.RESEARCH,
    worker: Worker.GRAY,
    sCurve: SCurve.RIGHT_BOTTOM,
    resource: Resource.POLLEN
  },
  {
    id: 14,
    retrieveLimit: 1,
    carveSteps: 2,
    action: Action.ADVANCE,
    worker: Worker.GRAY,
    sCurve: SCurve.LEFT_TOP,
    resource: Resource.FIBER
  }
]

const cardsMap = new Map<number,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @returns Cards
   */
  getAll() : Card[] {
    return cards
  }

}
