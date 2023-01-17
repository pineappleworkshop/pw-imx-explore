import { Box, ImageList, ImageListItem, Container } from "@mui/material/";
import { useEffect, useState } from "react";
import NftCarCard from "./NftCarCard";
// import './zillaList.css'

const CarNftList = (props) => {

  const carSelectedHandler = (car) => {
    props.onSelect(car);
  }
  
  return (
    <Container>
    <Box minWidth={4 / 5}>
      <ImageList cols={3} rowHeight="auto" sx={{ p: 1, pt: 1 }} gap={20}>
        {props?.nfts?.map((nft, i) => (
          <ImageListItem key={i}>
            <NftCarCard id={nft.token_id} image={nft.image_url} nft={nft} onSelect={carSelectedHandler} />
          </ImageListItem>
        ))}
        </ImageList>
    </Box>
    </Container>
  );
};

export default CarNftList;
