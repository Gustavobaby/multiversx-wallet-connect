import { ExtensionProvider } from "@multiversx/sdk-extension-provider";

const provider = ExtensionProvider.getInstance();

await provider.init();

// Simple login
const address = await provider.login();
console.log(address);
console.log(provider.account);

// Logout
await provider.logout();

// Native authentication login (recommended)
const nativeAuthInitialPart = await nativeAuthClient.initialize();
await provider.login({ token: nativeAuthInitialPart });

const address = provider.account.address;
const signature = provider.account.signature;
const nativeAuthToken = nativeAuthClient.getToken(address, nativeAuthInitialPart, signature);
