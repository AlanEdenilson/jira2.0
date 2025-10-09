import { useState } from 'react'

import BarraLateral from './componets/BarraLateral'
import Proyect from './componets/Proyect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex w-screen h-screen bg-white '>
      <BarraLateral></BarraLateral>
      <Proyect/>

    </div>
      
    </>
  )
}

export default App
