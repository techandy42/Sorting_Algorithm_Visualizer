import React, { useState, useEffect, useMemo } from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { BUBBLE, INSERTION, SELECTION, MERGE, QUICK, HEAP } from '../../constants/algorithmTypes'

const defaultBarWidth = 720
const defaultBarMarginSide = 120

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

export default function Main({ algorithmType, speed, numBar, numSwap, setNumSwap, resetCounter, isRunning, setIsRunning }) {
  const [barHeight, setBarHeight] = useState(window.innerHeight * 0.8)
  const [barWidth, setBarWidth] = useState(window.innerHeight * 0.6)
  const [barMarginSide, setBarMarginSide] = useState(window.innerHeight * 0.1)
  const [isSorting, setIsSorting] = useState(false)
  const [sleepDuration, setSleepDuration] = useState(510 - speed * 50)

  let bars = []
  bars = useMemo(() => {
    const newBars = []
    for (let i = 0; i < numBar; i++) {
      newBars.push({ height: Math.ceil(Math.random() * barHeight), color: 'skyblue' })
    }
    return newBars
  }, [numBar, resetCounter])

  const bubbleSort = async () => {
    let len = bars.length
    let checked
    do {
      checked = false
      for (let i = 0; i < len - 1; i++) {
        bars[i].color = 'yellow'
        bars[i + 1].color = 'yellow'
        await sleep(sleepDuration * 2)
        if (bars[i].height > bars[i + 1].height) {
          bars[i].color = 'red'
          bars[i + 1].color = 'red'
          await sleep(sleepDuration)
          let temp = bars[i]
          bars[i] = bars[i + 1]
          bars[i + 1] = temp
          await sleep(sleepDuration)
          setNumSwap((prevState, props) => prevState + 1)
          checked = true
        }
        bars[i].color = 'skyblue'
        bars[i + 1].color = 'skyblue'
      }
    } while (checked)
  }

  const insertionSort = async () => {
    let n = bars.length
    for (let i = 1; i < n; i++) {
      await sleep(11 - speed)
      let temp = bars[i]
      let j = i - 1
      while (j > -1 && temp.height < bars[j].height) {
        bars[j + 1] = bars[j]
        j--
        setNumSwap((prevState, props) => prevState + 1)
      }
      bars[j + 1] = temp
    }
  }

  const selectionSort = async () => {
    let n = bars.length

    for (let i = 0; i < n; i++) {
      await sleep(11 - speed)
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
        setNumSwap((prevState, props) => prevState + 1)
      }
    }
    return bars
  }

  const handleSortingCompleted = async () => {
    for (let i = 0; i < bars.length; i++) {
      await sleep(1)
      bars[i].color = 'lightgreen'
    }
  }

  useEffect(() => {
    if (isRunning && !isSorting) {
      setIsSorting(true)
      switch (algorithmType) {
        case BUBBLE:
          bubbleSort()
          break
        case INSERTION:
          insertionSort()
          break
        case SELECTION:
          selectionSort()
          break
        case MERGE:
          break
        case QUICK:
          break
        case HEAP:
          break
      }
      setIsSorting(false)
      setIsRunning(false)
    }
  }, [isRunning])

  window.onresize = () => {
    setBarHeight(window.innerHeight * 0.8)
    setBarWidth(window.innerWidth * 0.6)
    setBarMarginSide(window.innerWidth * 0.1)
  }

  return (
    <div>
      <DesktopView>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', transform: 'rotateX(180deg)', mt: '2rem', height: barHeight }}>
            {bars.map((bar) => (
              <>
                <div
                  style={{
                    height: bar.height,
                    width: defaultBarWidth / numBar,
                    backgroundColor: bar.color,
                    marginLeft: defaultBarMarginSide / numBar,
                    marginRight: defaultBarMarginSide / numBar,
                    textAlign: 'center',
                  }}
                >
                  {numBar < 20 && <p style={{ transform: 'rotateX(180deg)' }}>{bar.height}</p>}
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
                    height: bar.height,
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
    </div>
  )
}
