import { ExtensionProvider } from "@multiversx/sdk-extension-provider";
import { NativeAuthClient } from "@multiversx/sdk-native-auth-client";

const provider = ExtensionProvider.getInstance();
const nativeAuthClient = new NativeAuthClient();
let isInitialized = false;

async function init() {
    if (!isInitialized) {
        await provider.init();
        isInitialized = true;
    }
}

async function connectWallet() {
    try {
        await init();
        const nativeAuthInitialPart = await nativeAuthClient.initialize();
        await provider.login({ token: nativeAuthInitialPart });
        
        const address = provider.account.address;
        const signature = provider.account.signature;
        const nativeAuthToken = nativeAuthClient.getToken(address, nativeAuthInitialPart, signature);
        
        document.getElementById('address').textContent = `Connected: ${address}`;
        document.getElementById('connectBtn').textContent = 'Disconnect';
        
        return { address, token: nativeAuthToken };
    } catch (error) {
        console.error('Failed to connect:', error);
        alert('Make sure you have MultiversX DeFi Wallet extension installed');
    }
}

async function disconnectWallet() {
    try {
        await provider.logout();
        document.getElementById('address').textContent = '';
        document.getElementById('connectBtn').textContent = 'Connect Wallet';
    } catch (error) {
        console.error('Failed to disconnect:', error);
    }
}

// Event Listeners
let isConnected = false;
document.getElementById('connectBtn').addEventListener('click', async () => {
    if (!isConnected) {
        await connectWallet();
        isConnected = true;
    } else {
        await disconnectWallet();
        isConnected = false;
    }
});
