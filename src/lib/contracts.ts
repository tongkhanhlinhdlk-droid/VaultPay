import { VaultPayEscrowABI } from "@/lib/VaultPayEscrowABI";

export const VAULTPAY_ESCROW_ADDRESS =
  "0xab0925424d3cd874a142bd57b82945947bec6247";

export const VAULTPAY_ESCROW = {
  address: VAULTPAY_ESCROW_ADDRESS,
  abi: VaultPayEscrowABI,
} as const;