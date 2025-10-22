import { createContext } from 'react';

interface ModalContextProps {
  isOpen: boolean;
  setOpen: () => void;
  
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

