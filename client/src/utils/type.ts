export type User = {
    id : number;
    fullName : string;
    email:string,
    password:string
}

export type Task =  {
    id:number;
    taskName:string;
    assigneeId:number,
    asignDate:string,
    dueDate:string,
    priority:string,
    progress:string,
    status:string
}

export type Project = {
    id:number,
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