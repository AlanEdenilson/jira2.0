import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContextProvider, ContextTask } from "@/context/context-Modal";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";

export function DialogDemo({variant}:{variant:string}) {
    const contex = React.useContext(ContextProvider);
    const [open, setOpen] = useState(false);

    const contex2= useContext(ContextTask);
    
      if(contex2==null){
       throw new Error("Contexto no disponible");
      }
    
      const {value,setValue} = contex2 ;
      
    if(contex==null){
      throw new Error("Contexto no disponible");
    }

      
    const {id,setId} = contex;


    const [data, setData] = useState({
      title: "",
      description: "",
      status: variant,
      projectId: id,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Datos a enviar:", { ...data,projectId:id });

      try {
         
        const response = await axios.post(
          "http://localhost:3000/api/task",
          { ...data,projectId:id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
       
        setValue(!value);
        setOpen(false); // Cerrar el diálogo después de enviar
        setData({ // Limpiar el formulario
          title: "",
          description: "",
          status: "completado",
          projectId: id,
        });
      } catch (error) {
        console.error('Error de red:', error);
      } 
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">+</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Crear nueva tarea</DialogTitle>
              <DialogDescription>
                Ingresa los detalles de la nueva tarea
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Nombre de la tarea</Label>
                <Input 
                  id="name-1"
                  name="title"
                  value={data.title}
                  onChange={handleChange} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
}
