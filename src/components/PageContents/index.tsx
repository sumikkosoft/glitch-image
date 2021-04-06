import React from 'react'
import { VersionOne } from '../VersionOne'
import { VersionThree } from '../VersionThree'
import { VersionTwo } from '../VersionTwo'

export const PageContents = () => {
  return (
    <div className="grid grid-cols-fill gap-4 mt-16 mx-8">
      <VersionOne />
      <VersionTwo />
      <VersionThree />
    </div>
  )
}
