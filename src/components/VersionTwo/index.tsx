import React, { useEffect, useState } from 'react'
// import classes from './VersionTwo.module.scss'

const COUNT = 4
const WAIT_TIME = 1000

const GlitchImage = () => {
  console.log('start!!')
  let load: boolean = false
  const [num, setum] = useState<number>(0)

  const clearGlitch = () => {
    setum(0)
  }

  const setGlitch = (num: number) => {
    setum(num)
  }

  const startGlitch = () => {
    if (!load) return

    const timer: number[] = []

    for (let i = 0; i < COUNT; i++) {
      const delaySeed = i + 1
      timer[i] = Math.random() * (100 * delaySeed) + 100

      setTimeout(() => {
        setGlitch(timer[i])
      }, timer[i])
    }

    const maxWaitTime = Math.max.apply(null, timer)
    const clearTime = maxWaitTime + 1000

    setTimeout(() => {
      clearGlitch()
    }, clearTime)

    setTimeout(() => {
      startGlitch()
    }, clearTime + maxWaitTime * Math.random() + 1000)
  }
  useEffect(() => {
    if (!load) return
    startGlitch()
  }, [load])

  useEffect(() => {
    load = true
    clearGlitch()
    setTimeout(() => {
      startGlitch()
    }, WAIT_TIME)

    return () => {
      load = false
    }
  }, [])

  const base = {
    fontSize: `${num}%`
  } as React.CSSProperties

  return (
    <div className="relative w-full">
      <p className="opacity-0">Hello World</p>

      <p
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap transition-all"
        style={base}
      >
        Hello World!
      </p>
    </div>
  )
}

export const VersionTwo = () => {
  console.log('start')

  return (
    <div className="p-4 border border-black">
      <div className="grid items-center justify-center">
        <GlitchImage />
      </div>
      <p className="text-center">Pattern B</p>
    </div>
  )
}
