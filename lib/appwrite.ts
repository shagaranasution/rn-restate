import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import { Account, Avatars, Client, OAuthProvider } from 'react-native-appwrite';

export const config = {
  platform: 'com.sfn.restate',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  porjectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.porjectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login(): Promise<boolean> {
  try {
    const redirectUri = Linking.createURL('/');

    const response = account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) throw new Error('Failed to create OAuth2 Token');

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== 'success')
      throw new Error('Failed to create OAuth2 Token');

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();

    if (!secret || !userId) throw new Error('Failed to create OAuth2 Token');

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error('Failed to create session');

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout(): Promise<boolean> {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const result = await account.get();

    if (!result.$id) return null;

    const userAvatar = avatar.getInitialsURL(result.name).toString();

    return {
      ...result,
      avatar: userAvatar,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
