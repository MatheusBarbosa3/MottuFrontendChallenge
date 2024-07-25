import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'favorite',
    loadComponent: () =>
      import('./features/pages/favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
