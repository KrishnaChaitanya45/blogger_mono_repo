"use client";

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { tRPC } from "../../trpc";
import { httpBatchLink } from "@trpc/client";
let token: string;
export function setToken(newToken: string) {
  /**
   * You can also save the token to cookies, and initialize from
   * cookies above.
   */
  token = newToken;
}

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    tRPC.createClient({
      links: [
        httpBatchLink({
          url: `http://localhost:5000/api/trpc`,
          headers() {
            return {
              authorization: token,
            };
          },
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            });
          },
        }),
      ],
    })
  );

  return (
    <tRPC.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </tRPC.Provider>
  );
};

export default Providers;
