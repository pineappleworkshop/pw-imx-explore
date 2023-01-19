import "./index.css";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";
import { useEffect } from "react";

export function Race() {
  useEffect(() => {
    console.log("WOOO");
  }, []);

  return (
    <Canvas style={{ height: "50vh" }}>
      <Physics broadphase={"SAP"} gravity={[0, -1.6, 0]}>
        <Scene />
      </Physics>
    </Canvas>
  );
}
