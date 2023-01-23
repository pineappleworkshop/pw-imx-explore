import { Typography, Stack } from '@mui/material/'

const InventoryStats = (inventory, monsterTruckInventory, tireInventory) => {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: 'space-between', padding: '40px 0px' }}
    >
      <Typography
        sx={{
          fontFamily: 'Alegreya Sans SC',
          fontSize: '2rem',
          color: 'orangered',
        }}
      >
        Your Garage:
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Alegreya Sans SC',
          fontSize: '2rem',
          color: 'orangered',
        }}
      >
        Cars Owned: {inventory?.result?.length}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Alegreya Sans SC',
          fontSize: '2rem',
          color: 'orangered',
        }}
      >
        Trucks Owned: {monsterTruckInventory?.result?.length}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Alegreya Sans SC',
          fontSize: '2rem',
          color: 'orangered',
        }}
      >
        Tires Owned: {tireInventory?.result?.length}
      </Typography>
    </Stack>
  )
}

export default InventoryStats
