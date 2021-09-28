import React, { useState } from 'react'
import { BUBBLE, INSERTION, MERGE, QUICK, HEAP, SELECTION } from '../../constants/algorithmTypes'
import { Slider, Box, AppBar, Toolbar, Typography, ButtonGroup, Button, Input, CssBaseline } from '@mui/material'
import { styled } from '@mui/material/styles'

const DesktopView = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
  },
}))

const MobileView = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}))

const CustomSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
})

const minSpeed = 1
const maxSpeed = 10
const minNumBar = 5
const maxNumBar = 200

export default function Navbar({
  algorithmType,
  setAlgorithmType,
  speed,
  setSpeed,
  numBar,
  setNumBar,
  resetCounter,
  setResetCounter,
  isRunning,
  setIsRunning,
  setNumSwap,
}) {
  const handleSpeedChange = (e, newValue) => {
    if (!isRunning) {
      setSpeed(newValue)
    }
  }

  const handleSpeedToggleChange = (e) => {
    const newValue = parseInt(e.target.value)
    if (!isRunning && minSpeed <= newValue && newValue <= maxSpeed) {
      setSpeed(newValue)
    }
  }

  const handleNumBarChange = (e, newValue) => {
    if (!isRunning) {
      setNumBar(newValue)
    }
  }

  const handleNumBarToggleChange = (e) => {
    const newValue = parseInt(e.target.value)
    if (!isRunning && minNumBar <= newValue && newValue <= maxNumBar) {
      setNumBar(newValue)
    }
  }

  const handleAlgorithmChange = (algorithmType) => {
    if (!isRunning) {
      setAlgorithmType(algorithmType)
    }
  }

  const handleReset = () => {
    if (!isRunning) {
      setResetCounter(resetCounter + 1)
      setNumSwap(0)
    }
  }

  const handleIsRunningChange = () => {
    if (!isRunning) {
      setIsRunning(true)
    } else {
      window.location.reload()
    }
  }

  return (
    <Box id="navbar" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>SortingPro</Typography>
          <DesktopView>
            <ButtonGroup variant="contained">
              <Button onClick={() => handleAlgorithmChange(BUBBLE)} sx={{ bgcolor: algorithmType === BUBBLE ? 'red' : 'blue' }}>
                Bubble
              </Button>
              <Button onClick={() => handleAlgorithmChange(INSERTION)} sx={{ bgcolor: algorithmType === INSERTION ? 'red' : 'blue' }}>
                Insertion
              </Button>
              <Button onClick={() => handleAlgorithmChange(SELECTION)} sx={{ bgcolor: algorithmType === SELECTION ? 'red' : 'blue' }}>
                Selection
              </Button>
              <Button onClick={() => handleAlgorithmChange(MERGE)} sx={{ bgcolor: algorithmType === MERGE ? 'red' : 'blue' }}>
                Merge
              </Button>
              <Button onClick={() => handleAlgorithmChange(QUICK)} sx={{ bgcolor: algorithmType === QUICK ? 'red' : 'blue' }}>
                Quick
              </Button>
              <Button onClick={() => handleAlgorithmChange(HEAP)} sx={{ bgcolor: algorithmType === HEAP ? 'red' : 'blue' }}>
                Heap
              </Button>
            </ButtonGroup>
            <Typography>Speed</Typography>
            <CustomSlider value={speed} onChange={handleSpeedChange} min={minSpeed} max={maxSpeed} sx={{ width: '5rem' }} />
            <Input type="number" value={speed} onChange={handleSpeedToggleChange} />
            <Typography>Number of Bars</Typography>
            <CustomSlider value={numBar} onChange={handleNumBarChange} min={minNumBar} max={maxNumBar} sx={{ width: '5rem' }} />
            <Input type="number" value={numBar} onChange={handleNumBarToggleChange} />
          </DesktopView>
          <MobileView>
            <Button variant="contained">Menu</Button>
          </MobileView>
          <Button variant="contained" onClick={handleIsRunningChange} sx={{ bgcolor: isRunning ? 'red' : 'green' }}>
            {isRunning ? 'Cancel' : 'Run'}
          </Button>
          <Button variant="contained" onClick={handleReset}>
            Reset
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
