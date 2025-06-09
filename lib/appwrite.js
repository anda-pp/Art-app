import { Client, Databases, Account } from "react-native-appwrite";

const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("684715ac001175c7179d") // Replace with your project ID
  .setPlatform('com.andapp.artapp');


export const account = new Account(client);
export const databases = new Databases(client);
