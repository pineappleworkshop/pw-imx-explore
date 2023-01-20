import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {useTrimesh} from "@react-three/cannon";
import {useRef} from "react";

export function Ramp() {
    const result = useLoader(GLTFLoader, "models/ramp.glb")

    const geometry = result.scene.children[0].geometry
    const vertices = geometry.attributes.position.array
    const indices = geometry.index.array


    const [ref] = useTrimesh(() => ({
        args: [vertices, indices],
        mass: 0,
        type: "Static"
    }), useRef(null))
}