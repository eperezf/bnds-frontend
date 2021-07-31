import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import PhoneTab from '../components/PhoneTab'
import MainTab from '../components/MainTab'
import OperatorTab from '../components/OperatorTab'
import useSWR from 'swr'

export default function Result() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR('/api/user/123', fetcher, {revalidateOnFocus: false, errorRetryCount: 3})
  return (

    <div className="mt-4">
      <div className="max-w-7xl mx-auto grid grid-cols-12 sm:gap-4 gap-0 transition-all">
        <PhoneTab name="Apple iPhone 11" image="/iphone.png" review="https://pisapapeles.net/review-iphone-11"></PhoneTab>
        <MainTab></MainTab>
        <OperatorTab name="Entel" image="/entel.png" url="https://entel.cl"></OperatorTab>
      </div>
    </div>

  )
}
