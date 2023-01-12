import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@mui/material";

const NftCarCard = (props) => {
  console.log('card',props);

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
          sx={{ backgroundColor: "black", color: "red"}}
        />
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
              {` NFT # ${props?.id}`}
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
