import { VacaturesRepository } from "./vacatureRepository.js";

class VdabComponent {
  #zoektermen = [];
  #vacaturesRepository;
  #storage;
  constructor(window) {
    this.#vacaturesRepository = new VacaturesRepository();
    this.#storage = window.localStorage;
  }

  get vacaturesRepository() {
    return this.#vacaturesRepository;
  }
  get zoektermen() {
    return this.#zoektermen;
  }
  get storage() {
    return this.#storage;
  }

  voegZoektermToe = () => {};

  verwijderZoekterm(zoekterm) {}

  getZoektermenFromStorage() {}

  setZoektermenInStorage() {}

  showResultaat() {
    this.zoektermenToHtml();
    this.vacaturesToHtml();
  }

  zoektermenToHtml() {}

  vacaturesToHtml() {
    document.getElementById("resultaat").innerHTML = "";
    this.#vacaturesRepository
      .filterOpZoekTermen(this.#zoektermen)
      .forEach((vacature) => {
        const divElement = document.createElement("div");
        const h2Element = document.createElement("h2");
        const h2Text = document.createTextNode(vacature.titel);
        h2Element.setAttribute("class", "vacatureTitel");
        h2Element.appendChild(h2Text);
        const h3Element = document.createElement("h3");
        const h3Text = document.createTextNode(
          vacature.bedrijf + " - " + vacature.plaats
        );
        h3Element.appendChild(h3Text);
        const h4Element1 = document.createElement("h4");
        const h4Text1 = document.createTextNode("Functieomschrijving");
        h4Element1.appendChild(h4Text1);
        const pElement = document.createElement("p");
        const pText = document.createTextNode(vacature.functieomschrijving);
        pElement.appendChild(pText);
        const h4Element2 = document.createElement("h4");
        const h4Text2 = document.createTextNode("Profiel");
        h4Element2.appendChild(h4Text2);
        const ulElement = document.createElement("ul");
        vacature.profiel.forEach((item) => {
          const liElement = document.createElement("li");
          const liText = document.createTextNode(item);
          liElement.appendChild(liText);
          ulElement.appendChild(liElement);
        });
        divElement.appendChild(h2Element);
        divElement.appendChild(h3Element);
        divElement.appendChild(h4Element1);
        divElement.appendChild(pElement);
        divElement.appendChild(h4Element2);
        divElement.appendChild(ulElement);
        document.getElementById("resultaat").appendChild(divElement);
      });
  }
}

function init() {
  const vdabComponent = new VdabComponent(this);
  vdabComponent.getZoektermenFromStorage();
  vdabComponent.showResultaat();
  document.getElementById("zoektermToevoegen").onclick =
    vdabComponent.voegZoektermToe;
}

window.onload = init;
