'use client'
import { Header } from '../../components/Header'
import { Filter } from '../../components/Filter'
import { Map } from '../../components/Map'

export default function Home() {
  return (
    <main>
      <Header />
      <Filter />
      <Map/>
    </main>
  )
}
