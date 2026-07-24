import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";
import { VaultPayEscrowABI } from "./VaultPayEscrowABI";
import { VAULTPAY_ESCROW } from "./contracts";
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
    chain: sepolia,
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