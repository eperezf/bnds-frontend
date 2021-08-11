import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import Link from 'next/link';
import Sidebar from '/components/admin/Sidebar'
import GenerationList from '/components/admin/GenerationList'
import FrequencyColumn from '/components/admin/FrequencyColumn'
import GenerationColumn from '/components/admin/GenerationColumn'


export default function Frequency() {

  return (
    <div className="grid grid-cols-12 grid-flow-col gap-4 p-4 h-screen">
      <Sidebar active="frequency"/>
      <div className="col-span-10 rounded-lg bg-gray-800 h-full p-4 antialiased text-white grid grid-cols-2">
        <GenerationColumn />
        <FrequencyColumn />
      </div>
    </div>
  )
}
