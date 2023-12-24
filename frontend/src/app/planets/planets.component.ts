import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { IGeometry, IPlanetsData} from '@interfaces/common.interface';
import { PlanetService } from '@app/services/dataShare/planet.service';
import { Subscription } from 'rxjs';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})

export class PlanetsComponent {

  ASSETS_PATH: string = `${environment.ASSETS_PATH}`;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  ambientLight: THREE.AmbientLight;
  orbitControls!: OrbitControls;
  raycaster: THREE.Raycaster;
  pointer: THREE.Vector2;

  subscriptionStore : Subscription[] = [];
  planet: { mesh:THREE.Mesh, obj:THREE.Object3D, rotation: number, revolve: number }[] = [];
  planetsData: IPlanetsData[] = [ {name:"earth",size: 70, position: 0, texture: "earth.jpg",rotationSpeed: 0.0, orbitingSpeed: 0.002} ] 
  
  @ViewChild("canvas", { static: true }) canvas!: ElementRef;

  constructor( private planetService: PlanetService) {
    this.subscriptionStore.push(
      this.planetService.data.subscribe((data : IPlanetsData[]) => {
        this.planetsData = data.slice();
      }
    ));
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(90, 90, 70);

    /*provide Light to the spheres*/
    this.ambientLight =  new THREE.AmbientLight( 0xffffff );

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
  }

  initRenderer() : void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
    })
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  renderViewPort () {
    requestAnimationFrame(() => this.renderViewPort()); 
    this.renderer.render(this.scene, this.camera);
    this.orbitControls.update();
  }

  createPlanets(size: number, texture:string, position:number, name: string) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(this.ASSETS_PATH+"/"+texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);

    this.scene.add(obj);
    mesh.userData['name'] = name;
    mesh.position.x = position;
    return {mesh, obj}
  }

  addLight ():void {
    this.scene.add( this.ambientLight);
  }

  addBackGround () {
    this.scene.background = new THREE.TextureLoader().load(this.ASSETS_PATH + '/cloud3.jpg');
  }

  addOrbitControl () {
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  animate() {
    this.planet.forEach( (ele) => {
      ele.mesh.rotateY(ele.rotation);
      ele.obj.rotateY(ele.revolve);
    })
  }

  onPointerMove(event: any) {
    this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // update the picking ray with the camera and pointer position
    this.raycaster.setFromCamera( this.pointer, this.camera );

    // calculate objects intersecting the picking ray
    const found = this.raycaster.intersectObjects( this.scene.children );
  
    if(found.length > 0){
      console.log(found);
      console.log('Mesh clicked!');
    }
  
  }

  ngAfterViewInit() {
    this.initRenderer();
    this.addLight();
    this.addBackGround();
    this.addOrbitControl();
    this.planetsData.forEach( ele => {
      this.planet.push({
        ...this.createPlanets( ele.size , ele.texture, ele.position, ele.name),
        rotation: ele.rotationSpeed, 
        revolve: ele.orbitingSpeed
      });
    });
    window.addEventListener('click', this.onPointerMove.bind(this));
    this.renderer.setAnimationLoop(this.animate.bind(this))
    this.renderViewPort();
  }

  ngDestroy (): void {
    this.subscriptionStore.forEach( (e) => {
      e.unsubscribe();
    })
  }

}
