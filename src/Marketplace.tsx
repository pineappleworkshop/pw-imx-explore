import {
  Link,
  ImmutableXClient,
  ImmutableMethodResults,
  ImmutableOrderStatus,
} from "@imtbl/imx-sdk";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import NftMarketList from "./NftMarketList";
require("dotenv").config();

interface MarketplaceProps {
  client: ImmutableXClient;
  link: Link;
}

const Marketplace = ({ client, link }: MarketplaceProps) => {
  const [marketplace, setMarketplace] =
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
  }

  async function buyHandler(orderId: number) {
    console.log('orderId',orderId);
    await link.buy({
      orderIds: [orderId.toString()],
    });
  }

  return (
    <div>
      <div>
        {marketplace?.result && (
          <Typography
            sx={{
              fontFamily: "Alegreya Sans SC",
              fontSize: "2rem",
              color: "cyan",
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
