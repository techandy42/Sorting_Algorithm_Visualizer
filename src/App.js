import { useState } from 'react'
import { BUBBLE } from './constants/algorithmTypes'
import Main from './components/Main/Main'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import CssBaseline from '@mui/material/CssBaseline'
import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

const defaultSpeed = 5
const defaultNumBar = 50

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

function App() {
  const [algorithmType, setAlgorithmType] = useState(BUBBLE)
  const [speed, setSpeed] = useState(defaultSpeed)
  const [numBar, setNumBar] = useState(defaultNumBar)
  const [numSwap, setNumSwap] = useState(0)
  const [resetCounter, setResetCounter] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  return (
    <div>
      <CssBaseline />
      <Navbar
        algorithmType={algorithmType}
        setAlgorithmType={setAlgorithmType}
        speed={speed}
        setSpeed={setSpeed}
        numBar={numBar}
        setNumBar={setNumBar}
        resetCounter={resetCounter}
        setResetCounter={setResetCounter}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        setNumSwap={setNumSwap}
      />
      <DesktopView>
        <Grid container>
          <Grid item md={9}>
            <Main
              algorithmType={algorithmType}
              speed={speed}
              numBar={numBar}
              numSwap={numSwap}
              setNumSwap={setNumSwap}
              resetCounter={resetCounter}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
            />
          </Grid>
          <Grid item md={3}>
            <Sidebar algorithmType={algorithmType} numSwap={numSwap} />
          </Grid>
        </Grid>
      </DesktopView>
      <MobileView>
        <Grid container>
          <Grid item xs={12}>
            <Main
              algorithmType={algorithmType}
              speed={speed}
              numBar={numBar}
              numSwap={numSwap}
              setNumSwap={setNumSwap}
              resetCounter={resetCounter}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
            />
          </Grid>
        </Grid>
      </MobileView>
    </div>
  )
}

export default App
