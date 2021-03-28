
export interface Iperiod{
    periodId: string,
    startTime: string,
    endTime: string,
    courseCode: string,
    createdAt?: string,
    updatedAt?: string,
    userUsername: string,
    semesterSemId: string
}
// interface ICperiod{

// }
export interface IperiodInput{
    startTime: string,
    endTime: string,
    courseCode: string,
    day:string,
}
export interface IperiodPK{
    username:string[],
    sem:string[]
}
export interface IPksingle{
    username:string,
    sem:string
}