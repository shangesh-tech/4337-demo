import { NextResponse } from "next/server";
import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";

export async function POST(req) {
  const { mnemonic, to, value } = await req.json();
  // derive private key
  const signer = privateKeyToAccount(/* derive from mnemonic */);
  const client = createPublicClient({ chain: polygon, transport: http() });
  const hash = await client.sendTransaction({
    account: signer,
    to,
    value: BigInt(value),
  });
  return NextResponse.json({ hash });
}
