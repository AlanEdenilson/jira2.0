import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { ContextProject, ContextProvider, ContextTask } from "@/context/context-Modal";
import axios from "axios";
import React, {type  ChangeEvent, type FormEvent, useContext, useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";


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

  icon?: LucideIcon;
}

export function DialogDemo({variant}:{variant:string}) {
    const contex = React.useContext(ContextProvider);
    const contex3 = React.useContext(ContextProject);
       
      
    const [open, setOpen] = useState(false);
    const [projecto, setProjecto] = useState('0');

    const contex2= useContext(ContextTask);
    
      if(contex2==null){
       throw new Error("Contexto no disponible");
      }

      if(contex3==null){
       throw new Error("Contexto no disponible");
      }
    
      const {value,setValue} = contex2 ;

      const {projects,} = contex3;

        const projectsArray: Project[] = Array.isArray(projects) ? projects : projects ? [projects] : [];
     
      
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
      console.log('proyecto selecionado'+projecto)
     

      let datos;

      if (id===parseInt(projecto)) {
        datos={ ...data,projectId:id }
      } else {
        datos={ ...data,projectId:parseInt(projecto )}
      }

      console.log(datos)

      

      try {

        const response = await axios.post(
          "https://adtask.onrender.com/api/task",
          datos,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response)
         
       
       
        setValue(!value);
        
        setOpen(false); // Cerrar el diálogo después de enviar

        setData({ // Limpiar el formulario
          title: "",
          description: "",
          status: "completado",
          projectId: id,
        });
        setId(+projecto)
      } catch (error) {
        console.error('Error de red:', error);
      } 
    };

    useEffect(()=>{
     
       setProjecto(''+id)
    },[id])

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
              <Select value={projecto} onValueChange={setProjecto}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
              {
                projectsArray.map((item) => (

                  <SelectItem value={''+item.id}>{item.name}</SelectItem>

                ))
              }

                
                  
                  
              </SelectContent>
            </Select>
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
