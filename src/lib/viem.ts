import { createPublicClient, http } from "viem";

const arcTestnet = {
  id: 5042002,
  name: "Arc Testnet",
  nativeCurrency: {
    name: "Arc",
    symbol: "ARC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        process.env.ARC_RPC_URL!,
      ],
    },
  },
};

export const publicClient = createPublicClient({
  chain: arcTestnet,
  transport: http(),
});