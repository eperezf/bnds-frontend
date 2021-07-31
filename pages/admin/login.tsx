import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import Header from '../../components/Header'

export default function Login() {
  return (
    <div className="flex justify-center items-center content-center h-screen antialiased">
      <div className="w-80 bg-white shadow-md rounded-lg p-4">
        <div className="self-center text-center">BNDS ADMIN LOGIN</div>
        <div className="flex flex-col">
          <div className="font-semibold mt-3">Correo</div>
          <input type="text" className="mt-1 w-full rounded-md border-2 border-gray-300"></input>
          <div className="font-semibold mt-3">Contraseña</div>
          <input type="password" className="mt-1 w-full rounded-md border-2 border-gray-300"></input>
          <button className="p-2 bg-indigo-400 rounded-lg text-white mt-6 hover:bg-indigo-500 active:bg-indigo-800">Entrar</button>
        </div>
      </div>
    </div>
  )
}
