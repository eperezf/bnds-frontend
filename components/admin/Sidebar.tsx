import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignal, faMicrochip, faBroadcastTower, faMobile, faUsers, faCode, faCogs, faPowerOff} from '@fortawesome/free-solid-svg-icons'

const Sidebar = (props: Props) => {
  return (
    <div className="col-span-2 rounded-lg bg-gray-800 flex flex-col h-full p-4 antialiased">
      <Link href="/admin" passHref><a className={(props.active == "index") ? "text-left p-3 rounded-lg mt-2 text-white bg-green-600 transition-all" : "text-left p-3 rounded-lg mt-2 hover:bg-green-600 text-white transition-all"}><FontAwesomeIcon icon={faHome} className="w-4 mr-2"/>Inicio</a></Link>
      <Link href="/admin/frequency" passHref><a className={(props.active == "frequency") ? "text-left p-3 rounded-lg mt-2 text-white bg-green-600 transition-all" : "text-left p-3 rounded-lg mt-2 hover:bg-green-600 text-white transition-all"}><FontAwesomeIcon icon={faSignal} className="w-4 mr-2"/>Frecuencias</a></Link>
      <Link href="/admin/technology" passHref><a className={(props.active == "technology") ? "text-left p-3 rounded-lg mt-2 text-white bg-green-600 transition-all" : "text-left p-3 rounded-lg mt-2 hover:bg-green-600 text-white transition-all"}><FontAwesomeIcon icon={faMicrochip} className="w-4 mr-2"/>Tecnologías</a></Link>
      <Link href="/admin/operator" passHref><a className={(props.active == "operator") ? "text-left p-3 rounded-lg mt-2 text-white bg-green-600 transition-all" : "text-left p-3 rounded-lg mt-2 hover:bg-green-600 text-white transition-all"}><FontAwesomeIcon icon={faBroadcastTower} className="w-4 mr-2"/>Operadoras</a></Link>
      <Link href="/admin/smartphone" passHref><a className={(props.active == "smartphone") ? "text-left p-3 rounded-lg mt-2 text-white bg-green-600 transition-all" : "text-left p-3 rounded-lg mt-2 hover:bg-green-600 text-white transition-all"}><FontAwesomeIcon icon={faMobile} className="w-4 mr-2"/>Smartphones</a></Link>
      <Link href="/admin/user" passHref><a className={(props.active == "user") ? "text-left p-3 rounded-lg mt-2 text-white bg-green-600 transition-all" : "text-left p-3 rounded-lg mt-2 hover:bg-green-600 text-white transition-all"}><FontAwesomeIcon icon={faUsers} className="w-4 mr-2"/>Usuarios</a></Link>
      <Link href="/admin/api" passHref><a className={(props.active == "api") ? "text-left p-3 rounded-lg mt-2 text-white bg-green-600 transition-all" : "text-left p-3 rounded-lg mt-2 hover:bg-green-600 text-white transition-all"}><FontAwesomeIcon icon={faCode} className="w-4 mr-2"/>API</a></Link>
      <Link href="/admin/settings" passHref><a className={(props.active == "settings") ? "text-left p-3 rounded-lg mt-2 text-white bg-green-600 transition-all" : "text-left p-3 rounded-lg mt-2 hover:bg-green-600 text-white transition-all"}><FontAwesomeIcon icon={faCogs} className="w-4 mr-2"/>Configuración</a></Link>
      <Link href="/admin/logout" passHref><a className="text-left p-3 rounded-lg mt-2 mb-4 hover:bg-green-600 text-white transition-all"><FontAwesomeIcon icon={faPowerOff} className="w-4 mr-2"/>Cerrar Sesión</a></Link>
      <p className="text-white mt-auto text-center text-sm">BNDS ©2021</p>
    </div>
  );
};
export default Sidebar;
