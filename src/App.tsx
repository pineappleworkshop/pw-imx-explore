import "./App.css";
import { Link, ImmutableXClient, ImmutableMethodResults } from "@imtbl/imx-sdk";
import { Typography } from "@mui/material/";
import { useEffect, useState } from "react";
import Marketplace from "./Marketplace";
import Inventory from "./Inventory";
import Bridging from "./Bridging";
import Racetrack from "./Racetrack";
require("dotenv").config();

const App = () => {
  // initialise Immutable X Link SDK
  const link = new Link(process.env.REACT_APP_SANDBOX_LINK_URL);
  const address = localStorage.getItem("address");

  // general
  const [tab, setTab] = useState("marketplace");
  const [wallet, setWallet] = useState("undefined");
  const [balance, setBalance] =
    useState<ImmutableMethodResults.ImmutableGetBalanceResult>(Object);
  const [client, setClient] = useState<ImmutableXClient>(Object);

  useEffect(() => {
    buildIMX();
  }, []);

  // initialise an Immutable X Client to interact with apis more easily
  async function buildIMX() {
    const publicApiUrl: string = process.env.REACT_APP_SANDBOX_ENV_URL ?? "";
    setClient(await ImmutableXClient.build({ publicApiUrl }));
  }

  // register and/or setup a user
  async function linkSetup(): Promise<void> {
    const res = await link.setup({});
    setWallet(res?.address);
    localStorage.setItem("address", res?.address);
    setBalance(
      await client.getBalance({ user: res?.address, tokenAddress: "eth" })
    );
  }

  function handleTabs() {
    if (client.address) {
      switch (tab) {
        case "inventory":
          if (wallet === "undefined") return <div>Connect wallet</div>;
          return <Inventory client={client} link={link} wallet={wallet} />;
          case "racetrack":
          if (wallet === "undefined") return <div>Connect wallet</div>;
          return <Racetrack client={client} link={link} wallet={wallet} />;
        case "bridging":
          if (wallet === "undefined") return <div>Connect wallet</div>;
          return <Bridging client={client} link={link} wallet={wallet} />;
        default:
          return <Marketplace client={client} link={link} />;
      }
    }
    return null;
  }

  return (
    <div className="App bg-img">
      <Typography
        gutterBottom
        variant="h1"
        component="div"
        sx={{ fontFamily: "Roboto", color: "cyan", fontSize: "2rem" }}
      >
        Rocket Car Garage
      </Typography>
      <button onClick={linkSetup}>Connect</button>
      <Typography
        gutterBottom
        variant="body2"
        component="div"
        sx={{ fontFamily: "Roboto", color: "cyan", fontSize: ".75rem" }}
      >
        {` Active wallet: ${wallet}`}
      </Typography>
      <Typography
        gutterBottom
        variant="body2"
        component="div"
        sx={{ fontFamily: "Roboto", color: "cyan", fontSize: ".75rem" }}
      >
        ETH balance (in wei): {balance?.balance?.toString()}
      </Typography>
      {/* <div>Active wallet: {wallet}</div>
      <div>ETH balance (in wei): {balance?.balance?.toString()}</div> */}
      <button onClick={() => setTab("marketplace")}>Marketplace</button>
      <button onClick={() => setTab("inventory")}>Inventory</button>
      <button onClick={() => setTab("bridging")}>Deposit and withdrawal</button>
      <button onClick={() => setTab("racetrack")}>Race Track</button>
      <br />
      <br />
      <br />
      {handleTabs()}
    </div>
  );
};

export default App;
