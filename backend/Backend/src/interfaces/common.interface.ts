
export interface IPlanetsData {
    name: string;
    size: number;
    texture: string;
    position: number;
    rotationSpeed: number;
    orbitingSpeed: number;
}
export interface ILaneData {
    _id: string;
    laneName: string;
    laneImage: string;
    planetId: string;
}

export interface IJobData {
    _id:string;
    lane:string;
    title: string;
    description: string;
    salary: number;
    qualification: string[];
    skill: ISkill[];
    certification: string[],
    responsibilites: string,
    experience : number,
    levelOfPrep: number,
}

export interface ISkill {
    skillName: String;
    skillLevel: number;
}

export interface ICertification {
    _id?:String,
    name: String
}

export interface IQualifications {
    _id?:String,
    name: String
}
