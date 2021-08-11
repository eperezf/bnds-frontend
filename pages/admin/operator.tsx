import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import Link from 'next/link';
import Sidebar from '../../components/admin/Sidebar'
import OperatorCard from '../../components/admin/OperatorCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons'



export default function Frequency() {

  return (
    <div className="grid grid-cols-12 grid-flow-col gap-4 p-4 h-screen">
      <Sidebar active="operator"/>
      <div className="col-span-10 rounded-lg bg-gray-800 h-full p-4 antialiased text-white ">
          <p className="text-white text-2xl text-center col-span-6">Operadoras</p>
          <div className="grid grid-cols-4">
            <OperatorCard name="Entel" url="https://entel.cl" id="asdf12" image="/entel.png"/>
            <OperatorCard name="Claro" url="https://clarochile.com" id="qAsd94" image="/entel.png"/>
            <div className="col-span-1 p-2 m-2 rounded-lg bg-gray-700 shadow items-center ">
              <p className="text-center text-lg">Agregar Operadora</p>
              <p className="text-center h-auto m-auto"><FontAwesomeIcon icon={faPlusCircle} className="place-self-center m-auto w-32 h-32 "/></p>
            </div>
          </div>

      </div>

    </div>
  )
}
