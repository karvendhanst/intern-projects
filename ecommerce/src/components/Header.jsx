import React from 'react'
import { Box, Typography } from '@mui/material'
import { useThemeStore } from '../store/themeStore'

const Header = () => {

    const { darkMode } = useThemeStore()
   
  return (

        <Box sx={{ 
                height:"80vh",
                display:"flex", 
                justifyContent:"center",
                alignItems:"center",
                color: darkMode ? "#fff" : "#333" 
                }}>

                    <div sx={{
                            display:"flex",
                            flexDirection:"column",
                        
                            }}>
                    <Typography variant="h4" align='center'>
                        Discover Your Style.  <span style={{color:"#9c27b0"}}>Shop the Latest Trends</span>
                    </Typography>
            
                    <Typography variant="body1" align='center' sx={{m:3}}>
                        Shop Products Online With #FREE SHIPPING
                    </Typography>
                    </div>
        </Box>
    
  )
}

export default Header