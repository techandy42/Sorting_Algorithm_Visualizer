import React, { useState } from 'react'
import { BUBBLE, INSERTION, MERGE, QUICK, HEAP, SELECTION } from '../../constants/algorithmTypes'
import { Slider, Box, AppBar, Toolbar, Typography, ButtonGroup, Button, Input, CssBaseline } from '@mui/material'
import { styled } from '@mui/material/styles'
import { deepOrange, lightGreen, blue } from '@mui/material/colors'

const RED = deepOrange[600]
const GREEN = lightGreen[600]
const BLUE = blue[600]

const DesktopView = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const MobileView = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('md')]: {
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
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 300 }}>
            SORTING_PRO
          </Typography>
          <DesktopView>
            <ButtonGroup variant="contained" sx={{ mx: 2 }}>
              <Button onClick={() => handleAlgorithmChange(BUBBLE)} sx={{ bgcolor: algorithmType === BUBBLE ? RED : BLUE }}>
                Bubble
              </Button>
              <Button onClick={() => handleAlgorithmChange(INSERTION)} sx={{ bgcolor: algorithmType === INSERTION ? RED : BLUE }}>
                Insertion
              </Button>
              <Button onClick={() => handleAlgorithmChange(SELECTION)} sx={{ bgcolor: algorithmType === SELECTION ? RED : BLUE }}>
                Selection
              </Button>
            </ButtonGroup>
            <Typography sx={{ pt: 1, mx: 2 }}>Speed</Typography>
            <CustomSlider value={speed} onChange={handleSpeedChange} min={minSpeed} max={maxSpeed} sx={{ width: '5rem' }} />
            <Input sx={{ width: 80, mx: 2 }} type="number" value={speed} onChange={handleSpeedToggleChange} />
            <Typography sx={{ pt: 1, mx: 2 }}>Number of Bars</Typography>
            <CustomSlider value={numBar} onChange={handleNumBarChange} min={minNumBar} max={maxNumBar} sx={{ width: '5rem' }} />
            <Input sx={{ width: 80, mx: 2 }} type="number" value={numBar} onChange={handleNumBarToggleChange} />
          </DesktopView>
          <MobileView></MobileView>
          <Button sx={{ ml: 2 }} variant="contained" onClick={handleIsRunningChange} sx={{ bgcolor: isRunning ? RED : GREEN }}>
            {isRunning ? 'Cancel' : 'Run'}
          </Button>
          <Button sx={{ ml: 2 }} variant="contained" onClick={handleReset}>
            Reset
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
