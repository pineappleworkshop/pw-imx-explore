import {
  Link,
  ImmutableXClient,
  ImmutableMethodResults,
  ImmutableOrderStatus,
} from "@imtbl/imx-sdk";
import { useEffect, useState } from "react";
import { Typography} from "@mui/material";
import NftMarketList from "./NftMarketList";
import NftTruckMarketList from "./NftTruckMarketList";
// import NftTireMarketList from "./NftTireMarketList";
require("dotenv").config();

interface MarketplaceProps {
  client: ImmutableXClient;
  link: Link;
}

const Marketplace = ({ client, link }: MarketplaceProps) => {
  const [marketplace, setMarketplace] =
    useState<ImmutableMethodResults.ImmutableGetOrdersResult>(Object);
  const [truckMarketplace, setTruckMarketplace] =
    useState<ImmutableMethodResults.ImmutableGetOrdersResult>(Object);
  const [tireMarketplace, setTireMarketplace] =
    useState<ImmutableMethodResults.ImmutableGetOrdersResult>(Object);
  const [buyOrderId, setBuyOrderId] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load(): Promise<void> {
    setMarketplace(
      await client.getOrders({
        status: ImmutableOrderStatus.active,
        sell_token_address: process.env.REACT_APP_SPEEDCAR_TOKEN_ADDRESS,
      })
    );
    setTruckMarketplace(
      await client.getOrders({
        status: ImmutableOrderStatus.active,
        sell_token_address: process.env.REACT_APP_MONSTERTRUCK_TOKEN_ADDRESS,
      })
    );
    // setTireMarketplace(
    //   await client.getOrders({
    //     status: ImmutableOrderStatus.active,
    //     sell_token_address: process.env.REACT_APP_TIRE_TOKEN_ADDRESS,
    //   })
    // );
  }

  async function buyHandler(orderId: number) {
    console.log('orderId',orderId);
    await link.buy({
      orderIds: [orderId.toString()],
    });
  }

  return (
    <div>
      <div style={{padding:20}}>
        {marketplace?.result && (
          <Typography
            sx={{
              fontFamily: "Alegreya Sans SC",
              fontSize: "2rem",
              color: "red",
            }}
          >
            Buy{" "}
            {
              JSON.parse(JSON.stringify(marketplace?.result))[0]?.sell.data
                .properties.collection.name
            }{" "}
            NFTs:
          </Typography>
        )}
        {marketplace?.result && (
          <NftMarketList
            nfts={JSON.parse(JSON.stringify(marketplace?.result))}
            buy={buyHandler}
            client
          />
        )}
        {truckMarketplace?.result && (
          <Typography
            sx={{
              fontFamily: "Alegreya Sans SC",
              fontSize: "2rem",
              color: "red",
            }}
          >
            Buy{" "}
            {
              JSON.parse(JSON.stringify(truckMarketplace?.result))[0]?.sell.data
                .properties.collection.name
            }{" "}
            NFTs:
          </Typography>
        )}
        {truckMarketplace?.result  && (
          <NftTruckMarketList
            nfts={JSON.parse(JSON.stringify(truckMarketplace?.result))}
            buy={buyHandler}
            client
          />
        )}
        {/* {tireMarketplace?.result.length > 0  && (
          <NftTireMarketList
            nfts={JSON.parse(JSON.stringify(marketplace?.result))}
            buy={buyHandler}
            client
          />
        )} */}
      </div>
      <br />
      <br />
      <br />
      <div>
        <Typography sx={{ fontSize: "1rem", color: "cyan" }}>
          Marketplace (active sell orders):
        </Typography>
        <Typography sx={{ fontSize: "1rem", color: "cyan" }}>
          {JSON.stringify(marketplace.result)}
        </Typography>
      </div>
    </div>
  );
};

export default Marketplace;
