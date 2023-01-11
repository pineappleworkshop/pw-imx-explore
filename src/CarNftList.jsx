import { Box, ImageList, ImageListItem } from "@mui/material/";
import NftCarCard from "./NftCarCard";
// import './zillaList.css'

const CarNftList = (props) => {
  
  console.log('car list',props);
  return (
    <Box minWidth={5 / 5}>
      <ImageList cols={4} rowHeight="auto" sx={{ p: 1, pt: 1 }} gap={20}>
        {props?.nfts?.map((nft, i) => (
          <ImageListItem key={i}>
            <NftCarCard id={nft.token_id} image={nft.image_url} nft={nft} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default CarNftList;
