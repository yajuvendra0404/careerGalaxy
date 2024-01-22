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

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { PlanetsComponent } from './planets/planets.component';
import { AuthComponent } from './auth/auth.component';
import { AddPlanetComponent } from './admin/add-planet/add-planet.component';
import { AddLanesComponent } from './admin/add-lanes/add-lanes.component';
import { AddJobsComponent } from './admin/add-jobs/add-jobs.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { LanesComponent } from './map/lanes/lanes.component';
// import { MapTestComponent } from './map-test/map-test.component';
import {MatRadioModule} from '@angular/material/radio';
import { JobsViewComponent } from './dialogs/jobs-view/jobs-view.component';
import { SuccessNotifierComponent } from './notifier/success-notifier/success-notifier.component';
import { ErrorNotifierComponent } from './notifier/error-notifier/error-notifier.component';



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
    AddPlanetComponent,
    AddLanesComponent,
    AddJobsComponent,
    LanesComponent,
    JobsViewComponent,
    SuccessNotifierComponent,
    ErrorNotifierComponent,
    
    // MapTestComponent,
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
    MatIconModule,
    MatGridListModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatRadioModule,
    MatSliderModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
