import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './film-catalog/main/main.component';
import { FilmListComponent } from './film-catalog/film-list/film-list.component';
import { ActorListComponent } from './film-catalog/actor-list/actor-list.component';
import { LoginComponent } from './film-catalog/login/login.component';
import {AuthGuardService} from './shared/guards/auth-guard.service';
import { FilmDetailsComponent } from './film-catalog/film-details/film-details.component';
import { ActorDetailsComponent } from './film-catalog/actor-details/actor-details.component';
import { NotFoundComponent } from './film-catalog/not-found/not-found.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "main" }, 
  { path: "main", 
    component: MainComponent,
    canActivate:[AuthGuardService]
  },
  { 
    path: "films",
    children: [
      {
        path: '',
        component: FilmListComponent,
        canActivate:[AuthGuardService]
      },
      {
        path: 'details/:id',
        component: FilmDetailsComponent,
        canActivate:[AuthGuardService]
      },
    ], 
      //canActivateChild: [AuthGuardService],
  },
  { 
    path: "actors",
    children:[
    {
      path:'',
      component: ActorListComponent,
      canActivate:[AuthGuardService]
    },
    {
      path: 'details/:id',
      component:ActorDetailsComponent,
      canActivate:[AuthGuardService]
    }
  ],
  },
  { path: "login", 
  component: LoginComponent 
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, /*{enableTracing:true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
