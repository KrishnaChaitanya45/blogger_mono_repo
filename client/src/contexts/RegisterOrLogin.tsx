"use client";

import { createContext, useState } from "react";

export const RegisterOrLoginContext = createContext({} as any);

export default function RegisterOrLoginProvider({ children }: any) {
  const [registerOrLogin, setRegisterOrLogin] = useState("register");
  return (
    <RegisterOrLoginContext.Provider
      value={{ registerOrLogin, setRegisterOrLogin }}
    >
      {children}
    </RegisterOrLoginContext.Provider>
  );
}
