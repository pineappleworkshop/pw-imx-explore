 import {useBox} from "@react-three/cannon";
import { useCallback } from "react";
const debug = false

export function ColliderBox({position, scale}) {
    useBox(() => ({
        args: scale,
        position,
        type: "Static"
    }))
    const onCollide = useCallback((e) => {console.log("hittt", e)}, [])

    useBox(() => ({
        args: scale,
        position,
        type: "Static",
        onCollide

    }))


    return (
        debug && (
            <mesh position={position}>
                <boxGeometry args={scale} />
                <meshBasicMaterial transparent={true} opacity={.25} />
            </mesh>
        )
    )
}