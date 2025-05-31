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
import { Auth } from './../components/auth/Auth';
import { Guest } from './../components/auth/Guest';
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export const Home = () => {
  const { user } = useAuth();

  // If the user is authenticated, redirect to the dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

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
