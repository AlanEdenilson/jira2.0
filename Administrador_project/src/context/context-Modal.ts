import React, { createContext } from 'react';


interface ModalContextProps {
  isOpen: boolean;
  setOpen: () => void;
  
}

interface estado{
  valor: boolean
  setValor: React.Dispatch<React.SetStateAction<boolean>>
 }

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ProjectContext = React.createContext<estado | null>(null)

interface estado{
  valor: boolean
  setValor: React.Dispatch<React.SetStateAction<boolean>>
}

interface GloblasProyect{
  id : number| null
  setId: React.Dispatch<React.SetStateAction<number| null >>
}

enum ProjectStatus {
  ACTIVO = "activo",
  COMPLETADO = "completado",
  CANCELADO = "cancelado",
}

interface Project {
  id: number;

  name: string;

  description: string;

  status: ProjectStatus;

  color: string;

  createdAt: Date;

  updateAt: Date;

  isActive: boolean;

   task: [];


}


export const  ContextProvider  = React.createContext<GloblasProyect|null>(null)


interface task{
  value : boolean
  setValue: React.Dispatch<React.SetStateAction<boolean>>
}


export const  ContextTask  = React.createContext<task|null>(null)

interface Proyecto{
  projects : Project|  Project[] | [] 
  setProjects: React.Dispatch<React.SetStateAction<Project |Project[] | []>>
}

export const ContextProject = React.createContext<Proyecto | null>(null)


