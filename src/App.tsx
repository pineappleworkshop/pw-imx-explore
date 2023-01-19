import "./App.css";
import { ImmutableMethodResults, ImmutableXClient, Link } from "@imtbl/imx-sdk";
import { Button, Stack, Typography } from "@mui/material/";
import { useEffect, useState } from "react";
import Marketplace from "./Marketplace";
import Inventory from "./Inventory";
import Racetrack from "./Racetrack";
import Chopshop from "./Chopshop";

require("dotenv").config();

const App = () => {
  // initialise Immutable X Link SDK
  const link = new Link(process.env.REACT_APP_SANDBOX_LINK_URL);
  const address = localStorage.getItem("address");

  // general
  const [tab, setTab] = useState("marketplace");
  const [wallet, setWallet] = useState<string | undefined>();
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
    localStorage.setItem("WALLET_ADDRESS", res?.address);
    setBalance(
      await client.getBalance({ user: res?.address, tokenAddress: "eth" })
    );
  }

  const disconnect = () => {
    localStorage.removeItem("WALLET_ADDRESS");
    setWallet(undefined);
  };

  const getBalanceToken = async (owner: string) => {
    return client?.listBalances({
      // user: owner,
      user: owner,
    });
  };

  useEffect(() => {
    const address = localStorage.getItem("WALLET_ADDRESS");
    if (address && client) {
      setWallet(address);
      // getBalance();
    }
  }, [client]);

  useEffect(() => {
    if (client) {
      getBalanceToken(String(wallet))
        .then((result) => {
          console.log(result);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [wallet, client]);

  function handleTabs() {
    if (client.address) {
      switch (tab) {
        case "inventory":
          if (wallet === undefined) return <div>Connect wallet</div>;
          return <Inventory client={client} link={link} wallet={wallet} />;
        case "racetrack":
          if (wallet === undefined) return <div>Connect wallet</div>;
          return <Racetrack client={client} link={link} wallet={wallet} />;
        case "chopshop":
          if (wallet === undefined) return <div>Connect wallet</div>;
          return <Chopshop client={client} link={link} wallet={wallet} />;
        // case "bridging":
        //   if (wallet === undefined) return <div>Connect wallet</div>;
        //   return <Bridging client={client} link={link} wallet={wallet} />;
        default:
          return <Marketplace client={client} link={link} />;
      }
    }
    return null;
  }

  return (
    <div className="App bg-img">
      <Stack direction="row" sx={{ p: 5, justifyContent: "space-around" }}>
        <Stack maxWidth={1 / 10}>
          <Button
            variant="contained"
            size="small"
            sx={{
              fontFamily: "Alegreya Sans SC",
              fontSize: "1rem",
              color: "black",
              backgroundColor: "cyan",
            }}
            onClick={() => setTab("marketplace")}
          >
            Marketplace
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              fontFamily: "Alegreya Sans SC",
              fontSize: "1rem",
              color: "black",
              backgroundColor: "cyan",
            }}
            onClick={() => setTab("inventory")}
          >
            Inventory
          </Button>
          {/* <button onClick={() => setTab("bridging")}>Deposit and withdrawal</button> */}
          <Button
            variant="contained"
            size="small"
            sx={{
              fontFamily: "Alegreya Sans SC",
              fontSize: "1rem",
              color: "black",
              backgroundColor: "cyan",
            }}
            onClick={() => setTab("racetrack")}
          >
            Race Track
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              fontFamily: "Alegreya Sans SC",
              fontSize: "1rem",
              color: "black",
              backgroundColor: "cyan",
            }}
            onClick={() => setTab("chopshop")}
          >
            Chop Shop
          </Button>
        </Stack>
        <Typography
          gutterBottom
          variant="h1"
          component="div"
          align="center"
          sx={{
            fontFamily: "Alegreya Sans SC",
            color: "red",
            fontSize: "5rem",
          }}
        >
          Rocket Car Garage
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            fontFamily: "Alegreya Sans SC",
            fontSize: "1rem",
            color: "black",
            backgroundColor: "cyan",
          }}
          onClick={wallet ? disconnect : linkSetup}
        >
          {wallet ? "Disconnect" : "Connect"}
        </Button>
      </Stack>
      <Typography
        gutterBottom
        variant="body2"
        component="div"
        align="center"
        sx={{
          fontFamily: "Alegreya Sans SC",
          color: "cyan",
          fontSize: ".75rem",
        }}
      >
        {` Active wallet: ${wallet}`}
      </Typography>
      <Typography
        gutterBottom
        variant="body2"
        component="div"
        align="center"
        sx={{
          fontFamily: "Alegreya Sans SC",
          color: "cyan",
          fontSize: ".75rem",
        }}
      >
        ETH balance (in wei): {balance?.balance?.toString()}
      </Typography>

      {/* <div>Active wallet: {wallet}</div>
      <div>ETH balance (in wei): {balance?.balance?.toString()}</div> */}

      <br />
      <br />
      <br />
      {handleTabs()}
    </div>
  );
};

export default App;
