import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';
import * as FileSystem from 'expo-file-system';

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    Platform: "com.axi.profile",
    projectId: "66ccc3a900313d47dd28",
    databaseId: "66cccef400397bf143f2",
    userCollectionId: "66cccf1e003c4f856aa3",
    imagesCollectionId: "66cccf4b000856fc1918",
    videoCollectionId: "66cccf3d0033a4c6eacb",
    storageId: "66ccd352001f88f45871",
    journalsId: "66da2843002f70ca52c7",
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
const storage = new Storage(client)


export const uploadDocument = async (journalName: string, fields: Array<{ type: 'text' | 'image'; id?: string; value?: string; file?: any }>) => {
    console.log("fields : ", fields);
    try {
        // Upload images to Appwrite storage and replace `value` with file ID for image type fields
        const updatedFields = await Promise.all(fields.map(async field => {
            if (field.type === 'image' && field.value && field.file) {
                const { mimeType, ...rest } = field.file;
                const assets = { type: mimeType, ...rest }
                // Upload the image to Appwrite storage
                const uploadedFile = await storage.createFile(
                    appwriteConfig.storageId,   // Your bucket ID
                    ID.unique(),               // Unique ID for each file
                    assets               // The name of the file
                );
                // Update the `value` field to the file ID
                console.log("inside 2.4");
                return { ...field, value: uploadedFile.$id };
            }
            return field;  // For non-image fields, return as is
        }));

        // Get the current user
        const response = await getCurrentUser();
        if (!response) {
            throw new Error('User not authenticated');
        }

        // Stringify the updated fields array
        const fieldsString = JSON.stringify(updatedFields);
        console.log("updated fields : ", updatedFields);
        // Create a new document in the Appwrite database
        const newJournal = await databases.createDocument(
            appwriteConfig.databaseId,   // Your database ID
            appwriteConfig.journalsId,   // Your collection ID
            ID.unique(),                 // Unique ID for the document
            {
                name: journalName,
                fields: fieldsString,    // Storing the updated fields with image file IDs
                users: response.$id       // Store the user ID
            }
        );

        if (!newJournal) {
            throw new Error('Error creating new journal');
        }

        console.log("upload successful");
        return newJournal;

    } catch (e: any) {
        console.error('Error uploading document:', e);
        throw new Error(e.message);
    }
};

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








