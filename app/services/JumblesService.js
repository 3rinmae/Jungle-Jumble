import { AppState } from "../AppState.js"
import { saveState } from "../utils/Store.js";

function _save() {
  saveState('jumbles', AppState.jumbles)
}
class JumblesService {
  constructor() {

  }
  startActiveJumble(id) {
    // debugger
    console.log('hi');
    const activeJumble = AppState.jumbles.find(jumble => jumble.id == id)
    // @ts-ignore
    AppState.activeJumble = activeJumble
    // @ts-ignore
    activeJumble.startingTime()
    _save()
  }

  resetActiveJumble() {
    // @ts-ignore
    AppState.activeJumble.endingTime()
    AppState.emit('jumbles')
    AppState.activeJumble = null
    _save()
  }
}

export const jumblesService = new JumblesService()