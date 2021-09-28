import React from 'react'
import { Typography } from '@mui/material'

export default function Sidebar({ algorithmType, numSwap }) {
  return (
    <div>
      <Typography>Sidebar</Typography>
      <Typography>{algorithmType}</Typography>
      <Typography>{numSwap}</Typography>
    </div>
  )
}
