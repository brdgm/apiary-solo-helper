import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'

/**
 * Solo game round cards.
 */
const cards : Card[] = [
  {
    id: 'R01'
  },
]

const cardsMap = new Map<string,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : Card {
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
