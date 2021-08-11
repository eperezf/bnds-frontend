import React, { useState } from 'react';
import Link from 'next/link';
import GenerationList from './GenerationList'
import useSWR from 'swr'

const GenerationColumn = (props: Props) => {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR('http://localhost:3001/offline/generation', fetcher, {revalidateOnFocus: false, errorRetryCount: 3})

  if (error){
    return(
      <div className=" col-span-1 p-2">
        <p className="text-white text-2xl text-center">Generaciones</p>
        <div className="w-100 h-100 rounded-lg bg-gray-700 p-4 mt-2 shadow-md">
          <p>Ocurrió un error al cargar las frecuencias</p>
        </div>
      </div>
    )
  }
  if (!data){
    return(
      <div className=" col-span-1 p-2">
        <p className="text-white text-2xl text-center">Generaciones</p>
        <div className="w-100 h-100 rounded-lg bg-gray-700 p-4 mt-2 shadow-md">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  if (data) {
    var generations = data.generations
    return (
      <div className=" col-span-1 p-2">
        <p className="text-white text-2xl text-center">Generaciones</p>
        <div className="w-100 h-100 rounded-lg bg-gray-700 p-4 mt-2 shadow-md">
          <Link href="/admin/generation/add"><button className="rounded-lg bg-green-600 p-2 mb-4">Agregar generación</button></Link>
          <table className="table-auto w-full text-center">
            <thead>
              <tr>
                <th className="font-semibold">Nombre</th>
                <th className="font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {generations.map(function(generation, i){
                return <GenerationList id={generation.name} generation={generation.generation} name={generation.name} key={i} />
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};
export default GenerationColumn;
