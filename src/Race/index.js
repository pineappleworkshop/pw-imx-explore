import "./index.css";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";
import { useEffect } from "react";
import { Box } from "@mui/material";

export function Race({carSelected}) {
  useEffect(() => {
    console.log("WOOO");
  }, []);


  return (
    <Box sx={{marginBottom: "2rem"}} >
    <Canvas style={{ height: "80vh", borderRadius: "6px" }}>
      <Physics broadphase={"SAP"} gravity={[0, -1.6, 0]}>
        <Scene vehicleSpecs={carSelected?.metadata} />
      </Physics>
    </Canvas>
</Box>)
}
