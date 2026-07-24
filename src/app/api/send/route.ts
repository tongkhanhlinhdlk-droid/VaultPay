import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encryption";

import {
  createWalletClient,
  http,
  parseEther,
} from "viem";

import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";


export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }


    const body = await req.json();

    const { to, amount } = body;


    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        wallet: true,
      },
    });


    if (!dbUser?.wallet) {
      return NextResponse.json(
        { error: "Wallet not found" },
        { status: 404 }
      );
    }


    if (!dbUser.wallet.encryptedPrivateKey) {
      return NextResponse.json(
        { error: "Private key missing" },
        { status: 400 }
      );
    }


    const privateKey = decrypt(
      dbUser.wallet.encryptedPrivateKey
    );


    const account = privateKeyToAccount(
      privateKey as `0x${string}`
    );


    const walletClient = createWalletClient({
      account,
      chain: sepolia,
      transport: http(),
    });


    const hash = await walletClient.sendTransaction({
  to,
  value: parseEther(amount),
});


// Save transaction to database
await prisma.transaction.create({
  data: {
    userId: dbUser.id,
    from: account.address,
    to,
    amount,
    hash,
    status: "success",
  },
});


return NextResponse.json({
  success: true,
  hash,
});


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Transaction failed",
      },
      {
        status: 500,
      }
    );
  }
}