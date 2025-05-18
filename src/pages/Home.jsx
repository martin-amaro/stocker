import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Hero } from '../components/home/Hero'
import { Partners } from '../components/home/Partners'
import { Features } from '../components/home/Features'
import { FAQ } from '../components/home/FAQ'

export const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Partners />
        <Features />
        <FAQ />
      </main>
      <Footer></Footer>
    </div>
  )
}
