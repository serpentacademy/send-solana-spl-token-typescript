const web3 =  require('@solana/web3.js');
import {  PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, getMint, createMint} from "@solana/spl-token";

const spl = require('@solana/spl-token');
const { publicKey } = require('@project-serum/anchor/dist/cjs/utils');

(async () => {
    // Connect to cluster
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

    // connect to a previously generated wallet
    let secretKey = Uint8Array.from("YOUR SECRET KEY");
  
    const myKeypair = web3.Keypair.fromSecretKey(secretKey);

    const fromWallet = myKeypair;


    // Generate a new wallet to receive newly minted token
    const walletTo = "YOUR WALLET"
    const destPublicKey = new web3.PublicKey(walletTo);
    const destMint: PublicKey = new web3.PublicKey("YOUR TOKEN ADDRESS");

const tokenM = new web3.PublicKey("YOUR TOKEN ADDRESS")
//console.log(toWallet.publicKey)
    // Create new token mint


   



    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromTokenAccount = await spl.getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        tokenM,
        fromWallet.publicKey
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await spl.getOrCreateAssociatedTokenAccount(connection, fromWallet, tokenM, destPublicKey);

    // Mint 1 new token to the "fromTokenAccount" account we just created
    let signature = await spl.mintTo(
        connection,
        fromWallet,
        destMint,
        fromTokenAccount.address,
        fromWallet.publicKey,
        3*web3.LAMPORTS_PER_SOL
    );
    console.log('mint tx:', signature);

    // Transfer the new token to the "toTokenAccount" we just created
    signature = await spl.transfer(
        connection,
        fromWallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        10*web3.LAMPORTS_PER_SOL
    );
})();
