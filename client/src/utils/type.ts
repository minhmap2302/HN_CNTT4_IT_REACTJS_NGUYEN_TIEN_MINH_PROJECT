export interface User {
    id : number;
    fullName : string;
    email:string,
    password:string
}

export interface Task {
    id:number;
    taskName:string;
    assigneeId:number,
    asignDate:string,
    dueDate:string,
    priority:string,
    progress:string,
    status:string
}

export interface Project{
    id:number,
    projectName:string,
    image:string,
    members:[
        {
            userId:number,
            role:string
        }
    ]
}