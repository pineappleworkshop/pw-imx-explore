import { Box, ImageList, ImageListItem, Container } from "@mui/material/";
import NftTireCard from "./NftTireCard";

const NftTireList = (props) => {
  
  console.log('tire list',props);
  return (
    <Container>
    <Box minWidth={4 / 5}>
      <ImageList cols={4} rowHeight="auto" sx={{ p: 1, pt: 1 }} gap={20}>
        {props?.nfts?.map((nft, i) => (
          <ImageListItem key={i}>
            <NftTireCard id={nft?.token_id} image={nft?.image_url} nft={nft} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    </Container>
  );
};

export default NftTireList;
