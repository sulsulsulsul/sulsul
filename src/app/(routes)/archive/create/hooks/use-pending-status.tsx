'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react'

interface PendingContextType {
  isPending: boolean
  setIsPending: (pending: boolean) => void
}

const PendingContext = createContext<PendingContextType | undefined>(undefined)

export const usePendingStatus = () => {
  const context = useContext(PendingContext)
  if (!context) {
    throw new Error('usePendingStatus must be used within a PendingProvider')
  }
  return context
}

export const PendingProvider = ({ children }: { children: ReactNode }) => {
  const [isPending, setIsPending] = useState(false)

  return (
    <PendingContext.Provider value={{ isPending, setIsPending }}>
      {children}
    </PendingContext.Provider>
  )
}
