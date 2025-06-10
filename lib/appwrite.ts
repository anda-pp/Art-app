import { Account, Client } from "react-native-appwrite";

export const client = new Client();
client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!) // Replace with your project ID
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);


export const account = new Account(client);
