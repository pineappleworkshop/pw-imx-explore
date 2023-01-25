import "./App.css";
import { CarDataProvider } from "./Providers/CarContext";
// import { Race } from "./Race";
import { TransferProvider } from './Contexts/TransferContext'
import { ImutableXProvider } from './Contexts/ImutableXContext'
import HeaderNav from './Components/HeaderNav'

require('dotenv').config()

const App = () => {
  return (
    <ImutableXProvider>
      <TransferProvider>
        <CarDataProvider>
          <div className="App bg-img">
            <HeaderNav />

            {/* <div>Active wallet: {wallet}</div>
      <div>ETH balance (in wei): {balance?.balance?.toString()}</div> */}
          </div>
        </CarDataProvider>
      </TransferProvider>
    </ImutableXProvider>
  )
}

export default App
