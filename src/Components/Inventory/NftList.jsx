import { Box, ImageList, ImageListItem } from '@mui/material/'
import NftCard from '../../NftCard'
// import './zillaList.css'

const NftList = (props) => {
  console.log('apa', props)
  return (
    <Box minWidth={5 / 5}>
      <ImageList cols={4} rowHeight="auto" sx={{ p: 1, pt: 1 }} gap={20}>
        {props?.nfts?.map((nft, i) => (
          <ImageListItem key={i}>
            <NftCard id={nft.token_id} image={nft.image_url} nft={nft} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  )
}

export default NftList
