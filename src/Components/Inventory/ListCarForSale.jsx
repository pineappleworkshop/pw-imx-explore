import { Typography, Stack, Box, Button } from '@mui/material/'

const ListCarForSale = ({
  sellTokenId,
  setSellTokenId,
  sellAmount,
  setSellAmount,
  link,
  setInventory,
  client,
  wallet,
}) => {
  const car_token_address = process.env.REACT_APP_SPEEDCAR_TOKEN_ADDRESS ?? '' // contract registered by Immutable

  async function sellCar() {
    await link.sell({
      amount: sellAmount,
      tokenId: sellTokenId,
      tokenAddress: car_token_address,
    })
    setInventory(
      await client.getAssets({
        user: wallet,
        sell_orders: true,
        collection: car_token_address,
      })
    )
    setSellAmount('')
    setSellTokenId('')
  }

  return (
    <Box
      component="div"
      sx={{ display: 'flex', flexDirection: 'column', width: '40%' }}
    >
      <Typography
        sx={{
          fontFamily: 'Alegreya Sans SC',
          fontSize: '1rem',
          color: 'peachpuff',
        }}
      >
        List Car For Sale:
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontFamily: 'Alegreya Sans SC', color: 'peachpuff' }}>
          Car ID:
        </label>
        <input
          style={{
            borderRadius: 5,

            border: '2px solid peachpuff',
          }}
          type="text"
          value={sellTokenId}
          onChange={(e) => setSellTokenId(e.target.value)}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
        <label style={{ color: 'peachpuff' }}>Price (ETH):</label>
        <input
          style={{
            borderRadius: 5,

            border: '2px solid peachpuff',
          }}
          type="text"
          value={sellAmount}
          onChange={(e) => setSellAmount(e.target.value)}
        />
      </Box>

      <Button
        variant="contained"
        size="small"
        onClick={sellCar}
        style={{
          fontFamily: 'Alegreya Sans SC',
          marginTop: '20px',
          borderRadius: 5,
          color: 'black',
          backgroundColor: 'peachpuff',
        }}
      >
        List
      </Button>
    </Box>
  )
}
export default ListCarForSale
