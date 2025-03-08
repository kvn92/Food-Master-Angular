export class Recette {
    constructor(
      public id: number = 0,
      public titre: string = '',
      public preparation: string = '',
      public photo?: string,
      public createdAt: string = '',
      public niveau: number = 0, // Ex: 0 = Facile, 1 = Moyen, 2 = Difficile
      public duree: number = 0,

    ) {
      this.titre = titre;
    }
  
  
}