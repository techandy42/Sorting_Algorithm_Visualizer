import React from 'react'
import { Box, Typography } from '@mui/material'
import { BUBBLE, INSERTION, SELECTION, MERGE, QUICK, HEAP } from '../../constants/algorithmTypes'

function timeComplexity(algorithmType) {
  switch (algorithmType) {
    case BUBBLE:
      return 'O(n²)'
    case INSERTION:
      return 'O(n²)'
    case SELECTION:
      return 'O(n²)'
    case MERGE:
      return 'O(nlog(n))'
    case QUICK:
      return 'O(nlog(n))'
    case HEAP:
      return 'O(nlog(n))'
    default:
      return ''
  }
}

function formatAlgorithmName(algorithmType) {
  return algorithmType[0] + algorithmType.slice(1).toLowerCase() + ' Sort'
}

export default function Sidebar({ algorithmType, numSwap }) {
  const timeComplexitySymbol = timeComplexity(algorithmType)
  const algorithmName = formatAlgorithmName(algorithmType)

  const contents = [algorithmName, numSwap, timeComplexitySymbol]

  return (
    <Box sx={{ color: 'white', height: '111.7%', textAlign: 'center', borderLeft: 'double white' }}>
      {contents.map((content) => (
        <Typography variant="h5" sx={{ fontWeight: 100, borderBottom: '1px solid white', py: '1rem' }}>
          {content}
        </Typography>
      ))}
      <Typography sx={{ fontWeight: 100, border: '1px dotted white', p: '0.5rem', m: '1rem' }}>
        Generate Code for Javascript, Python, and Java
      </Typography>
      <Box sx={{ borderBottom: '1px solid white' }} />
    </Box>
  )
}
