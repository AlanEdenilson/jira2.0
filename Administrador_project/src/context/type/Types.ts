export enum ProjectStatus {
  ACTIVO = 'activo',
  COMPLETADO = 'completado',
  CANCELADO = 'cancelado',
}

export enum TaskStatus {
  COMPLETADO = 'completado',
  EN_PROCESO = 'enproceso',
}

export interface User {
    
  id: number;
 
  name: string;
  
  image: string;

  isActive: boolean;

  createdAt: Date;

  updaeAt: Date;
}


export interface Task {
  id: number;

  title: string;

  
  description: string;

  
  status: TaskStatus;

 
  createdAt: Date;

  updateAt: Date;

  isActive: boolean;

  user: User;
}

export interface ProyectsAndTask{
  id: number;

  name: string;

  description: string;


  status: ProjectStatus;

 
  color: string;


  createdAt: Date;

 
  updateAt: Date;

  
  isActive: boolean;

 
  task: Task[];
}