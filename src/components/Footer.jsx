import React from 'react'
import {Box, Typography, Link } from '@mui/material'

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://camposdealer.com.br/">
          Allan Kisner
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );}

function Footer() {

  return (

    <Box style={{background: '#03440C', padding: '5px'}} component="footer">
        <Typography color="white" variant="h6" align="center" gutterBottom>
         Campos Dealer App
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="white"
          component="p"
        >
          Controle de Produtos, Clientes e Vendas
        </Typography>
        <Copyright />
      </Box>
  )
}

export default Footer