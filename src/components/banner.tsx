import React from 'react'
import CircularText from './circular-text'

type Props = {}

const Banner = (props: Props) => {
  return (
    <div className="banner-wrapper">
      <h1 id="number">1.</h1>
      <img src="/assets/lotti-banner2.jpeg" alt="banner" id="banner" />
      <CircularText/>
    </div>
  )
}

export default Banner