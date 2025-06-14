import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { PrivateRoute } from './components/PrivateRoute'
import { BackendTester } from './components/BackendTester'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Header } from './components/Header'
import { DashboardHome } from './pages/Dashboard/DashboardHome';
import { DashboardArticles } from './pages/Dashboard/DashboardArticles'
import { DashboardSearch } from './pages/Dashboard/DashboardSearch';
import { DashboardStaff } from './pages/Dashboard/DashboardStaff';
import { DashboardCustomers } from './pages/Dashboard/DashboardCustomers';
import { DashboardReports } from './pages/Dashboard/DashboardReports'
import { DashboardPayments } from './pages/Dashboard/DashboardPayments';
import { DashboardSettings } from './pages/Dashboard/DashboardSettings';
import { GuestRoute } from './components/GuestRoute';
import { NotFound } from './pages/NotFound';
import { DashboardBusiness } from './pages/Dashboard/DashboardBusiness';
import { Logout } from './pages/Logout'
import { PricingPlans } from './components/PricingPlans';
import { RestaurantSection } from './components/RestaurantSection';
import { RetailSection } from './components/RetailSection';
import { BeautySection } from './components/BeautySection';

function App() {
  return (
    <>
      <BackendTester />
      <Routes>

        {/* Rutas públicas */}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<PricingPlans />} />
          <Route path="/restaurantes" element={<RestaurantSection />} />
          <Route path="/retail" element={<RetailSection />} />
          <Route path="/belleza" element={<BeautySection />} />
        </Route>

        <Route path="/logout" element={<Logout />} />

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="articles" element={<DashboardArticles />} />
            <Route path="search" element={<DashboardSearch />} />
            <Route path="staff" element={<DashboardStaff />} />
            <Route path="customers" element={<DashboardCustomers />} />
            <Route path="reports" element={<DashboardReports />} />
            <Route path="payments" element={<DashboardPayments />} />
            <Route path="settings" element={<DashboardSettings />} />
            <Route path="business" element={<DashboardBusiness />} />
          </Route>
        </Route>


        {/* Rutas de error */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  )
}

export default App
