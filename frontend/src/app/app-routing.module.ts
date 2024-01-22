import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { PlanetsComponent } from './planets/planets.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { MapComponent } from './map/map.component';
import { MapTestComponent } from './map-test/map-test.component';
import { NewPlanetComponent } from './new-planet/new-planet.component';

const routes: Routes = [
  { path:'', redirectTo:'auth',pathMatch:'full'},

  { path:'home',component:HomeComponent }, // , canActivate:[AuthGuard]
  { path:'planet',component:PlanetsComponent}, // , canActivate:[AuthGuard] 
  { path:'auth', component:AuthComponent},
  { path:'map', component:MapComponent},
  { path:'newP', component:NewPlanetComponent},
  
  // { path:'mapTest', component:MapTestComponent},
  { path:'admin', component:AdminComponent},  // , canActivate:[AuthGuard] 
  { path:'**',redirectTo:'auth'}
];



// { path:'', redirectTo:'recipes',pathMatch:'full'},
// { path:'recipes',component:RecipesComponent, 
//   canActivate:[AuthGuard], 
//   children:[
//     { path:'new',component:RecipesEditComponent },
//     { path:':id',component:RecipeDetailComponent },
//     { path:':id/edit',component:RecipesEditComponent },
//   ]},
// { path:'shopping-list',component:ShoppingListComponent},
// { path:'auth',
//   canActivate:[NoAuthGuard],
//   component:AuthComponent
// },
// { path:'**',redirectTo:'recipes'}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
