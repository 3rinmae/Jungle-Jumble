import { AppState } from "../AppState.js";
import { jumblesService } from "../services/JumblesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawJumble() {
  const jumbles = AppState.jumbles
  console.log('jumbles', jumbles);
  let content = ''
  jumbles.forEach(jumble => content += jumble.jumblesStartCard)
  setHTML('start-jumble', content)
}

function _darwActiveJumble() {
  const activeJumble = AppState.activeJumble
  if (!activeJumble) {
    return
  }
  setHTML('game', activeJumble.selectedJumble)
  // @ts-ignore
  document.getElementById('jumbleUser').focus()
}
export class JumblesController {
  constructor() {
    // console.log('JumblesContorller');
    _drawJumble()
    AppState.on('jumbles', _drawJumble)
    AppState.on('activeJumble', _darwActiveJumble)
  }

  startActiveJumble(id) {
    if (AppState.activeJumble) {
      return
    }
    jumblesService.startActiveJumble(id)
  }

  checkJumble(event, body) {
    event.preventDefault()
    const from = event.target
    const userinput = getFormData(from)
    // console.log(userinput.text, body);
    // @ts-ignore
    if (userinput.text == body) {
      Pop.success('wow to got it soooo cool')
      from.reset()
      // @ts-ignore
      document.getElementById("game").innerHTML = ''
      jumblesService.resetActiveJumble()
      return
    }
    Pop.error('you are bad at this try again losser')
  }
}