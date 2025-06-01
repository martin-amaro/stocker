import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Hero } from '../components/home/Hero'
import { Partners } from '../components/home/Partners'
import { Features } from '../components/home/Features'
import { FAQ } from '../components/home/FAQ'
import FeatureCards from '../components/home/FeatureCards'
import { LastHook } from '../components/home/LastHook'
import { Pricing } from '../components/home/Pricing'
import { Testimonials } from '../components/home/Testimonials'
import { MainTestimonial } from './../components/home/MainTestimonial';
import { Heroless } from '../components/home/Heroless'
import { Categories } from '../components/home/Categories'

export const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Partners />
        <Features />
        <FeatureCards />
        <MainTestimonial />
        <Heroless />

        <Categories />
        <Testimonials />
        <FAQ />
        <LastHook />
      </main>
      <Footer></Footer>

    </div>
  )
}
