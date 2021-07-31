import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import Link from 'next/link';
import Sidebar from '../../components/admin/Sidebar'

export default function Smartphone() {
  return (
    <div className="grid grid-cols-12 grid-flow-col gap-4 p-4 h-screen">
      <Sidebar active="smartphone"/>
      <div className="col-span-10 rounded-lg bg-gray-800 h-full p-4 antialiased text-white grid grid-cols-2">
        <div className=" col-span-2 p-2">
          <p className="text-white text-2xl text-center">Smartphones</p>
          <div className="w-100 h-100 rounded-lg bg-gray-700 p-4 mt-2 shadow-md">
            <div className="flex flex-row justify-between mb-4">
              <Link href="/admin/frequency/add"><button className="rounded-lg bg-green-600 p-2">Agregar Smartphone</button></Link>
              <div>
                <input className="rounded-r-lg p-2 text-black inline"></input>
              </div>
            </div>
            <table class="table-auto w-full text-center">
              <thead>
                <tr>
                  <th className="font-semibold">ID</th>
                  <th className="font-semibold">Nombre</th>
                  <th className="font-semibold">Variantes</th>
                  <th className="font-semibold">Visibilidad</th>
                  <th className="font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-500 transition-all rounded-lg hover:shadow-md">
                  <td className="font-mono rounded-l-lg">akdir4</td>
                  <td>Apple iPhone 12</td>
                  <td>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg break-normal">SM-12345</div>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg break-normal">SM-12345</div>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg break-normal">SM-12345</div>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg break-normal">SM-12345</div>
                  </td>
                  <td>Visible</td>
                  <td className="rounded-r-lg">
                    <Link href="/admin/frequency/add"><button className="rounded-lg bg-green-600 p-2 m-2">Editar</button></Link>
                    <Link href="/admin/frequency/add"><button className="rounded-lg bg-red-600 p-2 m-2">Borrar</button></Link>
                  </td>
                </tr>
                <tr className="hover:bg-gray-500 transition-all rounded-lg hover:shadow-md">
                  <td className="font-mono rounded-l-lg">akdir4</td>
                  <td>Apple iPhone 12</td>
                  <td>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg">SM-12345</div>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg">SM-12345</div>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg">SM-12345</div>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg">SM-12345</div>
                  </td>
                  <td>Visible</td>
                  <td className="rounded-r-lg">
                    <Link href="/admin/frequency/add"><button className="rounded-lg bg-green-600 p-2 m-2">Editar</button></Link>
                    <Link href="/admin/frequency/add"><button className="rounded-lg bg-red-600 p-2 m-2">Borrar</button></Link>
                  </td>
                </tr>
                <tr className="hover:bg-gray-500 transition-all rounded-lg hover:shadow-md">
                  <td className="font-mono rounded-l-lg">akdir4</td>
                  <td>Apple iPhone 12</td>
                  <td>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg">SM-12345</div>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg">SM-12345</div>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg">SM-12345</div>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg">SM-12345</div>
                  </td>
                  <td>Visible</td>
                  <td className="rounded-r-lg">
                    <Link href="/admin/frequency/add"><button className="rounded-lg bg-green-600 p-2 m-2">Editar</button></Link>
                    <Link href="/admin/frequency/add"><button className="rounded-lg bg-red-600 p-2 m-2">Borrar</button></Link>
                  </td>
                </tr>
                <tr className="hover:bg-gray-500 transition-all rounded-lg hover:shadow-md">
                  <td className="font-mono rounded-l-lg">akdir4</td>
                  <td>Apple iPhone 12</td>
                  <td>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg">SM-12345</div>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg">SM-12345</div>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg">SM-12345</div>
                    <div className="p-2 m-1 inline bg-gray-800 rounded-lg">SM-12345</div>
                  </td>
                  <td>Visible</td>
                  <td className="rounded-r-lg">
                    <Link href="/admin/frequency/add"><button className="rounded-lg bg-green-600 p-2 m-2">Editar</button></Link>
                    <Link href="/admin/frequency/add"><button className="rounded-lg bg-red-600 p-2 m-2">Borrar</button></Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
