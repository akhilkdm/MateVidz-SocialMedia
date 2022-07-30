import { Stack } from '@mui/material'
import React from 'react'
import Admindashboard from '../../components/Admin/AdminSidebar'
import ReportsTable from './ReportsTable'

export default function AdminRepotedPosts() {
  return (
    <>
   <Stack direction="row" justifyContent="space-between">
        <Admindashboard />
       <ReportsTable/>
      </Stack>
    </>
  )
}
