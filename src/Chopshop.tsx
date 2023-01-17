import { ethers } from "ethers";
import {
  Link,
  ImmutableXClient,
  ImmutableMethodResults,
  MintableERC721TokenType,
  ERC721TokenType,
  LinkParams,
} from "@imtbl/imx-sdk";
import { ImmutableX, Config } from '@imtbl/core-sdk';
import { useEffect, useState } from "react";
import {Typography, Stack, Box, Button, Container} from "@mui/material/";
import CarNftList from "./CarNftList";
import NftCarCard from "./NftCarCard";
import NftTireList from "./NftTireList";
require("dotenv").config();

interface InventoryProps {
  client: ImmutableXClient;
  link: Link;
  wallet: string;
}

// Initialize Link
let link = new Link('https://link.sandbox.x.immutable.com')

const config = Config.SANDBOX; // Or Config.PRODUCTION
const clientCore = new ImmutableX(config);


const Chopshop = ({ client, wallet }: InventoryProps) => {
  const [inventory, setInventory] =
    useState<ImmutableMethodResults.ImmutableGetAssetsResult>(Object);
  const [tireInventory, setTireInventory] =
    useState<ImmutableMethodResults.ImmutableGetAssetsResult>(Object);
  const [carSelected, setCarSelected] = useState<ImmutableMethodResults.ImmutableAsset>(Object);
  
  const [isCarSelected, setIsCarSelected] = useState(false);
  const [mintTokenIdv2, setMintTokenIdv2] = useState("");
  const [ownedTires, setOwnedTires] = useState<string[]>([]);
  

  const truck_token_address: string = process.env.REACT_APP_MONSTERTRUCK_TOKEN_ADDRESS ?? ""; // contract registered by Immutable
  const car_token_address: string = process.env.REACT_APP_SPEEDCAR_TOKEN_ADDRESS ?? ""; // contract registered by Immutable
  const tire_token_address: string = process.env.REACT_APP_TRUCKTIRE_TOKEN_ADDRESS ?? ""; // contract registered by Immutable
  const burn_mock_address: string = process.env.REACT_APP_MOCK_BURN_ADDRESS ?? ""; 
  
  useEffect(() => {
    load();
  }, []);

  async function load(): Promise<void> {
    const invTires = await client.getAssets({ user: wallet, sell_orders: true, collection: tire_token_address});
    const invCars = await client.getAssets({ user: wallet, sell_orders: true, collection: car_token_address });
    setInventory(invCars);
    setTireInventory(invTires);
    console.log('invCars',invCars);
    //getting truck ids so we know the next mint number
    getListAssets(truck_token_address, 'id')
    .then((result) => {
      //print the result
      console.log(result);
      const nextId = result.length + 1;
      setMintTokenIdv2(nextId.toString());
    })
    .catch((e) => {
      console.log(e);
    });

    let tireIds: string[] = await getUserAssets(tire_token_address, 'id')
    .then((result) => {
      console.log('assets',result);
      return result?.map(tire => tire.token_id)
    })
    .catch((e) => {
      console.log(e);
      return [];
    });
    console.log('tireIds',tireIds);
    setOwnedTires(tireIds);

  }

  const getListAssets = async (
    collectionAddress: string,
    orderBy: 'updated_at' | 'id'
  ) => {
    const response = await clientCore.listAssets({
      collection: collectionAddress
    });
    return response.result;
  };

  const getUserAssets = async (
    collectionAddress: string,
    orderBy: 'updated_at' | 'id'
  ) => {
    const response = await clientCore.listAssets({
      collection: collectionAddress,
      user: wallet
    });
    return response.result;
  };

  const carSelectedHandler = (car: ImmutableMethodResults.ImmutableAsset) => {    
    setCarSelected(car);  
    setIsCarSelected((prev) => {
      return !prev
    })
  }

  const buildHandler = async() => {    
    //check for 4 tires and send to "burn" wallet
    if(isCarSelected && ownedTires.length >= 4){
      try{
        // Call the method
        let result = await link.transfer([
          {
                "type": ERC721TokenType.ERC721,
                "toAddress": burn_mock_address,
                "tokenId": ownedTires[0],
                "tokenAddress": tire_token_address
          },
          {
                "type": ERC721TokenType.ERC721,
                "toAddress": burn_mock_address,
                "tokenId": ownedTires[1],
                "tokenAddress": tire_token_address
          },
          {
                "type": ERC721TokenType.ERC721,
                "toAddress": burn_mock_address,
                "tokenId": ownedTires[2],
                "tokenAddress": tire_token_address
          },
          {
                "type": ERC721TokenType.ERC721,
                "toAddress": burn_mock_address,
                "tokenId": ownedTires[3],
                "tokenAddress": tire_token_address
          },
          {
                "type": ERC721TokenType.ERC721,
                "toAddress": burn_mock_address,
                "tokenId": carSelected.token_id,
                "tokenAddress": car_token_address
          }
        ])
          // Print the result
          console.log('batch',result)
          //then mint truck
          mintv2();
      }catch(error){
          // Catch and print out the error
          console.error(error)
      }
    }
    
  }

  async function mintv2() {
    // initialise a client with the minter for your NFT smart contract
    const provider = new ethers.providers.JsonRpcProvider(
      `https://eth-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
    );

    /**
    //if you want to mint on a back end server you can also provide the private key of your wallet directly to the minter. 
    //Please note: you should never share your private key and so ensure this is only done on a server that is not accessible from the internet
    const minterPrivateKey: string = process.env.REACT_APP_MINTER_PK ?? ''; // registered minter for your contract
    const minter = new ethers.Wallet(minterPrivateKey).connect(provider);
    **/
    const minter = new ethers.providers.Web3Provider(
      window.ethereum
    ).getSigner(); //get Signature from Metamask wallet
    console.log('minter',minter)
    const publicApiUrl: string = process.env.REACT_APP_SANDBOX_ENV_URL ?? "";
    const starkContractAddress: string =
      process.env.REACT_APP_SANDBOX_STARK_CONTRACT_ADDRESS ?? "";
    const registrationContractAddress: string =
      process.env.REACT_APP_SANDBOX_REGISTRATION_ADDRESS ?? "";
    const minterClient = await ImmutableXClient.build({
      publicApiUrl,
      signer: minter,
      starkContractAddress,
      registrationContractAddress,
    });

    // mint any number of NFTs to specified wallet address (must be registered on Immutable X first)
    const token_address: string = process.env.REACT_APP_TIRE_TOKEN_ADDRESS ?? ""; // contract registered by Immutable
    const royaltyRecieverAddress: string =
      process.env.REACT_APP_ROYALTY_ADDRESS ?? "";
    const tokenReceiverAddress: string =
      process.env.REACT_APP_TOKEN_RECEIVER_ADDRESS ?? "";
    const speedCarAddress: string =
      process.env.REACT_APP_SPEEDCAR_TOKEN_ADDRESS ?? "";
      const result = await minterClient.mintV2([
      {
        users: [
          {
            etherKey: wallet.toLowerCase(),
            tokens: [
              {
                id: mintTokenIdv2,
                blueprint: "just-a-bprint",
                // overriding royalties for specific token
                // royalties: [
                //   {
                //     recipient: wallet.toLowerCase(),
                //     percentage: 3.5,
                //   },
                // ],
              },
            ],
          },
        ],
        contractAddress: truck_token_address.toLowerCase(),

        // globally set royalties
        royalties: [
          {
            recipient: wallet.toLowerCase(),
            percentage: 4.0,
          },
        ],
      },
    ]);
    console.log(`Token minted: ${result}`);
    setInventory(await client.getAssets({ user: wallet, sell_orders: true, collection: car_token_address  }));    
  }

  return (
    <Container>
      <Typography sx={{ fontFamily: "Alegreya Sans SC",fontSize: "2.5rem", color: "cyan" }}>
        Welcome to the Chop Shop:
      </Typography>
      <Typography sx={{ fontFamily: "Alegreya Sans SC",fontSize: "2rem", color: "red" }}>
        Build a Monster Truck from your Race Car and 4 Monster Truck Tires
      </Typography>
      <Stack direction="row" sx={{justifyContent: 'space-around'}}>
      {!isCarSelected  && <Typography sx={{fontFamily: "Alegreya Sans SC", fontSize: "2rem", color: "cyan" }}>
          Choose Race Car:
        </Typography>      }  
        {tireInventory?.result?.length > 3 && isCarSelected  &&<Button
              variant="contained"
              size="large"
              sx={{
                fontFamily: "Alegreya Sans SC",
                fontSize: "1rem",
                color: "black",
                backgroundColor: "red",
              }}
              onClick={buildHandler}
            >
              Build a Monster Truck
            </Button>  }        
            {tireInventory?.result?.length < 4 && <Typography sx={{ fontFamily: "Alegreya Sans SC",fontSize: "2rem", color: "red" }}>
              !You Need 4 Monster Tires!
            </Typography>   } 
      </Stack>      
      {!isCarSelected && <CarNftList nfts={inventory?.result} onSelect={carSelectedHandler} />   } 
      {isCarSelected  && <NftCarCard id={carSelected?.token_id} image={carSelected?.image_url} nft={carSelected} onSelect={carSelectedHandler} />   } 
      <Typography sx={{ fontFamily: "Alegreya Sans SC",fontSize: "2rem", color: "cyan" }}>
        Your Monster Tires:
      </Typography>
      {tireInventory?.result?.length > 0 && <NftTireList nfts={tireInventory?.result} />}
      
    <Box sx={{height: '80vh'}}></Box>
    </Container>
  );
};

export default Chopshop;
