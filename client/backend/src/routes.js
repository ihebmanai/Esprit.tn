import React from 'react';


const Dashboard = React.lazy(() => import("./views/Pages/Dashboard/Dashboard"));

const addNews = React.lazy(() => import('./views/News/addNews'));
const showNews = React.lazy(() => import('./views/News/showNews'));
const showEvents = React.lazy(() => import('./views/Events/Events'));
const addEvents = React.lazy(() => import('./views/Events/addEvents'));
const updateEvent = React.lazy(() => import('./views/Events/updateEvents'));
const detailsEvent = React.lazy(() => import('./views/Events/detailsEvent'));
const Users = React.lazy(() => import("./views/Pages/Users/Users"));
const User = React.lazy(() => import("./views/Pages/Users/User"));

const showPress = React.lazy(() => import('./views/Presse/showPress'));
const addPress = React.lazy(() => import('./views/Presse/addPress'));
const updatePress = React.lazy(() => import('./views/Presse/updatePress'));
const detailsPress = React.lazy(() => import('./views/Presse/detailsPress'));

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
  { path: '/events/add', exact: true, name: 'Ajouter', component: addEvents },
  { path: '/events/update/:id', exact: true, name: 'Modifier', component: updateEvent },
  { path: '/events/details/:id', exact: true, name: 'Details', component: detailsEvent },

  
  { path: '/presse', exact: true, name: 'Presse', component: showPress },
  { path: '/presse/ajouter', exact: true, name: 'ajouter', component: addPress },
  { path: '/presse/update/:id', exact: true, name: 'Modifier', component: updatePress },
  { path: '/presse/details/:id', exact: true, name: 'Details', component: detailsPress },
];

export default routes;
