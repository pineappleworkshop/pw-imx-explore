import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import { ImmutableMethodResults, ImmutableXClient, Link } from '@imtbl/imx-sdk'

interface ImutableXProviderContext {
  link: any
  wallet: any
  setWallet: any
  balance: any
  setBalance: any
  client: any
  setClient: any
  disconnect: any
  linkSetup: any
}

const defaultState = {
  link: null,
  wallet: null,
  setWallet: null,
  balance: null,
  setBalance: null,
  client: null,
  setClient: null,
  disconnect: null,
  linkSetup: null,
}

interface Props {
  children: ReactNode
}

const ImutableXContext = createContext<ImutableXProviderContext>(defaultState)

const useImutableXContext = () => useContext(ImutableXContext)

function ImutableXProvider(props: Props) {
  const { children } = props
  const link = new Link(process.env.REACT_APP_SANDBOX_LINK_URL)
  const address = localStorage.getItem('address')
  const [wallet, setWallet] = useState()

  const [balance, setBalance] =
    useState<ImmutableMethodResults.ImmutableGetBalanceResult>(Object)
  const [client, setClient] = useState<ImmutableXClient>(Object)

  useEffect(() => {
    buildIMX()
  }, [])

  // initialise an Immutable X Client to interact with apis more easily
  async function buildIMX() {
    const publicApiUrl: string = process.env.REACT_APP_SANDBOX_ENV_URL ?? ''
    setClient(await ImmutableXClient.build({ publicApiUrl }))
  }

  // register and/or setup a user
  async function linkSetup(): Promise<void> {
    const res: any = await link.setup({})
    setWallet(res?.address)
    localStorage.setItem('address', res?.address)
    localStorage.setItem('WALLET_ADDRESS', res?.address)
    setBalance(
      await client.getBalance({ user: res?.address, tokenAddress: 'eth' })
    )
  }

  const disconnect = () => {
    localStorage.removeItem('WALLET_ADDRESS')
    setWallet(undefined)
  }

  const getBalanceToken = async (owner: string) => {
    return client?.listBalances({
      // user: owner,
      user: owner,
    })
  }

  useEffect(() => {
    const address: any = localStorage.getItem('WALLET_ADDRESS')
    if (address && client) {
      setWallet(address)
      // getBalance();
    }
  }, [client])

  useEffect(() => {
    if (client) {
      getBalanceToken(String(wallet))
        .then((result) => {
          console.log(result)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [wallet, client])

  return (
    <ImutableXContext.Provider
      value={{
        link,
        wallet,
        setWallet,
        balance,
        setBalance,
        client,
        setClient,
        disconnect,
        linkSetup,
      }}
    >
      {children}
    </ImutableXContext.Provider>
  )
}

export { ImutableXProvider, useImutableXContext }
