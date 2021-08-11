import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import Link from 'next/link';
import Sidebar from '../../components/admin/Sidebar'
import GenerationList from '../../components/admin/GenerationList'
import FrequencyColumn from '../../components/admin/FrequencyColumn'


export default function Frequency() {

  return (
    <div className="grid grid-cols-12 grid-flow-col gap-4 p-4 h-screen">
      <Sidebar active="api"/>
      <div className="col-span-10 rounded-lg bg-gray-800 h-full p-4 antialiased text-white grid grid-cols-2">
        <div className=" col-span-1 p-2">
          <p className="text-white text-2xl text-center">Generaciones</p>
          <div className="w-100 h-100 rounded-lg bg-gray-700 p-4 mt-2 shadow-md">
            <Link href="/admin/frequency/add"><button className="rounded-lg bg-green-600 p-2 mb-4">Agregar generación</button></Link>
            <table className="table-auto w-full text-center">
              <thead>
                <tr>
                  <th className="font-semibold">ID</th>
                  <th className="font-semibold">Nombre</th>
                  <th className="font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
        <FrequencyColumn />
      </div>
    </div>
  )
}
