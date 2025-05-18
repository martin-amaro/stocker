import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Hero } from '../components/home/Hero'
import { Partners } from '../components/home/Partners'
import { Features } from '../components/home/Features'
import { FAQ } from '../components/home/FAQ'
import FeatureCards from '../components/home/FeatureCards'
import { LastHook } from '../components/home/LastHook'

export const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Partners />
        <Features />
        <FeatureCards />
        <FAQ />
        <LastHook />
      </main>
      <Footer></Footer>
    </div>
  )
}
