import "./index.css";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useCardDataContext } from "../Providers/CarContext";

export function Race({carSelected}) {
  const {speed} = useCardDataContext()
  useEffect(() => {
    console.log("WOOO");
  }, []);


  return (
    <Box sx={{marginBottom: "2rem"}} >
    <Canvas style={{ height: "80vh", borderRadius: "6px" }}>
      <Physics broadphase={"SAP"} friction={1e-3} gravity={[0, -1.6, 0]}>
        <Scene vehicleSpecs={carSelected?.metadata} />
      </Physics>
    </Canvas>
    <Box sx={{position: 'relative', top: '-64px', fontSize: '32px', color: "white", left: "24px"}}>
      {speed} MPH
    </Box>
</Box>)
}
