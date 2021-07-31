import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import Link from 'next/link';
import Sidebar from '../../components/admin/Sidebar'
import GenerationList from '../../components/admin/GenerationList'
import FrequencyList from '../../components/admin/FrequencyList'
import useSWR from 'swr'

export default function Frequency() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR('http://localhost:3001/offline/frequency', fetcher, {revalidateOnFocus: false, errorRetryCount: 3})

  if (error) return(<div>error</div>)
  if (!data) return(<div>no data</div>)
  if (data) {
    var frequencies = [];
    for (const generation of data.frequencies) {
      for (const frequency of generation.frequencies) {
        frequency.generation = generation.name
        frequency.SK = frequency.SK.replace("FREQUENCY#","");
        frequencies.push(frequency)
      }
    }
  }
  return (
    <div className="grid grid-cols-12 grid-flow-col gap-4 p-4 h-screen">
      <Sidebar active="frequency"/>
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
        <div className=" col-span-1 p-2">
          <p className="text-white text-2xl text-center">Frecuencias</p>
          <div className="w-100 h-100 rounded-lg bg-gray-700 p-4 mt-2 shadow-md">
            <Link href="/admin/frequency/add"><button className="rounded-lg bg-green-600 p-2 mb-4">Agregar frecuencia</button></Link>
            <table className="table-auto w-full text-center">
              <thead>
                <tr>
                  <th className="font-semibold">ID</th>
                  <th className="font-semibold">Generación</th>
                  <th className="font-semibold">Nombre</th>
                  <th className="font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {frequencies.map(function(frequency, i){
                  return <FrequencyList id={frequency.SK} generation={frequency.generation} name={frequency.name} key={i} />
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
