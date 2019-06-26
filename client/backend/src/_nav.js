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
      icon:"fa fa-home",
      children: [
        {
          name: "Carrousel",
          icon: "fa fa-ellipsis-h",
          children: [
            {
              name: "Ajouter",
              url: "/ajouter",
              icon: "fa fa-plus"
            },
            {
              name: "Afficher",
              url: "/afficher",
              icon: "fa fa-bars"
            },
          ]
        },
      ]
    },
    {
      name: "Formations",
      icon: "fa fa-mortar-board",
      children: [
        {
          name: "Ajouter",
          url: "/ajouter",
          icon: "fa fa-plus"
        },
        {
          name: "Afficher",
          url: "/afficher",
          icon: "fa fa-bars"
        },
      ]
    },
    {
      name: "Evénements",
      icon: "fa fa-quote-right",
      children: [
        {
          name: "Ajouter",
          url: "/ajouter",
          icon: "fa fa-plus"
        },
        {
          name: "Afficher",
          url: "/afficher",
          icon: "fa fa-bars"
        },
      ]
    },
    {
      name: "Actualités",
      icon: "fa fa-rss",
      children: [
        {
          name: "Ajouter",
          url: "/actualite/ajouter",
          icon: "fa fa-plus"
        },
        {
          name: "Afficher",
          url: "/actualite",
          icon: "fa fa-bars"
        },
      ]
    },
    {
      name: "Calendrier",
      icon:"fa fa-calendar"
    },
    {
      name: "Services de l'école",
      icon:"fa fa-rocket"
    },
    {
      name: "Presse",
      icon: "fa fa-newspaper-o",
      children: [
        {
          name: "Rapports d'Activités",
          url: "/ajouter",
          icon: "fa fa-print",
          children: [
            {
              name: "Ajouter",
              url: "/ajouter",
              icon: "fa fa-plus"
            },
            {
              name: "Afficher",
              url: "/afficher",
              icon: "fa fa-bars"
            },
          ]
        },
        {
          name: "Articles",
          url: "/afficher",
          icon: "fa fa-print",
          children: [
            {
              name: "Ajouter",
              url: "/ajouter",
              icon: "fa fa-plus"
            },
            {
              name: "Afficher",
              url: "/afficher",
              icon: "fa fa-bars"
            },
          ]
        },
        {
          name: "Brochures",
          url: "/afficher",
          icon: "fa fa-print",
          children: [
            {
              name: "Ajouter",
              url: "/ajouter",
              icon: "fa fa-plus"
            },
            {
              name: "Afficher",
              url: "/afficher",
              icon: "fa fa-bars"
            },
          ]
        },
        {
          name: "Communiqué",
          url: "/afficher",
          icon: "fa fa-print",
          children: [
            {
              name: "Ajouter",
              url: "/ajouter",
              icon: "fa fa-plus"
            },
            {
              name: "Afficher",
              url: "/afficher",
              icon: "fa fa-bars"
            },
          ]
        },
        
      ]
    },
    {
      name: "Grille Tarifaire",
      icon:"fa fa-money"
    },
    {
      name: "Foyer",
      icon:"fa fa-university"
    },
    {
      name: "Vie étudiante",
      icon:"fa fa-group"
    },
  ]
};
