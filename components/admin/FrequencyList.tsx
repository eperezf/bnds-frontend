import React, { useState } from 'react';
import Link from 'next/link';

const FrequencyList = (props: Props) => {
  return (
    <tr className="hover:bg-gray-500 transition-all rounded-lg hover:shadow-md">
      <td className="font-mono rounded-l-lg">{props.id}</td>
      <td>{props.generation}</td>
      <td>{props.name}</td>
      <td className="rounded-r-lg">
        <Link href={"/admin/frequency/edit/" + props.id}><button className="rounded-lg bg-green-600 p-2 m-2">Editar</button></Link>
        <Link href={"/admin/frequency/delete/" + props.id}><button className="rounded-lg bg-red-600 p-2 m-2">Borrar</button></Link>
      </td>
    </tr>
  );
};
export default FrequencyList;
