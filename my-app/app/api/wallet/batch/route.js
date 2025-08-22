import { NextResponse } from "next/server";
import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import multicallAbi from "@/contracts/Multicall.json";
export async function POST(req) {
  const { mnemonic, calls } = await req.json();
  const signer = privateKeyToAccount(/* derive */);
  const client = createPublicClient({ chain: polygon, transport: http() });
  const multicall = new client.Contract(
    multicallAbi,
    process.env.MULTICALL_ADDRESS,
    signer
  );
  const tx = await multicall.aggregate(calls);
  return NextResponse.json({ hash: tx.hash });
}
