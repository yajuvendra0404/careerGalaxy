export interface IGeometry {
    stars: THREE.SphereGeometry | null,
    planet:THREE.SphereGeometry | null,
}
export interface IAuthResponseData {
    idToken:	string;	
    email:	string;
    refreshToken:	string;	
    expiresIn:	string;	
    localId:	string;	
    registered?:	boolean;
}
  
export interface IPlanetsData {
    _id:string;
    name: string;
    size: number;
    texture: string;
    position: number;
    rotationSpeed: number;
    orbitingSpeed: number;
}