import { useEffect, useState } from 'react'

import { Button, Stack, Typography, Box } from '@mui/material/'
import { useImutableXContext } from '../Contexts/ImutableXContext'
import WalletInfo from './WalletInfo'
import Marketplace from '../Marketplace'
import Inventory from '../Components/Inventory'
import Racetrack from '../Racetrack'
import Chopshop from '../Chopshop'

const HeaderNav = () => {
  const { wallet, client, link, disconnect, linkSetup } = useImutableXContext()
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

  return (
    <Stack direction="column" sx={{ p: 5 }}>
      <Typography
        variant="h1"
        component="div"
        align="center"
        sx={{
          fontFamily: 'Bebas Neue',
          color: 'white',
          fontSize: '36px',
          fontWeight: '700',
        }}
      >
        RocketCarGarage
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ gap: 20 }}
      >
        <Button
          sx={{
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: '500',
            color: 'white',
          }}
          onClick={() => setTab('marketplace')}
        >
          Marketplace
        </Button>
        <Button
          sx={{
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: '500',
            color: 'white',
          }}
          onClick={() => setTab('inventory')}
        >
          Inventory
        </Button>
        {/* <button onClick={() => setTab("bridging")}>Deposit and withdrawal</button> */}
        <Button
          sx={{
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: '500',
            color: 'white',
          }}
          onClick={() => setTab('racetrack')}
        >
          Race Track
        </Button>
        <Button
          sx={{
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: '500',
            color: 'white',
          }}
          onClick={() => setTab('chopshop')}
        >
          Chop Shop
        </Button>
      </Stack>
      <WalletInfo />

      <Button
        sx={{
          marginLeft: 'auto',
          height: '40px',
          fontFamily: 'Inter',
          fontSize: '16px',
          fontWeight: '500',
          color: 'white',
        }}
        onClick={wallet ? disconnect : linkSetup}
      >
        {wallet ? 'Disconnect' : 'Connect'}
      </Button>
      {handleTabs()}
    </Stack>
  )
}

export default HeaderNav
