import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Button,
} from "@mui/material";

const NftMarketCard = (props) => {
  const clickBuyHandler = () => {
    props.buy(Number(props?.nft?.order_id));
  };

  return (
    <Card
      raised={true}
      sx={{
        borderRadius: 6,
        maxWidth: 345,
        borderColor: "white",
        boxShadow: "0 0 5px 5px cyan",
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
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            sx={{
              fontFamily: "Alegreya Sans SC",
              color: "magenta",
              fontSize: "1rem",
            }}
          >
            {`${props?.nft.sell.data.properties.collection.name} #${props?.id}`}
          </Typography>

          <Typography
            gutterBottom
            variant="body2"
            component="div"
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
            sx={{
              fontFamily: "Alegreya Sans SC",
              color: "palegreen",
              fontSize: "1rem",
            }}
          >{`Price:  ${
            props?.nft.buy.data.quantity_with_fees / 1e18
          } ETH`}</Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            sx={{
              fontFamily: "Alegreya Sans SC",
              color: "cyan",
              fontSize: ".9rem",
            }}
          >{`OrderId:  ${props?.nft.order_id}`}</Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              fontFamily: "Alegreya Sans SC",
              fontSize: ".8rem",
              color: "black",
              backgroundColor: "cyan",
            }}
            value={2}
            onClick={clickBuyHandler}
          >
            BUY
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NftMarketCard;
