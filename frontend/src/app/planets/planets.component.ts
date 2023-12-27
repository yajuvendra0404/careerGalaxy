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
  DOMAIN:string = `${environment.DOMAIN}`;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  ambientLight: THREE.AmbientLight;
  orbitControls!: OrbitControls;
  raycaster: THREE.Raycaster;
  pointer: THREE.Vector2;

  subscriptionStore : Subscription[] = [];
  planet: { 
    mesh:THREE.Mesh, 
    obj:THREE.Object3D, 
    rotation: number, 
    revolve: number,
    id:string,
    name:string 
  } [] = [];
  planetsData: IPlanetsData[] = [];
  // {_id:"home", name:"earth",size: 70, position: 0, texture: "earth.jpg",rotationSpeed: 0.0, orbitingSpeed: 0.002}];
  
  @ViewChild("canvas", { static: true }) canvas!: ElementRef;

  constructor( private _planetService: PlanetService) {
    this.subscriptionStore.push(
      this._planetService.data.subscribe((data : IPlanetsData[]) => {
        this.planetsData = data.slice();
      }
    ));
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 140, 50);

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

  createPlanets(size: number, texture:string, position:number, name: string, id:string) {

    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(this.DOMAIN+""+texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData['id'] = id;
    mesh.position.x = position;

    const obj = new THREE.Object3D();
    obj.add(mesh);
    obj.userData['name'] = name;
    obj.name = name;

    this.scene.add(obj);

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
      console.log("-- found --", found[0].object.userData['id']);
      this._planetService.data.next(this.planetsData.filter((ele) => {
        ele._id == found[0].object.userData['id'];
      }))
    }
  }

  ngAfterViewInit() {

      this.initRenderer();
      this.addLight();
      this.addBackGround();
      this.addOrbitControl();
      this.planetsData.forEach( ele => {
        this.planet.push({
          id: ele._id,
          name: ele.name,
          ...this.createPlanets( ele.size , ele.texture, ele.position, ele.name, ele._id),
          rotation: ele.rotationSpeed, 
          revolve: ele.orbitingSpeed
        });
      });
      window.addEventListener('click', this.onPointerMove.bind(this));
      this.renderer.setAnimationLoop(this.animate.bind(this))
      this.renderViewPort();

  }

  clearScene(): void {
    this.scene.children.forEach((object) => {
      this.scene.remove(object);
    });
  }

  private disposeMaterial(material: THREE.Material | THREE.Material[]): void {
    if (Array.isArray(material)) {
      material.forEach((mat) => this.disposeMaterial(mat));
    } else if (material) {
      material.dispose();
    }
  }
  
  ngOnDestroy (): void {

    this.subscriptionStore.forEach( (e) => {
      e.unsubscribe();
    })
    this.renderer.dispose();
    this.clearScene();
    this.planet= [];


  }

}
