import { useState } from "react"
import ListProject from "./ListProject";


const BarraLateral = () => {

   const[open,setOpen] = useState(true)

   const toggleSidebar = () => {
    setOpen(!open); // Cambia el estado de isOpen
  };

   
  return (
    <>
    <div onClick={toggleSidebar} className={`${open ? 'w-6 fixed top-2 left-60 z-10':'w-6 fixed top-2 left-1'}`}>
             <svg className="w-5/5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/></svg>
    </div>



    
    <div className={`${open ? 'bg-white w-5 h-screen basis-1/5 shadow-lg shadow-black mr-2 pt-2 relative':'hidden'} `}>
    <button className="mt-6 ml-8 mb-10 bg-blue-400 p-3 rounded-full">Add Project</button>

    <div className="bg-amber-800 m-2">
      <ListProject/>
    </div>
        
        
    </div>
    </>
  )
}

export default BarraLateral
