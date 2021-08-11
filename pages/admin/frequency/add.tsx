import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import Link from 'next/link';
import Sidebar from '/components/admin/Sidebar'
import GenerationList from '/components/admin/GenerationList'
import FrequencyColumn from '/components/admin/FrequencyColumn'
import GenerationColumn from '/components/admin/GenerationColumn'
import useSWR from 'swr'


export default function Frequency() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR('http://localhost:3001/offline/generation', fetcher, {revalidateOnFocus: false, errorRetryCount: 3})
  let selector;
  if (error) {
    selector =
      <select id="generation" className="text-center mt-2 rounded-lg text-black" disabled defaultValue={'default'}>
        <option value="default">Error cargando generaciones</option>
      </select>
  }
  if (!data) {
    selector =
      <select id="generation" className="text-center mt-2 rounded-lg text-black" disabled defaultValue={'default'}>
        <option value="default">Cargando generaciones...</option>
      </select>
  }
  if (data) {
    selector =
      <select id="generation" className="text-center mt-2 rounded-lg text-black">
        {data.generations.map(function(generation, i){
          return <option name={generation.name} key={i}>{generation.name}</option>
        })}
      </select>
  }

  const createFrequency = async event => {
    event.preventDefault() // don't redirect the page
    console.log(event.target.name.value);
    const res = await fetch(
      'http://localhost:3001/offline/frequency',
      {
        body: JSON.stringify({
          generation: event.target.generation.value,
          name: event.target.name.value
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
    const result = await res.json()
    console.log(result);

  }

  return (
    <div className="grid grid-cols-12 grid-flow-col gap-4 p-4 h-screen">
      <Sidebar active="frequency"/>
      <div className="col-span-10 rounded-lg bg-gray-800 h-full p-4 antialiased text-white grid grid-cols-2">
        <div className=" col-span-2 p-2">
          <p className="text-white text-2xl text-center">Agregar nueva frecuencia</p>

          <form onSubmit={createFrequency} className="grid grid-cols-3 grid-flow-col">
            <div className="col-start-2 col-span-1 grid grid-cols-1">
              <label htmlFor="generation" className="text-center mt-2">Generación</label>
              {selector}

              <label htmlFor="name" className="text-center mt-2">Nombre</label>
              <input type="text" id="name" className="rounded-lg text-black mt-2" required />
              <button type="submit" className=" w-32 mx-auto mt-4 rounded-lg p-2 bg-green-600 hover:bg-green-500 shadow transition-all">Agregar</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
