import { Button, Stack, Typography, Box } from '@mui/material/'
import { useImutableXContext } from '../Contexts/ImutableXContext'

const WalletInfo = () => {
  const { wallet, balance } = useImutableXContext()
  return (
    <>
      <Typography
        gutterBottom
        variant="body2"
        component="div"
        align="center"
        sx={{
          fontFamily: 'Alegreya Sans SC',
          color: 'cyan',
          fontSize: '1rem',
        }}
      >
        {` Active wallet: ${wallet}`}
      </Typography>
      <Typography
        gutterBottom
        variant="body2"
        component="div"
        align="center"
        sx={{
          fontFamily: 'Alegreya Sans SC',
          color: 'cyan',
          fontSize: '1.25rem',
        }}
      >
        ETH balance (in wei): {balance?.balance?.toString()}
      </Typography>
    </>
  )
}

export default WalletInfo
