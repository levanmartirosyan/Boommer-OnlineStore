import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './navigation/search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './profile/editprofile/editprofile.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Boommer - Home' },
  { path: 'cart', component: CartComponent, title: 'Boommer - Cart' },
  { path: 'search', component: SearchComponent, title: 'Boommer - Search' },
  { path: 'profile', component: ProfileComponent, title: 'Boommer - Profile' },
  {
    path: '**',
    component: NotfoundComponent,
    title: 'Boommer - Page Not Found',
  },
];
