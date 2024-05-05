import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { PlanetsComponent } from './planets/planets.component';
import { authGuard } from './guards/authGuard/auth.guard'; 
import { AdminComponent } from './admin/admin.component';
import { MapComponent } from './map/map.component';
import { skillPassportGuard } from './guards/skillPassportGuard/skill-passport.guard';
import { JoinGameComponent } from './join-game/join-game.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { Role_List_Enum } from './enums/Role_List';
const routes: Routes = [
  { path:'', redirectTo:'auth',pathMatch:'full'},
  { path:'home',component:HomeComponent,canActivate:[authGuard] }, // canActivate:[authGuard]
  { path:'planet',component:PlanetsComponent, canActivate:[authGuard]}, // canActivate:[authGuard] 
  { path:'auth', component:AuthComponent},
  { path:'map', component:MapComponent, canActivate:[authGuard, skillPassportGuard]}, // canActivate:[authGuard, skillPassportGuard]  , canActivate:[ skillPassportGuard ]
  { path:'admin', component:AdminComponent, canActivate:[authGuard], data: {role: [Role_List_Enum.ADMIN]} }, 
  { path:'joinGame', component:JoinGameComponent, canActivate:[authGuard] },
  { path:'teacher', component:TeacherDashboardComponent, canActivate:[authGuard], data: {role: [Role_List_Enum.ADMIN,Role_List_Enum.TEACHER]} }, // canActivate:[authGuard] 
  { path:'**',redirectTo:'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
