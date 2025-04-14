import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "appwrite";

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    projectId: "67f8c2a4002064253b8b",
    databaseId: "67fd1e110029420ea127",
    usersCollectionId: "67fd1e2f003e06e44ba4",
    ReportCollectionId: "67fd1e56002922c3819d",
    storageId: "67fd1f86000600d240c3",
};

// Initialize the Client
const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

// Initialize services
export const account = new Account(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);

// Helper function for file upload
async function uploadProfilePicture(file) {
    const uploadedFile = await storage.createFile(
        config.storageId,
        ID.unique(),
        file
    );
    return storage.getFilePreview(
        config.storageId,
        uploadedFile.$id,
        500,  // width
        500   // height
    );
}

export async function createUserAccount(userData, file) {
    try {
        // 1. Create account
        const newAccount = await account.create(
            ID.unique(),
            userData.email,
            userData.password,
            `${userData.surname} ${userData.otherNames}`
        );

        if (!newAccount?.$id) {
            throw new Error("Account creation failed");
        }

        // 2. Handle profile picture
        let profilePictureUrl;
        try {
            profilePictureUrl = file 
                ? await uploadProfilePicture(file)
                : avatars.getInitials(
                    `${userData.surname.charAt(0)}${userData.otherNames.charAt(0)}`,
                    200,
                    200
                );
        } catch (fileError) {
            console.warn('Profile picture upload failed:', fileError);
            profilePictureUrl = avatars.getInitials(
                `${userData.surname.charAt(0)}${userData.otherNames.charAt(0)}`,
                200,
                200
            );
        }

        // 3. Create user document with all attributes
        const newUser = await databases.createDocument(
            config.databaseId,
            config.usersCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: userData.email,
                surname: userData.surname,
                otherNames: userData.otherNames,
                phoneNumber: userData.phoneNumber,
                ndaNumber: userData.ndaNumber,
                department: userData.department,
                course: userData.course,
                level: userData.level,
                password: userData.password,
                profilePicture: profilePictureUrl,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
        );

        // 4. Create session - UPDATED METHOD NAME
        await account.createEmailPasswordSession(userData.email, userData.password);

        return newUser;
    } catch (error) {
        console.error('Appwrite error:', error);
        throw new Error(error.message || 'Failed to create account. Please try again.');
    }
}

export async function signIn(email, password) {
    try {
        // UPDATED METHOD NAME
        const session = await account.createEmailPasswordSession(email, password);
        
        // Verify session was created
        const currentSession = await account.getSession('current');
        if (!currentSession?.userId) {
            throw new Error('Session creation failed');
        }
        
        return session;
    } catch (error) {
        console.error('Appwrite signIn error:', error);
        throw new Error(
            error.message.includes('Invalid credentials') 
                ? 'Invalid email or password' 
                : 'Login failed. Please try again later.'
        );
    }
}


export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        if (!currentAccount?.$id) throw new Error("No active session");

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.usersCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser.documents.length) {
            throw new Error("User profile not found");
        }

        return currentUser.documents[0];
    } catch (error) {
        console.error('Appwrite getCurrentUser error:', error);
        throw new Error(error.message || 'Failed to fetch user data');
    }
}

// Additional useful functions
export async function signOut() {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error('Appwrite signOut error:', error);
        throw new Error('Failed to sign out');
    }
}

export async function updateUserProfile(userId, updates) {
    try {
        const updatedUser = await databases.updateDocument(
            config.databaseId,
            config.usersCollectionId,
            userId,
            {
                ...updates,
                updatedAt: new Date().toISOString()
            }
        );
        return updatedUser;
    } catch (error) {
        console.error('Appwrite updateUserProfile error:', error);
        throw new Error('Failed to update profile');
    }
}

/**
 * Submits a leave request to Appwrite
 * @param {Object} formData - All form data as key-value pairs
 * @param {File} [documentFile] - Optional attached file
 */
export async function submitLeaveRequest(formData, documentFile = null) {
    try {
      // 1. Upload document if provided
      let documentUrl = '';
      if (documentFile) {
        const uploadedFile = await storage.createFile(
          config.storageId,
          ID.unique(),
          documentFile
        );
        documentUrl = storage.getFilePreview(
          config.storageId,
          uploadedFile.$id
        );
      }
  
      // 2. Create leave request document with all form data
      const leaveRequest = await databases.createDocument(
        config.databaseId,
        config.ReportCollectionId,
        ID.unique(),
        {
          ...formData, // Spread all form fields
          documentUrl: documentUrl,
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      );
  
      return leaveRequest;
    } catch (error) {
      console.error('Leave request submission error:', error);
      throw new Error('Failed to submit request. Please try again.');
    }
  }