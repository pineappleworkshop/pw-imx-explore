import { useEffect, useRef } from 'react'
import { PositionalAudio } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'

import { useCarDataContext } from '../../Providers/CarContext'


const { lerp } = MathUtils

export const EngineAudio = () => {
  const ref = useRef(null)
  const maxSpeed = 100

  const {speed, rpmTarget} = useCarDataContext()

  const getVolume = () => 1 - speed / maxSpeed

  useFrame((_, delta) => {
    ref.current?.setVolume(getVolume())
    ref.current?.setPlaybackRate(lerp(ref.current.playbackRate, rpmTarget + 1, delta * 10))
  })

  useEffect(() => {
    if (ref.current && !ref.current.isPlaying) {
      ref.current.setVolume(getVolume())
      ref.current.play()
    }
    return () => {
      if (ref.current && ref.current.isPlaying) ref.current.stop()
    }
  }, [])

  return <PositionalAudio autoplay ref={ref} url="/sounds/engine.mp3" loop distance={5} />
}
