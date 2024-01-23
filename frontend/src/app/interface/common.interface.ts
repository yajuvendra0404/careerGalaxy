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
    // lanes: string[];
}

export interface ILanesData {
    _id?: string;
    laneName : string;
    laneImage: string;
    planetId?: string;
}

export interface ISkillData {
    skillName: string;
    skillLevel: number;
}

export interface IJobData {
    lane:string;
    title:string;
    description: string;
    salary: number;
    qualification: number;
    skill: ISkillData[];
    certification: string,
    responsibilites: string,
    experience : number,
    levelOfPrep: number,
    _id: string;
}

export interface CustomExceptions extends Error {
    message: string;
}