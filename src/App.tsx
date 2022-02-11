import React from 'react'

import ProgressCircle from './ProgressCircle'

function App() {
  const [progress, setProgress] = React.useState(0)
  const [progressTwo, setProgressTwo] = React.useState(30)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      )
    }, 2000)
    const timerTwo = setInterval(() => {
      setProgressTwo((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      )
    }, 1700)

    return () => {
      clearInterval(timer)
      clearInterval(timerTwo)
    }
  }, [])

  return (
    // Some usecase
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      }}
    >
      <ProgressCircle
        size={200}
        progress={progress}
        secondaryColor={'#003a00'}
        strokeColor={'green'}
      >
        {(progress) => (
          <div
            style={{
              fontSize: 25,
            }}
          >
            <p style={{ color: 'green' }}>{progress}% actif</p>
            <p style={{ color: '#003a00' }}>{100 - progress}% inactif</p>
          </div>
        )}
      </ProgressCircle>
      <ProgressCircle
        size={200}
        progress={progressTwo}
        secondaryColor={'#400202'}
        strokeColor={'red'}
      >
        <p style={{ margin: 10, color: '#400202' }}>
          Your custom component{' '}
          <span
            style={{
              color: 'red',
            }}
          >
            here !
          </span>
        </p>
      </ProgressCircle>
      <ProgressCircle size={200} progress={progressTwo} strokeColor={'grey'}>
        <p>Without background</p>
      </ProgressCircle>
    </div>
  )
}

export default App
