import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Box
} from "@mui/material";

const NftTireCard = (props) => {
  return (
    <Card
      raised={true}
      sx={{
        borderRadius: 6,
        maxWidth: 250,
        borderColor: "white",
        boxShadow: "0 0 5px 5px red",
        borderWidth: 2,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
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
                fontSize: "1.1rem",
              }}
            >
              {` ${props?.nft?.metadata.name}`}
            </Typography>
            
          </Stack>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NftTireCard;
