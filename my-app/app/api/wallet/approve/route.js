import { NextResponse } from "next/server";
import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import SocialRecoveryWalletAbi from "@/contracts/SocialRecoveryWallet.json";
export async function POST(req) {
  const { privateKey, contractAddress } = await req.json();
  const signer = privateKeyToAccount(privateKey);
  const client = createPublicClient({ chain: polygon, transport: http() });
  const wallet = new client.Contract(
    SocialRecoveryWalletAbi,
    contractAddress,
    signer
  );
  const receipt = await wallet.approveRecovery();
  return NextResponse.json({ receipt });
}
