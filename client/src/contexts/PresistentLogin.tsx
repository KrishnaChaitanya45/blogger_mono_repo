"use client";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function PersistentLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthContext);
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    if (auth.auth && !auth?.auth.accessToken) {
      verifyRefreshToken();
    } else {
      isMounted && setIsLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, []);
  return <>{children}</>;
}
