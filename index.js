const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require('@solana/web3.js')

const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log(`Wallet Balance: ${walletBalance}`)
    } catch(e) {
        console.error('Error: ', e)
    }
}

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction({signature: fromAirDropSignature})
        
    } catch (e) {
        console.error('Error: ', e)
    }
}

const main = async () => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}

main()



