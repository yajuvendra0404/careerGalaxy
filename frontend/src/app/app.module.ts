import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { SkillPassportComponent } from './dialogs/skill-passport/skill-passport.component';
import { WorkHabitComponent } from './dialogs/work-habit/work-habit.component';
import { JobWalletComponent } from './dialogs/job-wallet/job-wallet.component';
import { ComparatorComponent } from './dialogs/comparator/comparator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatDialogModule} from '@angular/material/dialog';
import { MapComponent } from './map/map.component';

import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlanetsComponent } from './planets/planets.component';
import { AuthComponent } from './auth/auth.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlanetsComponent,
    AuthComponent,
    AdminComponent,
    HeaderComponent,
    SkillPassportComponent,
    WorkHabitComponent,
    JobWalletComponent,
    ComparatorComponent,
    MapComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
