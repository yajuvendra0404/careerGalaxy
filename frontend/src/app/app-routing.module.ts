import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { PlanetsComponent } from './planets/planets.component';
import { authGuard } from './guards/authGuard/auth.guard'; 
import { AdminComponent } from './admin/admin.component';
import { MapComponent } from './map/map.component';
import { skillPassportGuard } from './guards/skillPassportGuard/skill-passport.guard';

const routes: Routes = [
  { path:'', redirectTo:'auth',pathMatch:'full'},

  { path:'home',component:HomeComponent,canActivate:[authGuard] }, // canActivate:[authGuard]
  { path:'planet',component:PlanetsComponent, canActivate:[authGuard]}, // canActivate:[authGuard] 
  { path:'auth', component:AuthComponent},
  { path:'map', component:MapComponent, canActivate:[authGuard]}, // canActivate:[authGuard, skillPassportGuard]  , canActivate:[ skillPassportGuard ]
  { path:'admin', component:AdminComponent, canActivate:[authGuard] },  // canActivate:[authGuard] 
  { path:'**',redirectTo:'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
