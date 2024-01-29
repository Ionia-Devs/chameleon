'use client'

import { useEffect, useState } from 'react'

export default function TypeWritterEffect() {
  const typingSpeed = 125
  const delayTimePerWord = 2000
  const [displayParty, setDisplayParty] = useState('')
  const [displayPartyArrangement, setDisplayPartyArrangement] = useState([
    'Cosplayer',
    'Photographer',
    'Group Cosplay',
    'Videographer',
    'Friend',
  ])

  useEffect(() => {
    typingEffect()
  }, [displayPartyArrangement])

  async function typingEffect() {
    const selectedParty = displayPartyArrangement[0]

    for (let i = 0; i < selectedParty.length; i++) {
      const portion = selectedParty.substring(0, i + 1)
      await new Promise((resolve) => {
        setTimeout(() => {
          setDisplayParty(portion)
          resolve()
        }, typingSpeed)
      })
    }

    await new Promise((resolve) => {
      setTimeout(resolve, delayTimePerWord)
    })

    for (let i = selectedParty.length; i >= 0; i--) {
      const portion = selectedParty.substring(0, i)
      await new Promise((resolve) => {
        setTimeout(() => {
          setDisplayParty(portion)
          resolve()
        }, typingSpeed)
      })
    }

    setDisplayPartyArrangement((prevArrangement) => {
      return [...prevArrangement.slice(1), prevArrangement[0]]
    })
  }

  return (
    <div>
      <h2>{displayParty}</h2>
    </div>
  )
}
