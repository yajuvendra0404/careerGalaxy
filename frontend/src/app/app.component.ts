import { Component } from '@angular/core';
import * as AOS from "aos";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'careerGalaxy';
  ngOnInit(): void {
    AOS.init({
      duration: 1200,
      once: false
    });
  }
}
