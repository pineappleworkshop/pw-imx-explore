import { ethers } from "ethers";
import {
  Link,
  ImmutableXClient,
  ImmutableMethodResults,
  MintableERC721TokenType,
  ERC721TokenType,
  LinkParams,
} from "@imtbl/imx-sdk";
import { useEffect, useState } from "react";
import {Typography, Stack, Box, Button, Container} from "@mui/material/";
import NftList from "./NftList";
import CarNftList from "./CarNftList";
require("dotenv").config();

interface InventoryProps {
  client: ImmutableXClient;
  link: Link;
  wallet: string;
}


const Racetrack = ({ client, link, wallet }: InventoryProps) => {
  const [inventory, setInventory] =
    useState<ImmutableMethodResults.ImmutableGetAssetsResult>(Object);
  
    // minting
  const [mintTokenId, setMintTokenId] = useState("");
  const [mintBlueprint, setMintBlueprint] = useState("");
  const [mintTokenIdv2, setMintTokenIdv2] = useState("");
  const [mintBlueprintv2, setMintBlueprintv2] = useState("");


  const car_token_address: string = process.env.REACT_APP_SPEEDCAR_TOKEN_ADDRESS ?? ""; // contract registered by Immutable
  const truck_token_address: string = process.env.REACT_APP_MONSTERTRUCK_TOKEN_ADDRESS ?? ""; // contract registered by Immutable
  const tire_token_address: string = process.env.REACT_APP_TRUCKTIRE_TOKEN_ADDRESS ?? ""; // contract registered by Immutable
  

  useEffect(() => {
    load();
  }, []);

  async function load(): Promise<void> {
    // const invTires = await client.getAssets({ user: wallet, sell_orders: true, collection: tire_token_address});
    const invCars = await client.getAssets({ user: wallet, sell_orders: true, collection: car_token_address });
    setInventory(invCars);
    console.log('invCars',invCars);
  }

  // helper function to generate random ids
  function random(): number {
    const min = 1;
    const max = 1000000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
        contractAddress: tire_token_address.toLowerCase(),

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
    setInventory(await client.getAssets({ user: wallet, sell_orders: true, collection: tire_token_address  }));
    
    }

  return (
    <Container>
      <Stack direction="row" sx={{justifyContent: 'space-between'}}>
      <Typography sx={{fontFamily: "Alegreya Sans SC", fontSize: "2rem", color: "orangered" }}>
        Choose Race Car:
      </Typography>
      <div>
        <Typography sx={{ fontSize: "1rem", color: "cyan" }}>
          Race to Win a Monster Truck Tire:
        </Typography>

        <label style={{ color: "gold" }}>
          Car ID:
          <input
            type="text"
            value={mintTokenIdv2}
            onChange={(e) => setMintTokenIdv2(e.target.value)}
          />
        </label>
        
        
        <button onClick={mintv2}>Race Now!</button>
      </div>
      
      </Stack>
      <CarNftList nfts={inventory.result} />
      
     
      
    <Box sx={{height: '80vh'}}></Box>
    </Container>
  );
};

export default Racetrack;
