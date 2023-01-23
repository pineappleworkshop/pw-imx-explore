import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { Track } from './Track'
import { Ground } from './Ground'
import { Car } from './Car'

export function Scene({ vehicleSpecs }) {
  const [thirdPerson, setThirdPerson] = useState(true)
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21])

  useEffect(() => {
    function keydownHandler(e) {
      if (e.key === 'k') {
        if (thirdPerson) setCameraPosition([-6, 3.9, 10])
        setThirdPerson(!thirdPerson)
      }
    }

    window.addEventListener('keydown', keydownHandler)
    return () => window.removeEventListener('keydown', keydownHandler)
  }, [thirdPerson])

  return (
    <Suspense fallback={null}>
      <Environment
        files={process.env.PUBLIC_URL + '/textures/envmap.hdr'}
        background={'both'}
      />
      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}
      <Track />
      <Ground />
      <Car vehicleSpecs={vehicleSpecs} thirdPerson={thirdPerson} />
    </Suspense>
  )
}
