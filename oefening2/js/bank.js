import { UitgavenCanvas } from "./uitgavenCanvas.js";
import { UitgavenRepository } from "./uitgavenRepository.js";

class BankComponent {
  #canvasCategorieen;
  #storage;
  #aantalBezoeken;
  #uitgavenRepository;
  constructor(window) {
    this.#canvasCategorieen = new UitgavenCanvas();
    this.#storage = window.localStorage;
    this.#aantalBezoeken = 1;
    this.#uitgavenRepository = new UitgavenRepository();
  }

  get canvasCategorieen() {
    return this.#canvasCategorieen;
  }

  get storage() {
    return this.#storage;
  }
  get aantalBezoeken() {
    return this.#aantalBezoeken;
  }
  get uitgavenRepository() {
    return this.#uitgavenRepository;
  }

  toHtml() {
    this.#canvasCategorieen.tekenen(this.#uitgavenRepository);
    this.tekst();
  }

  tekst() {}

  getAantalBezoekenFromStorage() {}

  setAantalBezoekenInStorage() {}
}

function init() {
  const bankComponent = new BankComponent(this);
  bankComponent.getAantalBezoekenFromStorage();
  bankComponent.setAantalBezoekenInStorage();
  bankComponent.toHtml();
}

window.onload = init;

Date.prototype.datumNotatie = function () {
  const dagen = [
    "Zondag",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag",
  ];
  return `${dagen[this.getDay()]} ${this.getDate()}/${
    this.getMonth() + 1
  }/${this.getFullYear()}`;
};
