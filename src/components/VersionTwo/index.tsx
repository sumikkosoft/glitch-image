import React from 'react'
import { GlitchImage } from './Glitch'

export const VersionTwo = () => {
  console.log('start')

  return (
    <div className="p-4 border border-black">
      <div className="grid items-center justify-center">
        <GlitchImage src="https://jp.vuejs.org/images/logo.png" alt="vue" />
      </div>
      <p className="text-center">Pattern B</p>
    </div>
  )
}
