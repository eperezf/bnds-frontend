import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.png'


const Header = (props: Props) => {
  return (
    <nav className="bg-green-800 bg-opacity-80 shadow-md h-16 m-2 text-white rounded-lg backdrop-filter backdrop-blur-lg">
      <div className="grid grid-cols-2 justify-items-center flex px-6 h-full">
        <div className="justify-self-start self-center items-center flex flex-row">
          <div className="w-24">
            <Image src={logo} alt="bnds" layout="responsive"/>
          </div>
          <div className="grid grid-flow-col">
            <button type="button" className="px-4 text-gray-200 hover:text-white w-full transition ease-in duration-200 text-center text-base font-semibold">Inicio</button>
            <button type="button" className="px-4 text-gray-200 hover:text-white w-full transition ease-in duration-200 text-center text-base font-semibold">Acerca de</button>
          </div>
        </div>
        <div className="justify-self-end self-center">
          <button type="button" className="px-4 text-gray-200 hover:text-white w-full transition ease-in duration-200 text-center text-base font-semibold">Dev</button>
        </div>
      </div>
    </nav>
  );
};
export default Header;
