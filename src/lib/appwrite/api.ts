import { INewUser } from "@/types";
import { ID,Query } from 'appwrite'
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAcount(user: INewUser) {
    try {

        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl

        })
        return newUser;
    }
    catch (error) {
        console.log(error);
    }
}


export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;

}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        )
        return newUser;

    } catch (error) {
        console.log(error)
    }
}


export async function singInAccount(user: {
    email: string;
    password: string

}) {
    try {

        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session;

    } catch (error) {
        console.log(error)
    }
}


export async function getCurrentUser() {
    try {

        const currAccount = await account.get();

        if (!currAccount) throw Error;

        const currUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId',currAccount.$id)]
        )
        if(!currUser) throw Error;

        return currUser.documents[0];

    } catch (error) {
        console.log(error)
    }
}




