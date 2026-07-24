import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  try {
    const deals = await prisma.deal.findMany({
      orderBy: {
        dealId: "desc",
      },
    });

    return NextResponse.json(deals);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch deals" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const deal = await prisma.deal.create({
      data: {
        dealId: body.dealId,
        buyer: body.buyer,
        seller: body.seller,
        amount: body.amount,
        status: body.status,
        txHash: body.txHash,
      },
    });

    return NextResponse.json(deal);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save deal" },
      { status: 500 }
    );
  }
}
export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const deal = await prisma.deal.update({
      where: {
        dealId: body.dealId,
      },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json(deal);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update deal" },
      { status: 500 }
    );
  }
}