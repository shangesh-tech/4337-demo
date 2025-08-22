import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import { User } from "@/lib/models/User";
import { newMnemonic, createEncrypted } from "@/lib/utils/mnemonic";
import { privateKeyToAccount } from "viem/accounts";
// import { SocialRecoveryWallet__factory } from '@/contracts/factories';
import { createPublicClient, http } from "viem";
import { polygon, sepolia } from "viem/chains";
export async function POST(req) {
  const { userId, password, guardians, threshold } = await req.json();
  await connectDB();
  const user = await User.findById(userId);
  const mnemonic = newMnemonic();
  const encrypted = createEncrypted(mnemonic, password);
  user.mnemonic = encrypted;
  await user.save();
  const seed = mnemonic; // derive private key from mnemonic using ethers/bip39 off-chain
//   const signer = privateKeyToAccount(/* derive first key from seed */);
  const client = createPublicClient({ chain: sepolia, transport: http() });
  // Deploy contract
  // const factory = new SocialRecoveryWallet__factory(signer);
  // const wallet = await factory.deploy(guardians, threshold);
  // return NextResponse.json({ contract: wallet.address, mnemonic });
  return NextResponse.json({ mnemonic });
}
