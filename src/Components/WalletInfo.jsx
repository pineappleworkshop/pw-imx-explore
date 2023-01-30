import { Button, Stack, Typography, Box } from '@mui/material/'
import { useImutableXContext } from '../Contexts/ImutableXContext'
import { shortenAddress } from '../util/function'

const WalletInfo = () => {
  const { wallet, balance } = useImutableXContext()
  return (
    <Stack direction="row" alignItems="center" gap="16px">
      <Stack
        direction="row"
        alignItems="center"
        sx={{ border: '1.5px solid red', borderRadius: '6px', height: '43px' }}
      >
        <Typography
          component="div"
          align="center"
          sx={{
            fontFamily: 'inter',
            color: 'white',
            fontSize: '14px',
            marginX: '16px',
          }}
        >
          {balance?.balance?.toString() / 1e18}
        </Typography>
        <Box sx={{ padding: '10px 16px', backgroundColor: 'red' }}>
          <Typography
            component="div"
            align="center"
            sx={{
              fontFamily: 'inter',
              color: 'white',
              fontSize: '14px',
            }}
          >
            ETH
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ border: '1.5px solid white', borderRadius: '6px' }}
      >
        <Typography
          component="div"
          align="center"
          sx={{
            fontFamily: 'inter',
            color: 'white',
            fontSize: '14px',
            marginX: '16px',
          }}
        >
          {shortenAddress(wallet, 4)}
        </Typography>

        <img src="/image/avatar.svg" alt="avatart" />
      </Stack>
    </Stack>
  )
}

export default WalletInfo
