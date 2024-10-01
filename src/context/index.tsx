"use client"
import { BLOCKS_KEY, infoData, LAYOUT_KEY } from '@/constant/general';
import { Info, Blocks } from '@/types/data';
import { CallBackFunc } from '@/types/general';
import React, { useState, useContext } from "react";

interface ProviderProps {
  children: React.ReactNode;
}
export interface GlobalState {
  data: Info
  setData?: CallBackFunc
  tab?: string
  setTab?: CallBackFunc
  editingKey?: string
  setEditingKey?: CallBackFunc
  editingExtra?: string
  setEditingExtra?: CallBackFunc
  locationKey?: string
  setLocationKey?: CallBackFunc
}

const defaultContextState = {
  data: infoData
};
const GlobalContext = React.createContext<GlobalState>(defaultContextState);

export const Provider: React.FC<ProviderProps> = (
  props: ProviderProps
): JSX.Element => {
  const [data, setData] = useState(infoData);
  const [tab, setTab] = useState(BLOCKS_KEY);
  const [editingKey, setEditingKey] = useState<string>('');
  const [editingExtra, setEditingExtra] = useState<string>();
  const [locationKey, setLocationKey] = useState<string>();

  return (
    <GlobalContext.Provider
      value={{
        data,
        setData,
        tab,
        setTab,
        editingKey,
        setEditingKey,
        editingExtra,
        setEditingExtra,
        locationKey,
        setLocationKey
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export const useBlocksData = () => {
  const { data, setData } = useGlobalContext();

  const updateBlocks = (newBlocks: Partial<Blocks>) => {
    setData?.({
      ...data,
      blocks: {
        ...data.blocks,
        ...newBlocks
      }
    });
  };

  return { blocks: data.blocks, updateBlocks };
};

export default GlobalContext;
