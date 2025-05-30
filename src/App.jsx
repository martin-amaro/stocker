import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { PrivateRoute } from './components/PrivateRoute'
import { BackendTester } from './components/BackendTester'
import { Register } from './pages/Register'
import { Dashboard } from './components/dashboard/Dashboard'

function App() {
  return (
    <>
    <BackendTester />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}>v</Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
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
