import React, { useEffect, useState } from 'react'
import classes from './VersionTwo.module.scss'

// const MAX_COUNT = 5
// const WAIT_TIME = 1000

export const GlitchImage: React.VFC<{ src: string; alt: string }> = React.memo((props) => {
  const [hash, setHash] = useState<number>(0)
  useEffect(() => {
    setInterval(() => {
      setHash(Math.random())
    }, 100)
  }, [])
  return (
    <div className="relative">
      <div>
        <img
          src={props.src}
          alt={props.alt}
          className={`${hash < 0.2 ? classes.left : classes.right} transition-transform`}
        />
      </div>
    </div>
  )
})
