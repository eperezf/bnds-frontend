import React, { useState } from 'react';
import Link from 'next/link';
import FrequencyList from './FrequencyList'
import useSWR from 'swr'

const FrequencyColumn = (props: Props) => {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR('http://localhost:3001/offline/frequency', fetcher, {revalidateOnFocus: false, errorRetryCount: 3})

  if (error){
    return(
      <div className=" col-span-1 p-2">
        <p className="text-white text-2xl text-center">Frecuencias</p>
        <div className="w-100 h-100 rounded-lg bg-gray-700 p-4 mt-2 shadow-md">
          <p>Ocurrió un error al cargar las frecuencias</p>
        </div>
      </div>
    )
  }
  if (!data){
    return(
      <div className=" col-span-1 p-2">
        <p className="text-white text-2xl text-center">Frecuencias</p>
        <div className="w-100 h-100 rounded-lg bg-gray-700 p-4 mt-2 shadow-md">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  if (data) {
    var frequencies = [];
    for (const generation of data.frequencies) {
      for (const frequency of generation.frequencies) {
        frequency.generation = generation.name
        frequency.SK = frequency.SK.replace("FREQUENCY#","");
        frequencies.push(frequency)
      }
    }
    return (
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
    );
  }
};
export default FrequencyColumn;
