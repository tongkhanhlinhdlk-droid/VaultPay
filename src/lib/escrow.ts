import { createWalletClient, custom } from "viem";
import { defineChain } from "viem";
import { VaultPayEscrowABI } from "./VaultPayEscrowABI";
import { VAULTPAY_ESCROW } from "./contracts";
const arcTestnet = defineChain({
  id: 5042002,
  name: "Arc Testnet",
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.arc.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "ArcScan",
      url: "https://testnet.arcscan.app",
    },
  },
});
declare global {
  interface Window {
    ethereum?: any;
  }
}
export async function createDeal(
  seller: `0x${string}`,
  amount: bigint
) {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  const walletClient = createWalletClient({
  chain: arcTestnet,
  transport: custom(window.ethereum),
});

  const [account] = await walletClient.requestAddresses();

  const hash = await walletClient.writeContract({
    address: VAULTPAY_ESCROW.address,
    abi: VaultPayEscrowABI,
    functionName: "createDeal",
    args: [
      seller,
      amount,
    ],
    account,
  });

  return hash;
}