import {
  Stack,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Box,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi'
const NftCard = (props) => {
  const clickBuyHandler = () => {
    props.buy(Number(props?.nft?.order_id))
  }

  const getAsset = async (tokenAddress, tokenId, includeFees) => {
    const response = await props?.client?.getAsset({
      tokenAddress,
      tokenId,
      includeFees,
    })
    return response
  }

  useEffect(() => {
    getAsset(props?.nft?.sell?.data?.token_address, props?.id, true)
      .then((result) => {
        console.log(result)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <Card sx={{ backgroundColor: 'black' }}>
      <CardHeader
        sx={{ backgroundColor: '#1B1B1B', height: '62px' }}
        title={
          <Typography
            align="center"
            sx={{
              fontFamily: 'Bebas Neue',
              color: 'white',
              fontWeight: 400,
              fontSize: '28px',
            }}
          >
            {` ${props?.name}`}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="192px"
        image={props?.image}
        alt="NftImage"
        loading="lazy"
      />

      <CardContent
        align="center"
        sx={{ backgroundColor: 'black', color: 'red' }}
      >
        <Stack direction="column">
          <Stack sx={{ justifyContent: 'flex-start' }}>
            <Typography
              component="div"
              align="center"
              sx={{
                fontFamily: 'inter',
                color: 'white',
                fontSize: '16px',
                fontWeight: 400,
              }}
            >
              {`${props?.nft.sell.data.properties.collection.name} #${props?.id}`}
            </Typography>

            <Typography
              align="center"
              sx={{
                fontFamily: 'inter',
                color: '#D4D4D4',
                fontSize: '14px',
                fontWeight: 400,
              }}
            >{`Order:  ${props?.nft.order_id}`}</Typography>
          </Stack>
          {/* <Stack>
            <Typography
                gutterBottom
                variant="body2"
                component="div"
                align="left"
                sx={{
                  fontFamily: "Alegreya Sans SC",
                  color: "cyan",
                  fontSize: ".8rem",
                }}
              >{`Speed:  ${props?.nft.sell.data.properties.speed}`}</Typography>
          </Stack> */}
        </Stack>
      </CardContent>
      <CardActions
        sx={{
          backgroundColor: '#1B1B1B',
          justifyContent: 'center',
          height: '56px',
        }}
      >
        <Stack
          sx={{
            fontFamily: 'inter',
            fontSize: '16px',
            fontWeight: 500,
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '11.78px',
          }}
          onClick={clickBuyHandler}
        >
          <HiOutlineShoppingBag />
          {`${props?.nft.buy.data.quantity_with_fees / 1e18} ETH`}
        </Stack>
      </CardActions>
    </Card>
  )
}

export default NftCard
