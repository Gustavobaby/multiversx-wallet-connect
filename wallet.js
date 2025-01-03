import { ExtensionProvider } from "@multiversx/sdk-extension-provider";
import { Transaction, SignableMessage } from "@multiversx/sdk-core";

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

// Signing transactions
const firstTransaction = new Transaction({ /* transaction details */ });
const secondTransaction = new Transaction({ /* transaction details */ });
await provider.signTransactions([firstTransaction, secondTransaction]);

// Signing messages
const message = new SignableMessage({
    message: Buffer.from("hello")
});
await provider.signMessage(message);
console.log(message.toJSON());
