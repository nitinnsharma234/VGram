import {Client, Account, Databases, Storage, Avatars} from 'appwrite';

        
const STORAGE_COLLECTION_ID='665714ed00175adb0324';
const POST_COLLECTION_ID='66580b4c00268d26ed45';
const SAVES_COLLECTION_ID='66580bc4000aed8851a2';
const USER_COLLECTION_ID='66580b87001c12c497a3';
const DATABASE_COLLECTION_ID='66571549003416cf67c7';

export const appwriteConfig={
    projectId: '66570b1000144655f43b',
    url:'https://cloud.appwrite.io/v1',
    databaseId:DATABASE_COLLECTION_ID,
    storageId:STORAGE_COLLECTION_ID,
    userCollectionId:USER_COLLECTION_ID,
    postCollectionId:POST_COLLECTION_ID,
    savesCollectionId:SAVES_COLLECTION_ID
    
    // url:

}
console.log("Config File is" ,import.meta.env.VITE_APPWRITE_URL);
export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url)
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
