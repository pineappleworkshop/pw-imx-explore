import { Box, ImageList, ImageListItem, Container } from "@mui/material/";
import NftCarCard from "./NftCarCard";
// import './zillaList.css'

const CarNftList = (props) => {
  
  console.log('car list',props);
  return (
    <Container>
    <Box minWidth={4 / 5}>
      <ImageList cols={3} rowHeight="auto" sx={{ p: 1, pt: 1 }} gap={20}>
        {props?.nfts?.map((nft, i) => (
          <ImageListItem key={i}>
            <NftCarCard id={nft.token_id} image={nft.image_url} nft={nft} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    <Box sx={{height: '100px'}}></Box>
    </Container>
  );
};

export default CarNftList;
