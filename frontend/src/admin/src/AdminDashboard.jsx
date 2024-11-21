import React from 'react'
import { useState } from 'react'
import ProductListAdminDashboard from './components/ProductListAdminDashboard';
import UsersListAdminDashboard from './components/UsersListAdminDashboard';
import Header from '../../common_components/src/Header';
import { Box } from '@mui/material';
import { Button } from '@mui/material';

const AdminDashboard = () => {

const crmAviableList = ["Список товаров", "Список пользователей"]

  return (
    <>
    <Header />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5}}>     
            {crmAviableList.map((list, index) => (
                <Button key={index}>{list}</Button>
            ))}
        </Box>
    <ProductListAdminDashboard /> 
    <UsersListAdminDashboard />
    </>
  )
}

export default AdminDashboard
