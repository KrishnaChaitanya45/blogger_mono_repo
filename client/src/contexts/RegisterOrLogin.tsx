"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

export const RegisterOrLoginContext = createContext<{
  registerOrLogin: "register" | "login";
  setRegisterOrLogin: Dispatch<SetStateAction<"login" | "register">>;
}>({} as any);

export default function RegisterOrLoginProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [registerOrLogin, setRegisterOrLogin] = useState<"register" | "login">(
    "register"
  );
  return (
    <RegisterOrLoginContext.Provider
      value={{ registerOrLogin, setRegisterOrLogin }}
    >
      {children}
    </RegisterOrLoginContext.Provider>
  );
}
