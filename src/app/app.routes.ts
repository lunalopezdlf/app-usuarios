import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { Error404Component } from './pages/error404/error404.component';

export const routes: Routes = [
    // RUTA INICIAL 
    { path: "", pathMatch: 'full', redirectTo: "home" },

    //RUTAS INTERMEDIAS - ESTATICAS 
    { path: "home", component: HomeComponent },
    { path: "newuser", component: UserFormComponent },

    //RUTAS DINAMICAS
    { path: "user/:_id", component: UserViewComponent },
    { path: "updateuser/:_id", component: UserFormComponent},

    //RUTA FINAL -> 
    { path: "**", component: Error404Component}
];
