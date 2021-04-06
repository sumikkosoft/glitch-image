import React from 'react'
import classes from './VersionOne.module.scss'

export const VersionOne = () => {
  const MAX_COUNT = 20
  const style = [...Array(MAX_COUNT)].map((_, i) => {
    const clipTop = (Math.floor((100 / MAX_COUNT) * 100) / 100) * i
    const clipBottom = (Math.floor((100 / MAX_COUNT) * 100) / 100) * (i + 1)

    const rD = Math.random() * 3
    const rS = Math.random() * 2

    const direction = Math.floor(Math.random() * 10) > 5 ? 'nomal' : 'reverse'
    const left = Math.random() * 5 + 10 * (Math.random() * 10 > 5 ? 1 : -1)

    return {
      '--gi-clip-top': `${clipTop}%`,
      '--gi-clip-bottom': `${clipBottom}%`,
      '--rundum-d': `${rD}s`,
      '--rundum-s': `${rS}s`,
      '--direction': direction,
      '--left': `${left}%`
    } as React.CSSProperties
  })

  return (
    <div className="p-4 border border-black">
      <div className="grid items-center justify-center">
        <div className="relative">
          <img
            src="https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg"
            alt=""
            width="200"
            height="200"
            className="opacity-0"
          />
          {style.map((style, i) => {
            return (
              <img
                src="https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg"
                alt=""
                width="200"
                height="200"
                key={i}
                className={`${classes.base} absolute top-0 left-0`}
                style={style}
              />
            )
          })}
        </div>
      </div>
      <p className="text-center">Pattern A</p>
    </div>
  )
}
