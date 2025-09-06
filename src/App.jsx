import './App.css'
import { useState } from 'react'
import { Route, Routes, } from 'react-router-dom'
import Navbar from './components/Navbar'
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import Register from './pages/Register'
import Userblogs from './pages/Userblogs'
import CreateBlog from './pages/CreateBlog'
import BlogDetails from './pages/BlogDetails'
import {Toaster} from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>

        <Route path='/' element={<Blogs />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/myblogs' element={<Userblogs />} />
        <Route path='/createblog' element={<CreateBlog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/blogdetails/:id' element={<BlogDetails />} />
      </Routes>
    </>
  )
}

export default App
