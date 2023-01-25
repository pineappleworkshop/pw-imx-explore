import { Box } from "@mui/material"
import { useCarDataContext } from "../Providers/CarContext"

const Speed = () => {
   const {speed} = useCarDataContext()
return (
    <Box sx={{position: 'relative', top: '-64px', fontSize: '32px', color: "white", left: "24px"}}>
    {speed} MPH
  </Box>
)
}

export default Speed