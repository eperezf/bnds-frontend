import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


const PhoneTab = (props: Props) => {
  return (
    <div className="col-span-6 order-first md:col-span-3 flex flex-col items-center p-4 sm:rounded-lg sm:shadow-md bg-white">
      <div className="font-semibold text-xl mx-auto">{props.name}</div>
      <div className="h-64 w-40 relative">
        <Image src={props.image} alt="bnds" layout="fill" objectFit="contain" />
      </div>
      <Link href={props.review}>
        <button className="bg-green-400 p-3 m-2 rounded-lg text-white">Leer Review</button>
      </Link>

    </div>
  );
};
export default PhoneTab;
