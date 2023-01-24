import React, { createContext, useContext, useState } from 'react'

const TransferContext = createContext(null)

const useTransferContext = () => useContext(TransferContext)

function TransferProvider({ children }) {
  const [transferTokenId, setTransferTokenId] = useState('')

  return (
    <TransferContext.Provider
      value={{
        transferTokenId,
        setTransferTokenId,
      }}
    >
      {children}
    </TransferContext.Provider>
  )
}

export { TransferProvider, useTransferContext }
