"use client";
import { axiosInstance } from "@/api/axios";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { tRPC } from "../../trpc";
import { useQueryClient } from "@tanstack/react-query";

export default function useRefreshToken() {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const refreshTokenQuery = tRPC.refreshToken.useQuery();

  const refresh = async () => {
    try {
      const { data } = await refreshTokenQuery.refetch();
      console.log("INITIAL DATA", refreshTokenQuery.data);
      if (data?.success) {
        console.log("INSIDE THE REFRESH", data?.user);
        if (authCtx !== null) {
          let prevAuth = { ...authCtx };
          prevAuth = {
            auth: {
              accessToken: data?.accessToken,
              user: data?.user,
            },
            setAuth: authCtx.setAuth,
          };

          prevAuth.auth && authCtx?.setAuth(prevAuth.auth);
          return data?.accessToken;
        }
      } else {
        throw new Error("Refresh token failed");
      }
    } catch (error: any) {
      console.log(error);
      authCtx?.setAuth({ user: undefined, accessToken: undefined });
      router.push("/auth");
    }
  };

  return refresh;
}
