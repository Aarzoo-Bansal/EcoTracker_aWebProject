import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import ViewPosts from './ViewPosts'
import NavbarButtom from './NavbarButtom'
import { useLocation } from 'react-router-dom'
import { supabase } from '../../Client'

function HomePage() {

    return (
    <div>
      <Navbar/>
      <ViewPosts />
      <NavbarButtom />
    </div>
  )
}

export default HomePage
