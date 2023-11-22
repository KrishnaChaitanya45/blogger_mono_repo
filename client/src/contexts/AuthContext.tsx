"use client";
import { USER_TYPE } from "@/types/USER";
import { createContext, useState } from "react";

type AuthState = {
  user: USER_TYPE | undefined;
  accessToken: string | undefined;
};

export const AuthContext = createContext<{
  auth: AuthState | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  editable: Boolean;
  setEditable: React.Dispatch<React.SetStateAction<Boolean>>;
}>({
  auth: null,
  setAuth: () => {},
  editable: false,
  setEditable: () => {},
});

export default function AuthContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [auth, setAuth] = useState<AuthState>({
    user: undefined,
    accessToken: undefined,
  });
  const [editable, setEditable] = useState<Boolean>(false);
  return (
    <AuthContext.Provider value={{ auth, setAuth, editable, setEditable }}>
      {children}
    </AuthContext.Provider>
  );
}
