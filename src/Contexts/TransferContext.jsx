import React, { createContext, useContext, useState } from 'react'

const TransferContext = createContext(null)

const useTransferContext = () => useContext(TransferContext)

function TransferProvider({ children }) {
  const [transferTokenId, setTransferTokenId] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')

  return (
    <TransferContext.Provider
      value={{
        transferTokenId,
        setTransferTokenId,
        recipientAddress,
        setRecipientAddress,
      }}
    >
      {children}
    </TransferContext.Provider>
  )
}

export { TransferProvider, useTransferContext }
