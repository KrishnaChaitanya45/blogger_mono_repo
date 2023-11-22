import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "../server/src/trpc/trpc.router";
export const tRPC = createTRPCReact<AppRouter>({});
