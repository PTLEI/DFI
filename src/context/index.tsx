"use client"
import { infoData } from '@/constant/data';
import { Info } from '@/types/data';
import React, { useState } from "react";

interface ProviderProps {
  children: React.ReactNode;
}
export interface GlobalState {
  data: Info
}

const voidFunction = () => {
  //
};

const defaultContextState = {
  data: infoData
};
const GlobalContext = React.createContext<GlobalState>(defaultContextState);

export const Provider: React.FC<ProviderProps> = (
  props: ProviderProps
): JSX.Element => {
  const [data, setData] = useState(infoData);

  return (
    <GlobalContext.Provider
      value={{data}}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
