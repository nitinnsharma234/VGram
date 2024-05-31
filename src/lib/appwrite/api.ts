import { INewPost, INewUser } from "@/types";
import { ID,Query ,ImageGravity} from 'appwrite'
import { account, appwriteConfig, avatars, databases,storage} from "./config";

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
        console.log("Session Creation",error)
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

export async function signOutAccount(){
    try{
        const session = await account.deleteSession("current");
        return session;
    }
    catch(error){

    }
}

export async function createPost(post: INewPost) {
    try {
      // Upload file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
  
      if (!uploadedFile) throw Error;
  
      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      // Convert tags into array
      const tags = post.tags?.replace('/ /g', "").split(",") || [];
  
      // Create post
      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        ID.unique(),
        {
          creator: post.userId,
          caption: post.caption,
          imageUrl: fileUrl,
          imageId: uploadedFile.$id,
          location: post.location,
          tags: tags,
        }
      );
  
      if (!newPost) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }
  export async function uploadFile(file: File) {
    try {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
      );
  
      return uploadedFile;
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== GET FILE URL
  export function  getFilePreview(fileId: string) {
    try {
      const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== DELETE FILE
  export async function deleteFile(fileId: string) {
    try {
      await storage.deleteFile(appwriteConfig.storageId, fileId);
  
      return { status: "ok" };
    } catch (error) {
      console.log(error);
    }
  }
    