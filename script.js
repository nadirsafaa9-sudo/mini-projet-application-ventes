const app = Vue.createApp({
  data() {
    return {
      pieces: [],
      recherche: '',
      categorieFiltre: '',
      disponibleFiltre: '',
      triPrix: 'asc',
      panier: []
    }
  },
  created() {
    // Charger le JSON avec fetch
    fetch('./store.json')
      .then(response => response.json())
      .then(data => {
        // Ajouter image et disponible dynamiquement
        this.pieces = data.map(p => ({
          ...p,
          disponible: Math.random() < 0.8      // 80% dispo aléatoire
        }));
      })
      .catch(err => console.error('Erreur chargement JSON:', err));
  },
  computed: {
    categories() {
      return [...new Set(this.pieces.map(p => p.categorie))];
    },
    piecesFiltrees() {
      let resultat = this.pieces;

      if (this.recherche) {
        const texte = this.recherche.toLowerCase();
        resultat = resultat.filter(p => p.nom.toLowerCase().includes(texte));
      }

      if (this.categorieFiltre) {
        resultat = resultat.filter(p => p.categorie === this.categorieFiltre);
      }

      if (this.disponibleFiltre) {
        const dispo = this.disponibleFiltre === 'true';
        resultat = resultat.filter(p => p.disponible === dispo);
      }

      if (this.triPrix === 'asc') {
        resultat = resultat.sort((a, b) => a.prix - b.prix);
      } else {
        resultat = resultat.sort((a, b) => b.prix - a.prix);
      }

      return resultat;
    }
  },
  methods: {
    ajouterAuPanier(piece) {
      this.panier.push(piece);
      alert(`${piece.nom} ajouté au panier !`);
    }
  }
});

app.mount('#app');
