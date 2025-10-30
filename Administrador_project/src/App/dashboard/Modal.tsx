import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AlertCircleIcon, CheckCircle2Icon, Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import axios, { type AxiosResponse } from "axios";
import { ProjectContext } from "@/context/context-Modal";

interface Response{
  status: number
  ok: boolean
   message: string
  data: string | []
}

interface Alert{
  mensage:string
  ok: boolean
  type:'a'|'e'
}

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  
  const [showAlert, setShowAlert] = useState<Alert>({mensage:"", ok:false, type:'a'});

  const context = useContext(ProjectContext);

  if (!context){
    throw new Error('a ocurrido un error al usar el esado del proyecto')
  }

  const {valor,setValor} = context

  // 1. Define validation schema
  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Too short!" })
      .max(30, { message: "Too long!" }),
    description: z
      .string()
      .min(2, { message: "Too short!" })
      .max(100, { message: "Too long!" }),
    color: z
      .string()
      .min(7, { message: "Invalid color!" })
      .max(7, { message: "Invalid color!" }),
  });

  // 2. Create form with useForm hook
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", description: "", color: "#62a0ea" },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const enviarDatosConAxios = async () => {
      try {
        const response = await axios.post<Response>(
          "http://localhost:3000/api/project",
          { ...values },
          {
            headers: {
              "Content-Type": "application/json",
              // Puedes agregar más headers como tokens de autenticación:
              // 'Authorization': `Bearer ${token}`
            },
          }
        );

        setShowAlert({mensage:response.data.message, ok:response.data.ok, type:'a'})

        

        console.log("Datos enviados exitosamente:", response.data);
      } catch (err) {
        
        setShowAlert({mensage:err?.code as string, ok:true, type:'e'})

        
        console.error("Error al enviar datos:", err);
      }
    };

    enviarDatosConAxios();
  }

  useEffect(() => {
    if(showAlert.ok){
      const timer = setTimeout(() => {
        setShowAlert({mensage:"", ok:false, type:'a'})
        setOpen(false);
        form.reset();
        setValor(!valor)
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      <Plus
        onClick={() => {
          setOpen(!open);
        }}
      ></Plus>
      <Dialog open={open} onOpenChange={setOpen}>
        <span
          onClick={() => {
            setOpen(!open);
          }}
        >
          new Project
        </span>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crer proyecto</DialogTitle>
            <DialogDescription>
              Por favor describe los detalles del nuevo proyecto que deseas
              crear.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>description</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>color</FormLabel>
                      <FormControl>
                        <Input
                          className="w-24"
                          type="color"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {(showAlert.ok &&  showAlert.type ==='a')&&<Alert className="bg-sky-100 mb-3">
                <CheckCircle2Icon />
                <AlertTitle>{showAlert.mensage}</AlertTitle>
                <AlertDescription>
                  This is an alert with icon, title and description.
                </AlertDescription>
              </Alert>
              }
              {(showAlert.ok &&  showAlert.type ==='e')&&
                <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>{showAlert.mensage}</AlertTitle>
              
              </Alert>
              }

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
