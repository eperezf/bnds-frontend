import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import VariantButton from './VariantButton';
import Accordion from './Accordion';


const MainTab = (props: Props) => {
  const [variant, setVariant] = useState("A1234");

  return (
    <div className="col-span-12 order-last md:col-span-6 md:order-2 sm:rounded-lg sm:shadow-md bg-white">
      <div className="mx-auto text-center font-semibold">Selecciona una variante:</div>
      <div className="grid grid-cols-4 gap-3 mx-4 mt-2">
        <VariantButton name="A1234"/>
        <VariantButton name="A1234"/>
        <VariantButton name="A1234"/>
        <VariantButton name="A1234"/>
      </div>
      <div className="mx-auto text-center mt-4 text-2xl font-bold">Apple iPhone 11 {variant}</div>
      <div className="mx-auto text-center mt-4 text-2xl font-bold">Frecuencias</div>
      <div>
        <Accordion name="Compatibilidad 2G" status="green"/>
        <Accordion name="Compatibilidad 3G" status="yellow"/>
        <Accordion name="Compatibilidad 4G" status="red"/>
        <Accordion name="Compatibilidad 5G" status="gray"/>
      </div>
      <div className="mx-auto text-center mt-4 text-2xl font-bold">Tecnologías</div>
      <div>
        <Accordion name="SAE" status="green"/>
        <Accordion name="VoLTE" status="yellow"/>
        <Accordion name="Voz HD" status="red"/>
        <Accordion name="eSIM" status="gray"/>
      </div>
    </div>
  );
};
export default MainTab;
