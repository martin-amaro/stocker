import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
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

function App() {
  return (
    <>
    <BackendTester />
    <Routes>

      {/* Home */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* Authentication */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route path="/register"
        element={<Register />}
      />

      {/* Dashboard */}
      <Route path="/dashboard"
        element={
        <PrivateRoute>
          <Dashboard />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path='articles' element={<DashboardArticles />} />
        <Route path='search' element={<DashboardSearch />} />
        <Route path='staff' element={<DashboardStaff />} />
        <Route path='customers' element={<DashboardCustomers />} />
        <Route path='reports' element={<DashboardReports />} />
        <Route path='payments' element={<DashboardPayments />} />
        <Route path='settings' element={<DashboardSettings />} />

      </Route>
      <Route path="/dashboarde" element={
        <PrivateRoute>
          <Dashboard />
          </PrivateRoute>
        } />
    </Routes>
    </>
  )
}

export default App
