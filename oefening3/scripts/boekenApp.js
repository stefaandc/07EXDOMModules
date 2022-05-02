import { BoekenRepository } from "./boekenRepository.js";
class BoekenComponent {
  #boekenRepository;
  #gelezenBoeken;
  #actievePagina;
  #storage;
  #aantalBoekenPerPagina;

  constructor(window) {
    this.#boekenRepository = new BoekenRepository();
    this.#gelezenBoeken = new Set(); // bevat de id's van gelezen boeken
    this.#actievePagina = 1; // bevat het nummer van de pagina die momenteel getoond wordt
    this.#storage = window.localStorage;
    this.#aantalBoekenPerPagina = 6;
  }
  get boekenRepository() {
    return this.#boekenRepository;
  }
  get gelezenBoeken() {
    return this.#gelezenBoeken;
  }
  get actievePagina() {
    return this.#actievePagina;
  }
  get storage() {
    return this.#storage;
  }
  get aantalBoekenPerPagina() {
    return this.#aantalBoekenPerPagina;
  }

  set aantalBoekenPerPagina(value) {
    this.#aantalBoekenPerPagina = value;
  }

  // navigatieToHtml genereert de twee knoppen die in de div met id navigatie moeten komen
  navigatieToHtml() {
    const aantalPaginas =
      this.#boekenRepository.boeken.length / this.#aantalBoekenPerPagina;
    const divElement = document.getElementById("navigatie");
    let tekst, actie;
    // "<" button
    const btn1 = document.createElement("button");
    tekst = "<";
    actie = () => {
      this.#actievePagina = Math.max(1, this.#actievePagina - 1);
      this.boekenToHtml();
    };
    btn1.appendChild(document.createTextNode(tekst));
    btn1.onclick = actie;
    btn1.type = "button";
    divElement.appendChild(btn1);
    // "<" button
    const btn2 = document.createElement("button");
    tekst = ">";
    actie = () => {
      this.#actievePagina = Math.min(aantalPaginas, this.#actievePagina + 1);
      this.boekenToHtml();
    };
    btn2.appendChild(document.createTextNode(tekst));
    btn2.onclick = actie;
    btn2.type = "button";
    divElement.appendChild(btn2);
  }

  // boekenToHtml genereert dynamsich de boekenplank die in de div met id boeken moet komen
  boekenToHtml() {
    const boeken = this.#boekenRepository.geefBoeken(
      (this.#actievePagina - 1) * this.#aantalBoekenPerPagina,
      this.#aantalBoekenPerPagina
    );
    const boekenDiv = document.getElementById("boeken");
    boekenDiv.innerHTML = "";
    const row = document.createElement("div");
    row.className = "row";

    // voor elk boek:

    boekenDiv.appendChild(row);
  }

  voegGelezenBoekToe(id) {
    this.#gelezenBoeken.add(id);
    this.setGelezenBoekenInStorage();
  }

  // getGelezenBoekenFromStorage haaltde lijst met id's van gelezen boeken op uit de storage
  getGelezenBoekenFromStorage() {}

  // setGelezenBoekenInStorage plaatst de lijst van id's van gelezen boeken in de storage
  setGelezenBoekenInStorage() {}
}

function init() {
  const boekenComponent = new BoekenComponent(this);
  boekenComponent.getGelezenBoekenFromStorage();
  boekenComponent.navigatieToHtml();
  boekenComponent.boekenToHtml();
}

window.onload = init;
