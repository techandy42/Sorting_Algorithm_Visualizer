import React, { useState, useEffect, useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { BUBBLE, INSERTION, SELECTION, MERGE, QUICK, HEAP } from '../../constants/algorithmTypes'
import { cyan, yellow, deepOrange, lightGreen, blue } from '@mui/material/colors'

const defaultBarWidth = 720
const defaultBarMarginSide = 120

const SKYBLUE = cyan['A400']
const YELLOW = yellow['A400']
const RED = deepOrange['A400']
const GREEN = lightGreen['A400']
const BLUE = blue['A400']

const DesktopView = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}))

const MobileView = styled('div')(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}))

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function handleSleepDuration(speed) {
  switch (speed) {
    case 10:
      return 1
    case 9:
      return 5
    case 8:
      return 10
    case 7:
      return 15
    case 6:
      return 25
    case 5:
      return 50
    case 4:
      return 75
    case 3:
      return 100
    case 2:
      return 125
    case 1:
      return 150
    default:
      return 100
  }
}

function isBarsSorted(bars) {
  for (let i = 0; i < bars.length - 1; i++) {
    if (bars[i].height > bars[i + 1].height) {
      return false
    }
  }
  return true
}

export default function Main({
  algorithmType,
  speed,
  numBar,
  numSwap,
  setNumSwap,
  resetCounter,
  setResetCounter,
  isRunning,
  setIsRunning,
}) {
  const [barHeight, setBarHeight] = useState(window.innerHeight * 0.8)
  const [barWidth, setBarWidth] = useState(window.innerHeight * 0.6)
  const [barMarginSide, setBarMarginSide] = useState(window.innerHeight * 0.1)
  const [isSorting, setIsSorting] = useState(false)

  let sleepDuration = 100
  sleepDuration = useMemo(() => {
    return handleSleepDuration(speed)
  }, [speed])

  let bars = []
  bars = useMemo(() => {
    let newBars = []
    for (let i = 0; i < numBar; i++) {
      newBars.push({ height: Math.floor(Math.random() * 90 + 10), color: SKYBLUE })
    }
    if (isBarsSorted(bars)) {
      newBars = newBars.reverse()
    }
    return newBars
  }, [numBar, resetCounter])

  if (!isRunning) {
    if (isBarsSorted(bars)) {
      for (let i = 0; i < bars.length; i++) {
        bars[i].color = GREEN
      }
    }
  }

  const bubbleSort = async (bars) => {
    let len = bars.length
    let checked
    let loopCounter = 0
    do {
      checked = false
      for (let i = 0; i < len - 1 - loopCounter; i++) {
        if (bars[i].height > bars[i + 1].height) {
          await sleep(sleepDuration)
          let temp = bars[i]
          bars[i] = bars[i + 1]
          bars[i + 1] = temp
          setNumSwap((prevState, props) => prevState + 1)
          checked = true
        }
      }
      loopCounter += 1
    } while (checked)
    setIsSorting(false)
    setIsRunning(false)
  }

  const insertionSort = async (bars) => {
    let len = bars.length
    for (let i = 1; i < len; i++) {
      let temp = bars[i]
      let j = i - 1
      while (j > -1 && temp.height < bars[j].height) {
        bars[j + 1] = bars[j]
        await sleep(sleepDuration)
        setNumSwap((prevState, props) => prevState + 1)
        j--
      }
      bars[j + 1] = temp
    }
    setIsSorting(false)
    setIsRunning(false)
  }

  const selectionSort = async (bars) => {
    let n = bars.length
    for (let i = 0; i < n; i++) {
      let min = i
      for (let j = i + 1; j < n; j++) {
        if (bars[j].height < bars[min].height) {
          min = j
        }
      }
      if (min != i) {
        let temp = bars[i]
        bars[i] = bars[min]
        bars[min] = temp
        await sleep(sleepDuration)
        setNumSwap((prevState, props) => prevState + 1)
      }
    }
    setIsSorting(false)
    setIsRunning(false)
  }

  useEffect(() => {
    if (isRunning && !isSorting) {
      setIsSorting(true)
      switch (algorithmType) {
        case BUBBLE:
          bubbleSort(bars)
          break
        case INSERTION:
          insertionSort(bars)
          break
        case SELECTION:
          selectionSort(bars)
          break
        default:
          bubbleSort(bars)
      }
    }
  }, [isRunning])

  window.onresize = () => {
    setBarHeight(window.innerHeight * 0.8)
    setBarWidth(window.innerWidth * 0.6)
    setBarMarginSide(window.innerWidth * 0.1)
  }

  return (
    <Box sx={{ m: 0 }}>
      <DesktopView>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', transform: 'rotateX(180deg)', mt: '2rem', height: barHeight }}>
            {bars.map((bar) => (
              <>
                <div
                  style={{
                    height: bar.height * (barHeight / 100),
                    width: defaultBarWidth / numBar,
                    backgroundColor: bar.color,
                    marginLeft: defaultBarMarginSide / numBar,
                    marginRight: defaultBarMarginSide / numBar,
                    textAlign: 'center',
                  }}
                >
                  {numBar < 20 && <Typography style={{ transform: 'rotateX(180deg)' }}>{bar.height}</Typography>}
                </div>
              </>
            ))}
          </Box>
        </Box>
      </DesktopView>
      <MobileView>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', transform: 'rotateX(180deg)', mt: '2rem', height: barHeight }}>
            {bars.map((bar) => (
              <>
                <div
                  style={{
                    height: bar.height * (barHeight / 100),
                    width: barWidth / numBar,
                    backgroundColor: bar.color,
                    marginLeft: barMarginSide / numBar,
                    marginRight: barMarginSide / numBar,
                  }}
                />
              </>
            ))}
          </Box>
        </Box>
      </MobileView>
    </Box>
  )
}
