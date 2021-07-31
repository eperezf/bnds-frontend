import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import Sidebar from '../../components/admin/Sidebar'

export default function Index() {
  return (
    <div className="grid grid-cols-12 grid-flow-col gap-4 p-4 h-screen">
      <Sidebar />
      <div className="col-span-10 rounded-lg bg-gray-800 h-full p-4 antialiased text-white">CONTENT</div>
    </div>
  )
}
