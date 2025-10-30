"use client";

import { useContext, useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Task } from "@/components/task-board";
import axios from "axios";
import { ContextTask } from "@/context/context-Modal";
import { set } from "zod";

export function DialogDemo2({
  variant,
  task,
  estado,
}: {
  variant: string;
  task: Task;
  estado:string
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState("enproceso");

  const contex2 = useContext(ContextTask);

  if (contex2 == null) {
    throw new Error("Contexto no disponible");
  }

  const { value, setValue } = contex2;

   let initial = "UN";

  if (task.user!=null ) {
    initial = task.user?.name;
    initial= initial[0]+initial[initial.length-1]
  }

  const handleSave = async () => {
    console.log("[v0] Saving task:", { title, description, status });
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/task/" + task.id,
        { title, description, status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Datos enviados exitosamente:", response.data);
      setOpen(false);
      setValue(!value);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  useEffect(() => {
    console.log('estatus antes'+status)
    setStatus(estado);
    console.log('estatus despues'+status)
  }, [open]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <h3 className="text-sm font-medium text-foreground">{variant}</h3>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <DialogTitle>Editar Tarea</DialogTitle>
                <DialogDescription>
                  Modifica los detalles de la tarea. Haz clic en guardar cuando
                  termines.
                </DialogDescription>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/professional-person.png"
                    alt={task.user?.name}
                  />
                  <AvatarFallback className="bg-orange-500 text-xs ">{initial}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{task.user ? task.user?.name : 'unnagsigned'}</p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ingresa el título de la tarea"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ingresa la descripción de la tarea"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completado">completado</SelectItem>
                  <SelectItem value="enproceso">enproceso</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
