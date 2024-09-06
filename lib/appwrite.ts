import { PRIVATE_APPWRITE_API_KEY } from '@/env';
import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    Platform: "com.axi.profile",
    projectId: "66ccc3a900313d47dd28",
    databaseId: "66cccef400397bf143f2",
    userCollectionId: "66cccf1e003c4f856aa3",
    imagesCollectionId: "66cccf4b000856fc1918",
    videoCollectionId: "66cccf3d0033a4c6eacb",
    storageId: "66ccd352001f88f45871",
    journalsId: "66da28ef000dca8b98d1",
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
const storage = new Storage(client);

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


const createBlobFromUri = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
};

export const uploadJournalPost = async (fields: Array<{ type: 'text' | 'image'; value?: string }>, journalName: string) => {
    const formData = new FormData();

    // Add metadata
    formData.append('title', journalName);

    // Add text fields and image blobs
    const imagePromises: Promise<void>[] = [];

    fields.forEach((field, index) => {
        if (field.type === 'text' && field.value) {
            formData.append(`text_${index}`, field.value);
        } else if (field.type === 'image' && field.value) {
            imagePromises.push(
                createBlobFromUri(field.value!).then((blob) => {
                    formData.append(`image_${index}`, blob, `image_${index}.jpg`);
                }).catch(error => {
                    console.error('Error creating blob:', error);
                })
            );
        }
    });

    // Wait for all image blobs to be created and appended
    await Promise.all(imagePromises);

    // Send form data to Appwrite
    try {
        const currentUser = await getCurrentUser();
        const sessionToken = currentUser.$sessionId;

        const response = await fetch(`${appwriteConfig.endpoint}/databases/${appwriteConfig.databaseId}/collections/${appwriteConfig.journalsId}/documents`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionToken}`, // Use session token for authentication
                'Content-Type': 'multipart/form-data',
                'X-Appwrite-Project': appwriteConfig.projectId,
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Upload successful:', result);
    } catch (error: any) {
        console.error('Upload failed:', error.message);
    }
};





