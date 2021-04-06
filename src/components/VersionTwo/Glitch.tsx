import classnames from 'classnames'
import React, { useEffect, useState } from 'react'
import classes from './VersionTwo.module.scss'

// const MAX_COUNT = 5
// const WAIT_TIME = 1000

type Image = { src: string; alt: string }
// type State = { hash: number }

export const GlitchImage: React.VFC<Image> = (props) => {
  const [hash, setHash] = useState<number>(Math.random())
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
          className={classnames({
            [classes.red]: hash < 0.2,
            [classes.blue]: hash > 0.8
          })}
        />
      </div>
    </div>
  )
}
