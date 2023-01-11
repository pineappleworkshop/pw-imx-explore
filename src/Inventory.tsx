import { ethers } from "ethers";
import {
  Link,
  ImmutableXClient,
  ImmutableMethodResults,
  MintableERC721TokenType,
} from "@imtbl/imx-sdk";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import NftList from "./NftList";
import CarNftList from "./CarNftList";
require("dotenv").config();

interface InventoryProps {
  client: ImmutableXClient;
  link: Link;
  wallet: string;
}

const Inventory = ({ client, link, wallet }: InventoryProps) => {
  const [inventory, setInventory] =
    useState<ImmutableMethodResults.ImmutableGetAssetsResult>(Object);
  const [speedCarInventory, setSpeedCarInventory] =
    useState<ImmutableMethodResults.ImmutableGetAssetsResult>(Object);
    // minting
  const [mintTokenId, setMintTokenId] = useState("");
  const [mintBlueprint, setMintBlueprint] = useState("");
  const [mintTokenIdv2, setMintTokenIdv2] = useState("");
  const [mintBlueprintv2, setMintBlueprintv2] = useState("");

  // buying and selling
  const [sellAmount, setSellAmount] = useState("");
  const [sellTokenId, setSellTokenId] = useState("");
  const [sellTokenAddress, setSellTokenAddress] = useState("");
  const [sellCancelOrder, setSellCancelOrder] = useState("");


  useEffect(() => {
    load();
  }, []);

  async function load(): Promise<void> {
    const inv = await client.getAssets({ user: wallet, sell_orders: true, collection: process.env.REACT_APP_APA_TOKEN_ADDRESS });
    const invCars = await client.getAssets({ user: wallet, collection: process.env.REACT_APP_SPEEDCAR_TOKEN_ADDRESS });
    setInventory(inv);
    setSpeedCarInventory(invCars);
    console.log('invCars',invCars);
  }

  // sell an asset
  async function sellNFT() {
    await link.sell({
      amount: sellAmount,
      tokenId: sellTokenId,
      tokenAddress: sellTokenAddress,
    });
    setInventory(await client.getAssets({ user: wallet, sell_orders: true }));
  }

  // cancel sell order
  async function cancelSell() {
    await link.cancel({
      orderId: sellCancelOrder,
    });
    setInventory(await client.getAssets({ user: wallet, sell_orders: true }));
  }

  // helper function to generate random ids
  function random(): number {
    const min = 1;
    const max = 1000000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // the minting function should be on your backend
  async function mint() {
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
    const token_address: string = process.env.REACT_APP_SPEEDCAR_TOKEN_ADDRESS ?? ""; // contract registered by Immutable
    const result = await minterClient.mint({
      mints: [
        {
          etherKey: wallet,
          tokens: [
            {
              type: MintableERC721TokenType.MINTABLE_ERC721,
              data: {
                id: mintTokenId, // this is the ERC721 token id
                blueprint: mintBlueprint, // this is passed to your smart contract at time of withdrawal from L2
                tokenAddress: token_address.toLowerCase(),
              },
            },
          ],
          nonce: random().toString(10),
          authSignature: "",
        },
      ],
    });
    console.log(`Token minted: ${result.results[0].token_id}`);
    setInventory(await client.getAssets({ user: wallet, sell_orders: true }));
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
    const token_address: string = process.env.REACT_APP_SPEEDCAR_TOKEN_ADDRESS ?? ""; // contract registered by Immutable
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
            etherKey: tokenReceiverAddress.toLowerCase(),
            tokens: [
              {
                id: mintTokenIdv2,
                blueprint: mintBlueprintv2,
                // overriding royalties for specific token
                royalties: [
                  {
                    recipient: tokenReceiverAddress.toLowerCase(),
                    percentage: 3.5,
                  },
                ],
              },
            ],
          },
        ],
        contractAddress: token_address.toLowerCase(),

        // globally set royalties
        royalties: [
          {
            recipient: tokenReceiverAddress.toLowerCase(),
            percentage: 4.0,
          },
        ],
      },
    ]);
    console.log(`Token minted: ${result}`);
    setInventory(await client.getAssets({ user: wallet, sell_orders: true, collection: "0x381BE1c4765AEe02Fc3cC86c700Ab1c4a30fc7c9" }));
    
    setSpeedCarInventory(await client.getAssets({ user: wallet, sell_orders: true, collection: speedCarAddress }));
  }

  return (
    <div>
      <Typography sx={{ fontSize: "2rem", color: "cyan" }}>
        Your NFTs:
      </Typography>
      <NftList nfts={inventory.result} />
      <CarNftList nfts={speedCarInventory.result} />
      <div>
        <Typography sx={{ fontSize: "1rem", color: "cyan" }}>
          Mint NFT:
        </Typography>

        <label style={{ color: "gold" }}>
          Token ID:
          <input
            type="text"
            value={mintTokenId}
            onChange={(e) => setMintTokenId(e.target.value)}
          />
        </label>
        <label style={{ color: "gold" }}>
          Blueprint:
          <input
            type="text"
            value={mintBlueprint}
            onChange={(e) => setMintBlueprint(e.target.value)}
          />
        </label>
        <button onClick={mint}>Mint</button>
      </div>
      <br />
      <div>
        <Typography sx={{ fontSize: "1rem", color: "cyan" }}>
          MintV2 - with Royalties NFT:
        </Typography>

        <label style={{ color: "gold" }}>
          Token ID:
          <input
            type="text"
            value={mintTokenIdv2}
            onChange={(e) => setMintTokenIdv2(e.target.value)}
          />
        </label>
        <label style={{ color: "gold" }}>
          Blueprint:
          <input
            type="text"
            value={mintBlueprintv2}
            onChange={(e) => setMintBlueprintv2(e.target.value)}
          />
        </label>
        <button onClick={mintv2}>MintV2</button>
      </div>
      <br />
      <div>
        <Typography sx={{ fontSize: "1rem", color: "cyan" }}>
          Sell asset (create sell order):
        </Typography>

        <label style={{ color: "gold" }}>
          Amount (ETH):
          <input
            type="text"
            value={sellAmount}
            onChange={(e) => setSellAmount(e.target.value)}
          />
        </label>
        <label style={{ color: "gold" }}>
          Token ID:
          <input
            type="text"
            value={sellTokenId}
            onChange={(e) => setSellTokenId(e.target.value)}
          />
        </label>
        <label style={{ color: "gold" }}>
          Token Address:
          <input
            type="text"
            value={sellTokenAddress}
            onChange={(e) => setSellTokenAddress(e.target.value)}
          />
        </label>
        <button onClick={sellNFT}>Sell</button>
      </div>
      <br />
      <div>
        <Typography sx={{ fontSize: "1rem", color: "cyan" }}>
          Cancel sell order:
        </Typography>

        <br />
        <label style={{ color: "gold" }}>
          Order ID:
          <input
            type="text"
            value={sellCancelOrder}
            onChange={(e) => setSellCancelOrder(e.target.value)}
          />
        </label>
        <button onClick={cancelSell}>Cancel</button>
      </div>
      <br />
      <br />
      <br />
      <div style={{ color: "cyan" }}>
        Inventory:
        {JSON.stringify(inventory.result)}
      </div>
    </div>
  );
};

export default Inventory;
