import React from 'react'
import { Toolbar, Typography, AppBar } from '@mui/material'
import { DiYii } from "react-icons/di";
import {Link} from 'react-router-dom'


export default function Header() {

  return (
    <AppBar position="relative">
      <Toolbar style={{ background: '#03440C', display: 'flex', justifyContent: 'space-between' }}>
      <Link to='/'>
        <Typography variant="h6" color="white" wrap="true">
          < DiYii />
          Campos Dealer App
        </Typography>
        </Link>
        <Link to='/api-return'>
          <Typography color='white'>
            Retorno da Api Campos Dealer
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

