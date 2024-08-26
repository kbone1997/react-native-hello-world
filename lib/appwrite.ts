import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    Platform: "com.axi.profile",
    projectId: "66ccc3a900313d47dd28",
    databaseId: "66cccef400397bf143f2",
    userCollectionId: "66cccf1e003c4f856aa3",
    imagesCollectionId: "66cccf4b000856fc1918",
    videoCollectionId: "66cccf3d0033a4c6eacb",
    storageId: "66ccd352001f88f45871",
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.Platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email: string, password: string, username: string) => {
    try {
        const response = await account.create(ID.unique(), email, password, username)
        if (!response) {
            throw new Error
        }
        const avatarUrl = avatar.getInitials(username)

        await signIn(email, password);
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountID: response.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser

    } catch (e: any) {
        throw new Error(e);
    }
}

export const signIn = async (email: string, password: string) => {
    try {
        const response = await account.createEmailPasswordSession(email, password)
        if (!response) {
            throw new Error
        }
        return response;

    } catch (e: any) {
        throw new Error(e);
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await account.get()
        if (!response) {
            throw new Error
        }
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountID", response.$id)]
        )

        if (!currentUser) {
            throw new Error
        }

        return currentUser.documents[0]

    } catch (e: any) {
        throw new Error(e);
    }
}




