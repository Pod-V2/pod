import { createContext, useState } from 'react';

const initialState = {
  allListings: []
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {

  const [allListings, setAllListings] = useState([])

  return (
    <GlobalContext.Provider value={{allListings: allListings, setAllListings: setAllListings}}>
      {children}
    </GlobalContext.Provider>
  )
}

