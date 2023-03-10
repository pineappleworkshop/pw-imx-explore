import { useFrame, useLoader } from '@react-three/fiber'
import debounce from 'lodash-es/debounce'
import clamp from 'lodash-es/clamp'
import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useBox, useRaycastVehicle } from '@react-three/cannon'
import { useWheels } from './useWheels'
import { WheelDebug } from './WheelDebug'
import { useControls } from './useControls'
import { Quaternion, Vector3 } from 'three'
import { useCarDataContext } from '../Providers/CarContext'
import { PositionalAudio } from '@react-three/drei'
import { AccelerateAudio } from './effects/Accelerate'
import { EngineAudio } from './effects/Engine'


export function Car({ thirdPerson, vehicleSpecs, position = [-1.5, 0.5, 3] }) {
  // thanks to the_86_guy!
  // https://sketchfab.com/3d-models/low-poly-car-muscle-car-2-ac23acdb0bd54ab38ea72008f3312861

const {speed, setSpeed, setRpmTarget }  = useCarDataContext()
const engineAudio = useRef(null)
const crashAudio = useRef(null)
const accelerateAudio = useRef(null)


  function generateVehicleName(name) {
    if (name === 'Green Lambo') {
      return 'lamborghini'
    } else if (name === 'Red Lambo') {
      return 'ferrari'
    } else {
      return 'porschecarrera'
    }
  }

  const vehicleName = generateVehicleName(vehicleSpecs.name)
  let mesh = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + `/models/${vehicleName}.glb`
  ).scene

  const carOptions = {
    ferrari: {
      scale: 0.02,
      depth: -2.75,
      positionX: 0,
      positionY: 0,
    },
    porschecarrera: {
      scale: 0.06,
      depth: 0,
      positionX: 0,
      positionY: 0,
    },
    lamborghini: {
      scale: 0.06,
      depth: -1.25,
      positionX: 0,
      positionY: 0,
    },
  }

  const scale = carOptions[vehicleName].scale
  const depth = carOptions[vehicleName].depth
  const positionX = carOptions[vehicleName].positionX
  const positionY = carOptions[vehicleName].positionY

  // const position =
  const width = 0.15
  const height = 0.07
  const front = 0.15
  const wheelRadius = 0.1

  const chassisBodyArgs = [width, height, front * 2]

  const onCollide = useCallback((e) => {


    //   if (e.body.userData.trigger || !getState().sound || !crashAudio.current) return
      crashAudio.current.setVolume(clamp(e.contact.impactVelocity, 0.1, 1))
      if (!crashAudio.current.isPlaying) crashAudio.current.play()
    }, [])


  const [chassisBody, chassisApi] = useBox(
    () => ({
      args: chassisBodyArgs,
      mass: 150,
      position,
      onCollide
    }),
    useRef(null)
  )

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius)

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null)
  )

  useControls(vehicleApi, chassisApi, vehicleSpecs)

  useFrame((state) => {
    if (!thirdPerson) return

    let position = new Vector3(0, 0, 0)
    position.setFromMatrixPosition(chassisBody.current.matrixWorld)

    let quaterion = new Quaternion(0, 0, 0, 0)
    quaterion.setFromRotationMatrix(chassisBody.current.matrixWorld)

    let wDir = new Vector3(0, 0, -1)
    wDir.applyQuaternion(quaterion)
    wDir.normalize()

    let cameraPosition = position
      .clone()
      .add(wDir.clone().multiplyScalar(-1).add(new Vector3(0, 0.3, 0)))

    state.camera.position.copy(cameraPosition)
    state.camera.lookAt(position)
  })

  useEffect(() => {
    mesh.scale.set(scale, scale, scale)
    mesh.children[0].position.set(positionX, depth, positionY)
  }, [mesh])

  const v = new Vector3()

//   const ToggledAccelerateAudio = useToggle(AccelerateAudio, ['ready', 'sound'])


    useLayoutEffect(
      () => {
        chassisApi.velocity.subscribe((velocity) => {
            const speed = v.set(...velocity).length()

            const rounded = Math.round(speed * 25)
            const maxSpeed = 100
            const gears = 5
            const gearPosition = speed / gears * 100
            const rpmTarget = Math.max(((gearPosition % 1) + Math.log(gearPosition)) / 6, 0)
            setRpmTarget(rpmTarget)
            setSpeed(rounded)
          })
      },
      [chassisApi]
    )

  return (
    <>
    <group ref={vehicle} name="vehicle">
      <group ref={chassisBody} name="chassisBody">
        <primitive
          object={mesh}
          rotation-y={Math.PI}
          position={[0, -0.09, 0]}
        />
      </group>
      {/*<mesh ref={chassisBody}>*/}
      {/*    <meshBasicMaterial transparent={true} opacity={0.3} />*/}
      {/*    <boxGeometry args={chassisBodyArgs} />*/}
      {/*</mesh>*/}
      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
    <PositionalAudio
        ref={crashAudio} 
        url="/sounds/crash.mp3" loop={false} distance={5} />
    <AccelerateAudio/>
    <EngineAudio/>
        </>
  )
}
