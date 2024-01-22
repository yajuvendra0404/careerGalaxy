import {  CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { NgtBeforeRenderEvent, extend } from 'angular-three';
import * as THREE from 'three';
import { Mesh } from 'three';

extend({ Mesh });
extend(THREE);

@Component({
  standalone: true,
  template: `
      <ngt-mesh (beforeRender)="onBeforeRender($any($event))"
            (click)="active = !active"
            (pointerover)="hovered = true"
            (pointerout)="hovered = false"
            [scale]="active ? 1.5 : 1"
        >
            <ngt-box-geometry />
            <ngt-mesh-basic-material [color]="hovered ? 'darkred' : 'red'" />>
      
          <ngt-box-geometry />
          <ngt-mesh-basic-material />
      </ngt-mesh>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneGraph {
  active = false;
  hovered = false;
  onBeforeRender(event: NgtBeforeRenderEvent<THREE.Mesh>) {
    event.object.rotation.x += 0.01;
  }
}


@Component({
  selector: 'app-new-planet',
  standalone: false,
  templateUrl: './new-planet.component.html',
  styleUrl: './new-planet.component.scss'
})

export class NewPlanetComponent {
  readonly SceneGraph = SceneGraph;
}


