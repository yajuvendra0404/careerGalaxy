
export interface IPlanetsData {
    name: string;
    size: number;
    texture: string;
    position: number;
    rotationSpeed: number;
    orbitingSpeed: number;
}
export interface ILaneData {
    _id:string;
    laneName : string;
    laneImage: string;
    planetId: string;
}
export interface ISkill {
    skillName: String;
    skillLevel: number;
}