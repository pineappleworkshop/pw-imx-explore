import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Box
} from "@mui/material";

const NftTruckCard = (props) => {
  console.log('card',props);

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
          height="210"
          image={props?.image}
          alt="NftImage"
          loading="lazy"
          sx={{ backgroundColor: "black", color: "red"}}
        />
        <CardContent
          align="center"
          sx={{ backgroundColor: "black", color: "red" }}
        >
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Box >
              <img src={props?.nft?.collection.icon_url} style={{ borderRadius: 10 }}/>
            </Box>
            

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
              {` ${props?.nft?.metadata.name}`}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              sx={{
                fontFamily: "Alegreya Sans SC",
                color: "deepskyblue",
                fontSize: "1rem",
              }}
            >
              {`Truck # ${props?.id}`}
            </Typography>
            
          </Stack>
          <Stack direction='row' sx={{justifyContent: 'space-between'}}>
          <Typography
              gutterBottom
              variant="body2"
              component="div"
              sx={{
                fontFamily: "Alegreya Sans SC",
                color: "lawngreen",
                fontSize: ".85rem",
              }}
            >{`Attack:  ${props?.nft?.metadata.attack}`}</Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              sx={{
                fontFamily: "Alegreya Sans SC",
                color: "gold",
                fontSize: ".85rem",
              }}
            >{`Crush:  ${props?.nft?.metadata.crush}`}</Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              sx={{
                fontFamily: "Alegreya Sans SC",
                color: "red",
                fontSize: ".85rem",
              }}
            >{`Bounce:  ${props?.nft?.metadata.bounce}`}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NftTruckCard;
