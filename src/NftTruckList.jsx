import { Box, ImageList, ImageListItem, Container } from "@mui/material/";
import NftTruckCard from "./NftTruckCard";
// import './zillaList.css'

const NftTruckList = (props) => {
  
  console.log('truck list',props);
  return (
    <Container>
    <Box minWidth={4 / 5}>
      <ImageList cols={3} rowHeight="auto" sx={{ p: 1, pt: 1 }} gap={20}>
        {props?.nfts?.map((nft, i) => (
          <ImageListItem key={i}>
            <NftTruckCard id={nft.token_id} image={nft.image_url} nft={nft} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    </Container>
  );
};

export default NftTruckList;
