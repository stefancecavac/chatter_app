import { QueryClient } from "@tanstack/react-query";

export const Qclient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
