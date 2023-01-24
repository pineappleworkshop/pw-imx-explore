import { useEffect, useRef } from 'react'
import { PositionalAudio } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'



import { useCarDataContext } from '../../Providers/CarContext'

const { lerp } = MathUtils

export const AccelerateAudio = () => {
  const ref = useRef(null)

const {speed, rpmTarget} = useCarDataContext()

const maxSpeed = 100
  const getVolume = () =>  speed / maxSpeed


  useFrame((_, delta) => {
    ref.current?.setVolume(getVolume())
    ref.current?.setPlaybackRate(lerp(ref.current.playbackRate, rpmTarget + 0.5, delta * 10))

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

  return <PositionalAudio ref={ref} url="/sounds/accelerate.mp3" loop distance={5} />
}
