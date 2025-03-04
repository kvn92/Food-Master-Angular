export class FooterModel {
  logoUrl: string;
  annee: number;
  liens: { texte: string; url: string }[];
  reseaux: { icon: string; url: string }[];

  constructor(
    logoUrl: string,
    annee: number,
    liens: { texte: string; url: string }[],
    reseaux: { icon: string; url: string }[]
  ) {
    this.logoUrl = logoUrl;
    this.annee = annee;
    this.liens = liens;
    this.reseaux = reseaux;
  }

  // ✅ Méthode statique pour initialiser les valeurs par défaut
  static getDefault(): FooterModel {
    return new FooterModel(
      '/img/logo/foodorange.png',
      new Date().getFullYear(),
      [
        { texte: 'Nous contacter', url: '#' },
        { texte: 'Mentions légales', url: '#' },
        { texte: 'Conditions générales', url: '#' },
      ],
      [
        { icon: 'fab fa-facebook', url: '#' },
        { icon: 'fab fa-twitter', url: '#' },
        { icon: 'fab fa-instagram', url: '#' },
        { icon: 'fab fa-youtube', url: '#' },
      ]
    );
  }
}
