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
    <Box component="div">
      <Typography
        sx={{
          fontFamily: 'Alegreya Sans SC',
          fontSize: '1rem',
          color: 'peachpuff',
        }}
      >
        List Car For Sale:
      </Typography>
      <label style={{ fontFamily: 'Alegreya Sans SC', color: 'peachpuff' }}>
        Car ID:
        <input
          style={{
            borderRadius: 5,
            maxWidth: 100,
            border: '2px solid peachpuff',
          }}
          type="text"
          value={sellTokenId}
          onChange={(e) => setSellTokenId(e.target.value)}
        />
      </label>
      <label style={{ color: 'peachpuff' }}>
        Price (ETH):
        <input
          style={{
            borderRadius: 5,
            maxWidth: 100,
            border: '2px solid peachpuff',
          }}
          type="text"
          value={sellAmount}
          onChange={(e) => setSellAmount(e.target.value)}
        />
      </label>

      <Button
        variant="contained"
        size="small"
        onClick={sellCar}
        style={{
          fontFamily: 'Alegreya Sans SC',
          margin: 2,
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
