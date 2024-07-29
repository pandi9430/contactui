import { RouterModule, Routes } from '@angular/router';
import { ContactListingComponent } from './contact-listing/contact-listing.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'contactlist', component: ContactListingComponent },
    { path: 'contactadd', component: ContactAddComponent },
    { path: 'aboutus', component: AboutUsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }