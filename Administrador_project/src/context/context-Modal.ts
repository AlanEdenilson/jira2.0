import React, { createContext } from 'react';
import type { ProyectsAndTask } from './type/Types';

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



export const  ContextProvider  = React.createContext<GloblasProyect|null>(null)


interface task{
  value : boolean
  setValue: React.Dispatch<React.SetStateAction<boolean>>
}


export const  ContextTask  = React.createContext<task|null>(null)


