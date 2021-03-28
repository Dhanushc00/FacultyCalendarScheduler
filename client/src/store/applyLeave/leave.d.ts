export interface Ileave{
    Leaveid: string,
    fromdate: string,
    todate: string,
    leavetype: string,
    createdAt?: string,
    updatedAt?: string,
}
export interface Ileavesend{
    fromdate: string,
    todate: string,
    leavetype: string,
}