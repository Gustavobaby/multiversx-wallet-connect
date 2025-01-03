import { NativeAuthServer } from "@multiversx/sdk-native-auth-server";

const server = new NativeAuthServer({
    apiUrl: 'https://api.multiversx.com',
    validateImpersonateUrl: 'https://extras-api.multiversx.com/impersonate/allowed',
    acceptedOrigins: ['*'], // En production, spécifiez vos domaines exacts
    maxExpirySeconds: 86400, // 24 heures
});

// Fonction pour décoder un token
export async function decodeAccessToken(accessToken) {
    const decoded = await server.decode(accessToken);
    return decoded;
}

// Fonction pour valider un token
export async function validateAccessToken(accessToken) {
    const result = await server.validate(accessToken);
    return result;
}
