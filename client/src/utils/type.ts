export type User = {
    id : number | string;
    fullName : string;
    email:string,
    password:string
}

export type Task =  {
    id:number;
    taskName:string;
    assingeeId:number,
    assgnDate:string,
    dueDate:string,
    priority:string,
    progress:string,
    status:string,
    projectId : number
}

export type Project = {
    id:number,
    idUser:number,
    projectName:string,
    image:string,
    note:string,
    members:[
        {
            userId:number,
            role:string
        }
    ]
}