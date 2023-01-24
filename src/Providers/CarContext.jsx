import React, { createContext, useContext, useState } from "react";


const CarDataContext = createContext(null);

const useCarDataContext = () => useContext(CarDataContext);

function CarDataProvider({ children }) {
const [speed, setSpeed] = useState(0)
  

  return (
    <CarDataContext.Provider
      value={{
       speed, 
       setSpeed
      }}>
      {children}
    </CarDataContext.Provider>
  );
}

export { CarDataProvider, useCarDataContext };
