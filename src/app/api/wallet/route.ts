import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { encrypt } from "@/lib/encryption";
export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const clerkId = user.id;

    // tìm User trong database
    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    // kiểm tra đã có wallet chưa
    const existingWallet = await prisma.wallet.findUnique({
      where: {
        userId: dbUser.id,
      },
    });

    if (existingWallet) {
      return NextResponse.json(existingWallet);
    }

    const privateKey = generatePrivateKey();


const account = privateKeyToAccount(privateKey);


const encryptedPrivateKey = encrypt(privateKey);


const wallet = await prisma.wallet.create({
  data: {
    userId: dbUser.id,
    address: account.address,
    encryptedPrivateKey,
    chain: "ethereum",
  },
});


return NextResponse.json(wallet);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}