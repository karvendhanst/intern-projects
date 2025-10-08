import React from 'react'
import ButtonAppBar from '../components/Appbar'
import Header from '../components/Header'
import { useThemeStore } from '../store/themeStore';

const Home = () => {
    const { darkMode } = useThemeStore()
  return (
    <div sx={{backgroundColor: darkMode ? "#333" : "#fff" , color: darkMode ? "#fff" : "#333"}}>
        
        <ButtonAppBar/>

        <Header/>

        
    
    </div>
  )
}

export default Home