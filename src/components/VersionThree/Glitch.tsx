import classnames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import classes from './VersionThree.module.scss'

const INITIAL_WAIT_TIME = 1000
const CLEAR_TIME = 100
const MAX_GLITCH_COUNT = 4
const MAX_GLITCH_SEQUENCE_COUNT = 3
const MAX_GLITCH_FREQUENCY_MS = 2000
const MAX_GLITCH_WIDTH = 5
const OFFSET_GLITCH_WIDTH = 5
const MAX_GLITCH_LEFT = 20

type Image = { src: string; alt: string }
// type State = { hash: number }
interface Style extends React.CSSProperties {
  '--gi-clip-top': string
  '--gi-clip-bottom': string
  '--left'?: string
}

type GlitchSet = {
  glitchWidth: number[]
  glitchTop: number[]
  glitchLeft: number[]
}

const ImageCom: React.VFC<{ glitch: GlitchSet; src: string; glitchCount: number }> = React.memo(
  (props) => {
    const baseStyle = useRef<Style[]>([])
    const glitchStyle = useRef<Style[]>([])

    if (props.glitch.glitchWidth) {
      baseStyle.current = [...Array(props.glitchCount + 1)].map((_, i) => {
        const clipTop =
          i > 0 && i <= props.glitch.glitchTop.length
            ? props.glitch.glitchTop[i - 1] + props.glitch.glitchWidth[i - 1]
            : 0
        const clipBottom = i < props.glitch.glitchTop.length ? props.glitch.glitchTop[i] : 100

        return {
          '--gi-clip-top': `${clipTop}%`,
          '--gi-clip-bottom': `${clipBottom}%`
        }
      })

      glitchStyle.current = [...Array(props.glitchCount)].map((_, i) => {
        const clipTop = props.glitch.glitchTop[i]
        const clipBottom = props.glitch.glitchTop[i] + props.glitch.glitchWidth[i]

        return {
          '--gi-clip-top': `${clipTop}%`,
          '--gi-clip-bottom': `${clipBottom}%`,
          '--left': `${props.glitch.glitchLeft[i]}px`
        }
      })
    }

    return (
      <>
        {baseStyle.current.map((style, i) => (
          <img
            src={props.src}
            className={classnames('base-image', { [classes.base]: true, absolute: i !== 0 })}
            style={style}
            key={i}
          />
        ))}
        {glitchStyle.current.map((style, i) => {
          const hueSeed = Math.random()
          return (
            <img
              src={props.src}
              className={classnames('base-image absolute glitch', {
                [classes.base]: true,
                [classes.glitch]: true,
                [classes.red]: hueSeed < 0.2,
                [classes.blue]: hueSeed > 0.8
              })}
              style={style}
              key={i}
            />
          )
        })}
      </>
    )
  }
)

export const GlitchImage: React.VFC<Image> = (props) => {
  const isEnabled = useRef<boolean>(false)
  const glitchCount = useRef<number>(0)
  const glitchSequenceCount = useRef<number>(0)
  const [glitchItem, setGlitchItem] = useState<GlitchSet>({
    glitchWidth: [],
    glitchLeft: [],
    glitchTop: []
  })

  // const [update, setUpdata] = useState<boolean>(false)
  // const timer = useRef<NodeJS.Timeout | null>(null)

  const clearGlitch = () => {
    const glitchWidth = []
    const glitchTop = []
    const glitchLeft = []

    for (let i = 0; i < glitchCount.current; i++) {
      glitchWidth[i] = 0
      glitchTop[i] = 0
      glitchLeft[i] = 0
    }

    setGlitchItem({
      glitchWidth,
      glitchLeft,
      glitchTop
    })
  }

  const setGlitch = ({
    glitchWidth,
    glitchLeft,
    glitchTop
  }: {
    glitchWidth: number[]
    glitchTop: number[]
    glitchLeft: number[]
  }) => {
    setGlitchItem({
      glitchWidth,
      glitchLeft,
      glitchTop
    })
  }

  const pickRandomFromRange = (min: number, max: number) => {
    return Math.random() * (max - min + 1) + min
  }

  const makeGlitch = () => {
    const glitchWidth: number[] = []
    const glitchTop: number[] = []
    const glitchLeft: number[] = []

    for (let i = 0; i < glitchCount.current; i++) {
      glitchWidth[i] = Math.random() * MAX_GLITCH_WIDTH + OFFSET_GLITCH_WIDTH
      glitchTop[i] = pickRandomFromRange(
        i === 0 ? 0 : glitchTop[i - 1] + glitchWidth[i - 1],
        100 - (MAX_GLITCH_WIDTH + OFFSET_GLITCH_WIDTH)
      )
      Math.random() * (100 - MAX_GLITCH_WIDTH + OFFSET_GLITCH_WIDTH)
      glitchLeft[i] = Math.random() * (2 * MAX_GLITCH_LEFT) - MAX_GLITCH_LEFT
    }

    return { glitchWidth, glitchTop, glitchLeft }
  }

  const startGlitch = () => {
    if (!isEnabled.current) return

    const glitchWaitTime: number[] = []
    glitchCount.current = Math.floor(Math.random() * MAX_GLITCH_COUNT) + 1
    glitchSequenceCount.current = Math.floor(Math.random() * MAX_GLITCH_SEQUENCE_COUNT) + 1

    for (let i = 0; i < glitchSequenceCount.current; i++) {
      const delaySeed = i + 1
      glitchWaitTime[i] = Math.random() * (100 * delaySeed) + 100

      setTimeout(() => {
        setGlitch(makeGlitch())
      }, glitchWaitTime[i])
    }

    const maxWaitTime = Math.max.apply(null, glitchWaitTime)
    const clearTime = maxWaitTime + CLEAR_TIME

    setTimeout(() => {
      clearGlitch()
    }, clearTime)

    setTimeout(() => {
      startGlitch()
    }, Math.random() * MAX_GLITCH_FREQUENCY_MS + clearTime)
  }

  useEffect(() => {
    clearGlitch()
    isEnabled.current = true

    setTimeout(() => {
      startGlitch()
    }, INITIAL_WAIT_TIME)

    return () => {
      isEnabled.current = false
    }
  }, [])

  return (
    <div className="relative w-full">
      <ImageCom glitchCount={glitchCount.current} glitch={glitchItem} src={props.src} />
    </div>
  )
}
