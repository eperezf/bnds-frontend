import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const OperatorCard = (props: Props) => {
  return (
    <div className="col-span-1 p-2 m-2 rounded-lg bg-gray-700 shadow items-center">
      <p className="text-center text-lg">{props.name}</p>
      <div className="h-20 relative self-center">
        <Image src={props.image} alt="bnds" layout="fill" objectFit="contain" />
      </div>
      <div className="grid grid-cols-1 items-center">
        <Link href={"operator/edit/"+props.id}>
          <div className="col-span-1 text-center p-1 rounded-lg shadow bg-green-600 m-2">Editar</div>
        </Link>
        <Link href={"operator/deactivate/"+props.id}>
          <div className="col-span-1 text-center p-1 rounded-lg shadow bg-gray-600 m-2">Desactivar</div>
        </Link>
        <Link href={"operator/delete/"+props.id}>
          <div className="col-span-1 text-center p-1 rounded-lg shadow bg-red-600 m-2">Eliminar</div>
        </Link>
      </div>

    </div>
  );
};
export default OperatorCard;
