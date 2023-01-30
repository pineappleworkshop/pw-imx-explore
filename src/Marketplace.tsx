import {
  Link,
  ImmutableXClient,
  ImmutableMethodResults,
  ImmutableOrderStatus,
} from '@imtbl/imx-sdk'
import { useEffect, useState } from 'react'
import { Box, Tab } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import { useImutableXContext } from './Contexts/ImutableXContext'
import NftList from './Components/NftList'
require('dotenv').config()

const Marketplace = () => {
  const { client, link } = useImutableXContext()
  const [value, setValue] = useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const [marketplace, setMarketplace] =
    useState<ImmutableMethodResults.ImmutableGetOrdersResult>(Object)
  const [truckMarketplace, setTruckMarketplace] =
    useState<ImmutableMethodResults.ImmutableGetOrdersResult>(Object)
  const [tireMarketplace, setTireMarketplace] =
    useState<ImmutableMethodResults.ImmutableGetOrdersResult>(Object)
  const [buyOrderId, setBuyOrderId] = useState('')

  useEffect(() => {
    load()
  }, [])

  async function load(): Promise<void> {
    setMarketplace(
      await client?.getOrders({
        status: ImmutableOrderStatus.active,
        sell_token_address: process.env.REACT_APP_SPEEDCAR_TOKEN_ADDRESS,
      })
    )
    setTruckMarketplace(
      await client?.getOrders({
        status: ImmutableOrderStatus.active,
        sell_token_address: process.env.REACT_APP_MONSTERTRUCK_TOKEN_ADDRESS,
      })
    )
    setTireMarketplace(
      await client?.getOrders({
        status: ImmutableOrderStatus.active,
        sell_token_address: process.env.REACT_APP_TRUCKTIRE_TOKEN_ADDRESS,
      })
    )
  }

  async function buyHandler(orderId: number) {
    console.log('orderId', orderId)
    await link.buy({
      orderIds: [orderId.toString()],
    })
  }

  return (
    <Box component="div" sx={{ width: '100%', marginTop: '107px' }}>
      <TabContext value={value}>
        <Box component="div" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs"
            centered
            TabIndicatorProps={{ sx: { display: 'none' } }}
          >
            <Tab
              label="Cars"
              value="1"
              style={{
                backgroundColor: value === '1' ? '#fff' : '#1B1B1B',
                color: value === '1' ? 'red' : 'white',
                fontFamily: 'Bebas Neue',
                fontSize: '24px',
                fontWeight: '700',
                padding: '0px 60px',
                borderRadius: '6px 0px 0px 6px',
              }}
            />
            <Tab
              label="Monster Truck"
              value="2"
              style={{
                backgroundColor: value === '2' ? '#fff' : '#1B1B1B',
                color: value === '2' ? 'red' : 'white',
                fontFamily: 'Bebas Neue',
                fontSize: '24px',
                fontWeight: '700',
                padding: '0px 60px',
              }}
            />
            <Tab
              label="Tires"
              value="3"
              style={{
                backgroundColor: value === '3' ? '#fff' : '#1B1B1B',
                color: value === '3' ? 'red' : 'white',
                fontFamily: 'Bebas Neue',
                fontSize: '24px',
                fontWeight: '700',
                padding: '0px 60px',
                borderRadius: '0px 6px 6px 0px',
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          {marketplace?.result?.length > 0 && (
            <NftList
              nfts={JSON.parse(JSON.stringify(marketplace?.result))}
              buy={buyHandler}
              client
            />
          )}
        </TabPanel>
        <TabPanel value="2">
          {truckMarketplace?.result?.length > 0 && (
            <NftList
              nfts={JSON.parse(JSON.stringify(truckMarketplace?.result))}
              buy={buyHandler}
              client
            />
          )}
        </TabPanel>
        <TabPanel value="3">
          {tireMarketplace?.result?.length > 0 && (
            <NftList
              nfts={JSON.parse(JSON.stringify(tireMarketplace?.result))}
              buy={buyHandler}
              client
            />
          )}
        </TabPanel>
      </TabContext>

      {/* <div>
        <Typography sx={{ fontSize: "1rem", color: "cyan" }}>
          Marketplace (active sell orders):
        </Typography>
        <Typography sx={{ fontSize: "1rem", color: "cyan" }}>
          {JSON.stringify(marketplace.result)}
        </Typography>
      </div> */}
    </Box>
  )
}

export default Marketplace
