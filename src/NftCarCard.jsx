import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@mui/material";

const NftCarCard = (props) => {
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
                color: "deepskyblue",
                fontSize: "1rem",
              }}
            >
              {` NFT # ${props?.id}`}
            </Typography>

            <Typography
              gutterBottom
              variant="body2"
              component="div"
              sx={{
                fontFamily: "Alegreya Sans SC",
                color: "cyan",
                fontSize: "1.5rem",
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
                color: "crimson",
                fontSize: "1rem",
              }}
            >{`Speed:  ${props?.nft?.metadata.speed}`}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NftCarCard;
