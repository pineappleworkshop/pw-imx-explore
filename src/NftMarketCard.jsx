import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

const NftMarketCard = (props) => {
  const clickBuyHandler = () => {
    props.buy(Number(props?.nft?.order_id));
  };

  const getAsset = async (
    tokenAddress,
    tokenId,
    includeFees
  ) => {
    const response = await props?.client?.getAsset({
      tokenAddress,
      tokenId,
      includeFees,
    });
    return response;
  };
  

  useEffect(() => {
    getAsset(props?.nft?.sell?.data?.token_address, props?.id, true)
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });
  }, []);

  return (
    <Card
      raised={true}
      sx={{
        borderRadius: 6,
        maxWidth: 345,
        borderColor: "white",
        boxShadow: "0 0 5px 5px red",
        borderWidth: 2,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={props?.image}
          alt="NftImage"
          loading="lazy"
        />
      </CardActionArea>
      <CardContent
        align="center"
        sx={{ backgroundColor: "black", color: "red" }}
      >
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Stack sx={{ justifyContent: "flex-start" }}>          
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              align="left"
              sx={{
                fontFamily: "Alegreya Sans SC",
                color: "red",
                fontSize: "1rem",
              }}
            >
              {`${props?.nft.sell.data.properties.collection.name} #${props?.id}`}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              align="left"
              sx={{
                fontFamily: "Alegreya Sans SC",
                color: "cyan",
                fontSize: "1rem",
              }}
            >
              {` ${props?.name}`}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              align="left"
              sx={{
                fontFamily: "Alegreya Sans SC",
                color: "deepskyblue",
                fontSize: ".8rem",
              }}
            >{`Order:  ${props?.nft.order_id}`}</Typography>
          </Stack>
          <Stack>
          {/* <Typography
              gutterBottom
              variant="body2"
              component="div"
              align="left"
              sx={{
                fontFamily: "Alegreya Sans SC",
                color: "cyan",
                fontSize: ".8rem",
              }}
            >{`Speed:  ${props?.nft.sell.data.properties.speed}`}</Typography> */}
          </Stack>
          <Stack>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            sx={{
              fontFamily: "Alegreya Sans SC",
              color: "gold",
              fontSize: "1.2rem",
            }}
          >{`${props?.nft.buy.data.quantity_with_fees / 1e18} ETH`}
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              fontFamily: "Alegreya Sans SC",
              fontSize: "1rem",
              color: "black",
              backgroundColor: "cyan",
            }}
            value={2}
            onClick={clickBuyHandler}
          >
            BUY
          </Button>
          </Stack>          
          
        </Stack>
        
          
        
      </CardContent>
    </Card>
  );
};

export default NftMarketCard;
