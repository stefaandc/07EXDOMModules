import { Uitgave } from "./uitgave.js";
import { uitgaven } from "./uitgavenArray.js";

export class UitgavenRepository {
  #uitgaven = [];
  constructor() {
    this.uitgavenOpvullen();
  }

  get uitgaven() {
    return this.#uitgaven;
  }

  voegUitgaveToe(uitgave) {
    this.#uitgaven.push(uitgave);
  }

  uitgavenOpvullen() {
    uitgaven.forEach(([id, datum, bedrag, omschrijving, categorie]) =>
      this.voegUitgaveToe(
        new Uitgave(id, datum, bedrag, omschrijving, categorie)
      )
    );
  }

  geefCategorieen() {}

  totaalBedragUitgaven() {}

  uitgavenPerCategorie(categorie) {}
}
