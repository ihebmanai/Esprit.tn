import React from 'react';


const Dashboard = React.lazy(() => import("./views/Pages/Dashboard/Dashboard"));

const addNews = React.lazy(() => import('./views/News/addNews'));
const showNews = React.lazy(() => import('./views/News/showNews'));
const showEvents = React.lazy(() => import('./views/Events/Events'));
const eventForm = React.lazy(() => import('./views/Events/eventForm'));
const updateEvent = React.lazy(() => import('./views/Events/updateEvents'));
const detailsEvent = React.lazy(() => import('./views/Events/detailsEvent'));
const archivedEvents = React.lazy(() => import('./views/Events/archivedEvents'));
const Users = React.lazy(() => import("./views/Pages/Users/Users"));
const User = React.lazy(() => import("./views/Pages/Users/User"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },

  { path: '/actualite', exact: true, name: 'Actualité', component: showNews },
  { path: '/actualite/ajouter', exact: true, name: 'Ajouter', component: addNews },

  { path: '/events', exact: true, name: 'Evénements', component: showEvents },
  { path: '/events/show', exact: true, name: '', component: showEvents },
  { path: '/events/add', exact: true, name: 'Ajouter', component: eventForm },
  { path: '/events/update/:id', exact: true, name: 'Modifier', component: updateEvent },
  { path: '/events/details/:id', exact: true, name: 'Details', component: detailsEvent },
  { path: '/events/archived', exact: true, name: 'Archived', component: archivedEvents },
];

export default routes;
