import { Typography, Stack, Box, Button } from '@mui/material/'
import { ERC721TokenType } from '@imtbl/imx-sdk'

const TransferCar = (
  transferTokenId,
  setTransferTokenId,
  recipientAddress,
  setRecipientAddress,
  setInventory,
  link,
  client,
  wallet
) => {
  const car_token_address = process.env.REACT_APP_SPEEDCAR_TOKEN_ADDRESS ?? '' // contract registered by Immutable
  // transfer an asset
  async function transferCar() {
    try {
      // Call the method
      let result = await link.transfer([
        {
          type: ERC721TokenType.ERC721,
          toAddress: recipientAddress,
          tokenId: transferTokenId,
          tokenAddress: car_token_address,
        },
      ])
      // Print the result
      console.log(result)
    } catch (error) {
      // Catch and print out the error
      console.error(error)
    }

    setInventory(
      await client.getAssets({
        user: wallet,
        sell_orders: true,
        collection: car_token_address,
      })
    )
    setRecipientAddress('')
    setTransferTokenId('')
  }

  return (
    <Box>
      <Typography
        sx={{
          fontFamily: 'Alegreya Sans SC',
          fontSize: '1rem',
          color: 'deepskyblue',
        }}
      >
        Transfer Car:
      </Typography>
      <label style={{ fontFamily: 'Alegreya Sans SC', color: 'deepskyblue' }}>
        Car ID:
        <input
          style={{
            borderRadius: 5,
            maxWidth: 100,
            border: '2px solid deepskyblue',
          }}
          type="text"
          value={transferTokenId}
          onChange={(e) => setTransferTokenId(e.target.value)}
        />
      </label>
      <label style={{ color: 'deepskyblue' }}>
        To:
        <input
          style={{
            borderRadius: 5,
            maxWidth: 100,
            border: '2px solid deepskyblue',
          }}
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
        />
      </label>

      <Button
        variant="contained"
        size="small"
        onClick={transferCar}
        style={{
          fontFamily: 'Alegreya Sans SC',
          margin: 2,
          borderRadius: 5,
          color: 'black',
          backgroundColor: 'deepskyblue',
        }}
      >
        Transfer
      </Button>
    </Box>
  )
}

export default TransferCar
