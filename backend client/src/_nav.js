export default {
  items: [
    {
      title: true,
      name: "ESPRIT ADMINSPACE"
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer"
    },
    {
      name: "Page Acceuil",
      children: [
        {
          name: "Carrousel",
          icon: "none",
          children: [
            {
              name: "Ajouter",
              url: "/ajouter",
              icon: "none"
            },
            {
              name: "Afficher",
              url: "/afficher",
              icon: "none"
            },
          ]
        },
      ]
    },
    {
      name: "Formations",
      icon: "none",
      children: [
        {
          name: "Ajouter",
          url: "/ajouter",
          icon: "none"
        },
        {
          name: "Afficher",
          url: "/afficher",
          icon: "none"
        },
      ]
    },
    {
      name: "Evénements",
      icon: "none",
      children: [
        {
          name: "Ajouter",
          url: "/ajouter",
          icon: "none"
        },
        {
          name: "Afficher",
          url: "/afficher",
          icon: "none"
        },
      ]
    },
    {
      name: "Actualités",
      icon: "none",
      children: [
        {
          name: "Ajouter",
          url: "/ajouter",
          icon: "none"
        },
        {
          name: "Afficher",
          url: "/afficher",
          icon: "none"
        },
      ]
    },
    {
      name: "Calendrier",
    },
    {
      name: "SERVICES DE L’ÉCOLE",
    },
    {
      name: "PRESSE",
      icon: "none",
      children: [
        {
          name: "Rapports d'Activités",
          url: "/ajouter",
          icon: "none"
        },
        {
          name: "Articles",
          url: "/afficher",
          icon: "none"
        },
        {
          name: "Brochures",
          url: "/afficher",
          icon: "none"
        },
        {
          name: "COMMUNIQUE DE PRESSE",
          url: "/afficher",
          icon: "none"
        },
        
      ]
    },
    {
      name: "GRILLE TARIFAIRE",
    },
    {
      name: "Foyer",
    },
    {
      name: "Vie edtudiante",
    },
  ]
};
