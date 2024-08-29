import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { canActivateProducts } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: async () =>
      (await import('./pages/products/products.component')).ProductsComponent,
    canActivate: [canActivateProducts]
  },
  {
    path: 'products/:id',
    loadComponent: async () =>
      (await import('./pages/products/product-detail/product-detail.component'))
        .ProductDetailComponent,
  },
];
