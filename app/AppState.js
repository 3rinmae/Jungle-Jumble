import { Value } from "./models/Value.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/IsValidProp.js"
import { loadState } from "./utils/Store.js"
import { Jumble } from "./models/Jumble.js"

class ObservableAppState extends EventEmitter {
  page = ''

  /** @type {import('./models/Value.js').Value[]} */
  values = loadState('values', [Value])

  jumbles = [
    new Jumble({ name: 'cool', body: 'Jermey has a lot of cats! He has seven. Maybe more soon?' }),
    new Jumble({ name: 'cool but hard', body: 'Eat plants, meow, and throw up because i ate plants claw drapes, yet run outside as soon as door open, nyan fluffness ahh cucumber!' }),
    new Jumble({ name: 'crazy cool', body: 'Human is washing you why halp oh the horror flee scratch hiss bite touch water with paw then recoil in horror for you are a captive audience while sitting on the toilet, pet me or cats secretly make all the worlds muffins. I could pee on this if i had the energy play time, but sit in a box for hours! ' }),
  ]

  /** @type {import('./models/Jumble.js').Jumble|null} */
  activeJumble = null

  // NOTE Used to load initial data
  init() {
    this.jumbles = loadState('jumbles', [Jumble])
  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
