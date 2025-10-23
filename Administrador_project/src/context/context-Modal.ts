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