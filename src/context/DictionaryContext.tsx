import { useState } from "react";
import { createContext } from "react";
import * as React from "react";
interface IUser {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}
const initialState = {
  user: "hello",
  setUser: () => {},
};
const Context = createContext<IUser>(initialState);

export const Provider = ({ children }: any | null | undefined) => {
  const [user, setUser] = useState<string>("name");
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export default Context;
