import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Box
} from "@mui/material";

const NftCarCard = (props) => {
  // console.log('card',props);

  const carSelectedHandler = () => {
    props.onSelect(props?.nft);
  }

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
      <CardActionArea onClick={carSelectedHandler}>
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
              <img src={props?.nft?.collection?.icon_url} style={{ borderRadius: 10 }}/>
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
              {` Car # ${props?.id}`}
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
            >{`Speed:  ${props?.nft?.metadata.speed}`}</Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              sx={{
                fontFamily: "Alegreya Sans SC",
                color: "gold",
                fontSize: ".85rem",
              }}
            >{`Acceleration:  ${props?.nft?.metadata.acceleration}`}</Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              sx={{
                fontFamily: "Alegreya Sans SC",
                color: "red",
                fontSize: ".85rem",
              }}
            >{`Handling:  ${props?.nft?.metadata.handling}`}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NftCarCard;
