export interface IeventParticipant{
    events: Ievent[],
    participant: IParticipant[], 
}

export interface Ievent {
    EventId?: string,
    creator?: string,
    startTime: string,
    endTime: string,
    EventName: string,
    Description: string,
    type: string,
    Location: string,
    users: [{
        username: string,
    }],
    createdAt?: string,
    updatedAt?: string
}
export interface Ieventsend {
    startTime: string,
    endTime: string,
    EventName: string,
    Description: string,
    Participants: string[],
    type: string,
    Location: string,
}
export interface IParticipant{
    EventId: string,
    creator?: string,
    startTime: string,
    endTime: string,
    EventName: string,
    Description?: string,
    type: string,
    Location: string,
    createdAt?: string,
    updatedAt?: string,
    users:userParticipant[],
}

export interface userParticipant{
    username: string,
    EventParticipant?: any
}