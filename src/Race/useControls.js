import {useEffect, useState} from "react";

export const useControls = (vehicleApi,  chassisApi, vehicleSpecs) => {
    let [controls, setControls] = useState({

    })
    const handling = vehicleSpecs.handling 
    const speed = vehicleSpecs.speed

    const normalizeHandling = (handling / 1000) + .7

    const backUpSpeed = `-${speed / 2}`

    useEffect(() => {
        const keyDownPressHandler = (e) => {
            setControls((controls) => ({
                ...controls,
                    [e.key.toLowerCase()]: true
            }))
        }
        const keyUpPressHandler = (e) => {
            setControls((controls) => ({
                ...controls,
                [e.key.toLowerCase()]: false
            }))
        }

        window.addEventListener("keydown", keyDownPressHandler)
        window.addEventListener("keyup", keyUpPressHandler)
        return () => {
            window.removeEventListener("keydown", keyDownPressHandler)
            window.removeEventListener("keyup", keyUpPressHandler)
        }
    }, [])

    useEffect(() => {
        if(controls.w) {
            vehicleApi.applyEngineForce(speed, 2)
            vehicleApi.applyEngineForce(speed, 3)
        } else if (controls.s) {
    
            vehicleApi.applyEngineForce(backUpSpeed, 2)
            vehicleApi.applyEngineForce(backUpSpeed, 3)
        } else {
            vehicleApi.applyEngineForce(0, 2)
            vehicleApi.applyEngineForce(0, 3)
        }

        if(controls.a){
            vehicleApi.setSteeringValue(normalizeHandling, 2)
            vehicleApi.setSteeringValue(normalizeHandling, 3)
            vehicleApi.setSteeringValue(-0.1, 0)
            vehicleApi.setSteeringValue(-0.1, 1)
        } else if(controls.d){
            vehicleApi.setSteeringValue(`-${normalizeHandling}`, 2)
            vehicleApi.setSteeringValue(`-${normalizeHandling}`, 3)
            vehicleApi.setSteeringValue(0.1, 0)
            vehicleApi.setSteeringValue(0.1, 1)
        } else {
            for (let i = 0; i < 4; i++) {
                vehicleApi.setSteeringValue(0, i)
            }
        }

        if(controls.arrowdown) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1])
        if(controls.arrowup) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1])
        if(controls.arrowleft) chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0])
        if(controls.arrowright) chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0])

        if(controls.r) {
            chassisApi.position.set(-1.5, 0.5, 3)
            chassisApi.velocity.set(0,0,0)
            chassisApi.angularVelocity.set(0,0,0)
            chassisApi.rotation.set(0,0,0)
        }

    }, [controls, vehicleApi, chassisApi])


    return controls
}