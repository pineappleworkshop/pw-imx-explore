import { useEffect, useState } from 'react'

import { Button, Stack, Typography, Box } from '@mui/material/'
import { useImutableXContext } from '../Contexts/ImutableXContext'
import WalletInfo from './WalletInfo'
import Marketplace from '../Marketplace'
import Inventory from '../Components/Inventory'
import Racetrack from '../Racetrack'
import Chopshop from '../Chopshop'

const HeaderNav = () => {
  const { wallet, balance, client, link, disconnect, linkSetup } =
    useImutableXContext()
  const [tab, setTab] = useState('marketplace')

  function handleTabs() {
    if (client.address) {
      switch (tab) {
        case 'inventory':
          if (wallet === undefined) return <div>Connect wallet</div>
          return <Inventory client={client} link={link} wallet={wallet} />
        case 'racetrack':
          if (wallet === undefined) return <div>Connect wallet</div>
          return <Racetrack client={client} link={link} wallet={wallet} />
        case 'chopshop':
          if (wallet === undefined) return <div>Connect wallet</div>
          return <Chopshop client={client} link={link} wallet={wallet} />
        // case "bridging":
        //   if (wallet === undefined) return <div>Connect wallet</div>;
        //   return <Bridging client={client} link={link} wallet={wallet} />;
        default:
          return <Marketplace client={client} link={link} />
      }
    }
    return null
  }
  console.log({ tab })
  return (
    <Stack direction="column" sx={{ p: 5 }}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Typography
          variant="h1"
          component="div"
          align="center"
          sx={{
            fontFamily: 'Bebas Neue',
            color: 'red',
            fontSize: '36px',
            fontWeight: '700',
            textTransform: 'uppercase',
          }}
        >
          RocketCarGarage
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            marginLeft: 'auto',
            height: '40px',
            fontFamily: 'Alegreya Sans SC',
            fontSize: '1rem',
            color: 'black',
            backgroundColor: 'cyan',
          }}
          onClick={wallet ? disconnect : linkSetup}
        >
          {wallet ? 'Disconnect' : 'Connect'}
        </Button>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ gap: 20, marginTop: '20px' }}
      >
        <Button
          variant="contained"
          size="small"
          sx={{
            fontFamily: 'Alegreya Sans SC',
            fontSize: '1rem',
            color: 'black',
            backgroundColor: 'cyan',
          }}
          onClick={() => setTab('marketplace')}
        >
          Marketplace
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            fontFamily: 'Alegreya Sans SC',
            fontSize: '1rem',
            color: 'black',
            backgroundColor: 'cyan',
          }}
          onClick={() => setTab('inventory')}
        >
          Inventory
        </Button>
        {/* <button onClick={() => setTab("bridging")}>Deposit and withdrawal</button> */}
        <Button
          variant="contained"
          size="small"
          sx={{
            fontFamily: 'Alegreya Sans SC',
            fontSize: '1rem',
            color: 'black',
            backgroundColor: 'cyan',
          }}
          onClick={() => setTab('racetrack')}
        >
          Race Track
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            fontFamily: 'Alegreya Sans SC',
            fontSize: '1rem',
            color: 'black',
            backgroundColor: 'cyan',
          }}
          onClick={() => setTab('chopshop')}
        >
          Chop Shop
        </Button>
      </Stack>
      <WalletInfo />
      {handleTabs()}
    </Stack>
  )
}

export default HeaderNav
