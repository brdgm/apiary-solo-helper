import Action from './enum/Action'
import Resource from './enum/Resource'
import SCurve from './enum/SCurve'
import Worker from './enum/Worker'

export default interface Card {
  id: number
  retrieveLimit: number
  carveSteps?: number
  action: Action
  worker: Worker
  sCurve: SCurve
  resource: Resource
}
