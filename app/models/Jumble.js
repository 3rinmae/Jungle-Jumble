import { generateId } from "../utils/GenerateId.js"
import { Pop } from "../utils/Pop.js"

export class Jumble {
  constructor(data) {
    this.id = generateId()
    this.name = data.name
    this.body = data.body

    this.fastestTime = data.fastestTime || null
    this.startTime = null
    this.endTime = null
  }

  get jumblesStartCard() {
    return `
      <div class="d-flex justify-content-between align-items-center mt-2">
      <button onclick="app.JumblesController.startActiveJumble('${this.id}')" class="btn btn-warning">start</button>
      <p>${this.name}</p>
      <p><i class="mdi mdi-clock"></i> ${this.fastestTime ? this.fastestTime.toFixed(2) : "N/A"}</p>
    </div>
    `
  }

  get selectedJumble() {
    return `
    <div class="card p-2">
          <h4>${this.name}</h4>
          <p>${this.body}</p>
        </div>
        <div class="card p-2 mt-2">
          <form onsubmit="app.JumblesController.checkJumble(event,'${this.body}')">
            <textarea class="longbox rounded" name="text" id="jumbleUser" rows="10"></textarea>
            <button class="btn btn-info d-block longbox" type="submit">sunmit</button>
          </form>
        </div>
    `
  }

  startingTime() {
    console.log('????');
    this.startTime = new Date().getTime()
  }

  endingTime() {
    this.endTime = new Date().getTime()
    // @ts-ignore
    const speed = this.endTime - this.startTime
    if (!this.fastestTime || speed < this.fastestTime) {
      this.fastestTime = speed / 1000
      Pop.success('you are super fast abd the best ever... until someone else is')
    }
  }
}