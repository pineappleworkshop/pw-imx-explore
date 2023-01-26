import {
  Link,
  ImmutableXClient,
  ImmutableMethodResults,
  ImmutableOrderStatus,
} from '@imtbl/imx-sdk'
import { useEffect, useState } from 'react'
import { Typography, Box, Tab } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import NftMarketList from './NftMarketList'
import NftTruckMarketList from './NftTruckMarketList'
import NftTireMarketList from './NftTireMarketList'
import { useImutableXContext } from './Contexts/ImutableXContext'
require('dotenv').config()

const Marketplace = () => {
  const { client, link } = useImutableXContext()
  const [value, setValue] = useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  console.log({ client })
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
          <TabList onChange={handleChange} aria-label="lab API tabs" centered>
            <Tab
              label="CARS"
              value="1"
              style={{
                backgroundColor: '#1B1B1B',
                color: 'white',
                fontFamily: 'Bebas Neue',
                fontSize: '24px',
                fontWeight: '700',
                padding: '0px 60px',
                borderRadius: '6px 0px 0px 6px',
              }}
            />
            <Tab
              label="MONSTER TRUCK"
              value="2"
              style={{
                backgroundColor: '#1B1B1B',
                color: 'white',
                fontFamily: 'Bebas Neue',
                fontSize: '24px',
                fontWeight: '700',
                padding: '0px 60px',
              }}
            />
            <Tab
              label="TIRES"
              value="3"
              style={{
                backgroundColor: '#1B1B1B',
                color: 'white',
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
            <Typography
              sx={{
                fontFamily: 'Alegreya Sans SC',
                fontSize: '2rem',
                color: 'red',
              }}
            >
              Buy{' '}
              {
                JSON.parse(JSON.stringify(marketplace?.result))[0]?.sell.data
                  .properties.collection.name
              }{' '}
              NFTs:
            </Typography>
          )}
          {marketplace?.result?.length > 0 && (
            <NftMarketList
              nfts={JSON.parse(JSON.stringify(marketplace?.result))}
              buy={buyHandler}
              client
            />
          )}
        </TabPanel>
        <TabPanel value="2">
          {truckMarketplace?.result?.length > 0 && (
            <Typography
              sx={{
                fontFamily: 'Alegreya Sans SC',
                fontSize: '2rem',
                color: 'red',
              }}
            >
              Buy{' '}
              {
                JSON.parse(JSON.stringify(truckMarketplace?.result))[0]?.sell
                  .data.properties.collection.name
              }{' '}
              NFTs:
            </Typography>
          )}
          {truckMarketplace?.result?.length > 0 && (
            <NftTruckMarketList
              nfts={JSON.parse(JSON.stringify(truckMarketplace?.result))}
              buy={buyHandler}
              client
            />
          )}
        </TabPanel>
        <TabPanel value="3">
          {tireMarketplace?.result?.length > 0 && (
            <Typography
              sx={{
                fontFamily: 'Alegreya Sans SC',
                fontSize: '2rem',
                color: 'red',
              }}
            >
              Buy{' '}
              {
                JSON.parse(JSON.stringify(tireMarketplace?.result))[0]?.sell
                  .data.properties.collection.name
              }{' '}
              NFTs:
            </Typography>
          )}
          {tireMarketplace?.result?.length > 0 && (
            <NftTireMarketList
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
