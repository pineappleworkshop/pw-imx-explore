import { Box, ImageList, ImageListItem } from "@mui/material/";
import NftTruckMarketCard from "./NftTruckMarketCard";
// import './zillaList.css'

const NftTruckMarketList = (props) => {
  const buyHandler = (orderId) => {
    props.buy(orderId);
  };

  return (
    <Box minWidth={4 / 5}>
      <ImageList cols={4} rowHeight="auto" sx={{ p: 1, pt: 1 }} gap={20}>
        {props?.nfts.map((nft, i) => (
          <ImageListItem key={i}>
            <NftTruckMarketCard
              id={nft?.sell.data.token_id}
              image={nft?.sell.data.properties.image_url}
              name={nft?.sell.data.properties.name}
              nft={nft}
              buy={buyHandler}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
export default NftTruckMarketList;
