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
      // Clear any existing sessions first
      try {
          await account.deleteSession('current');
      } catch (clearError) {
          console.log('No session to clear');
      }

      const session = await account.createEmailPasswordSession(email, password);
      
      // Verify session was created
      const currentAccount = await account.get();
      if (!currentAccount?.$id) {
          throw new Error('Session creation failed - no account ID');
      }
      
      return currentAccount; // Return the account instead of session
  } catch (error) {
      console.error('Appwrite signIn error:', error);
      let errorMsg = 'Login failed. Please try again later.';
      
      if (error.message.includes('Invalid credentials')) {
          errorMsg = 'Invalid email or password';
      } else if (error.type === 'general_network_request_failed') {
          errorMsg = 'Network error. Please check your connection.';
      }
      
      throw new Error(errorMsg);
  }
}


export async function getCurrentUser() {
  try {
      // First verify we have a valid session
      const currentAccount = await account.get();
      if (!currentAccount?.$id) {
          throw new Error("No active session");
      }

      // Then get user document
      const currentUser = await databases.listDocuments(
          config.databaseId,
          config.usersCollectionId,
          [Query.equal("accountId", currentAccount.$id)]
      );

      if (!currentUser.documents.length) {
          throw new Error("User profile not found");
      }

      return {
          ...currentUser.documents[0],
          // Ensure all required fields are present
          $id: currentUser.documents[0].$id,
          accountId: currentAccount.$id
      };
  } catch (error) {
      console.error('Appwrite getCurrentUser error:', error);
      
      // If it's a network error, throw a more specific message
      if (error.type === 'general_network_request_failed') {
          throw new Error('Network error. Please check your connection.');
      }
      
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
// In appwrite.js


export async function submitLeaveRequest(formData, documentFile = null, userId) {
  try {
    const requestData = {
      ...formData,
      userId: userId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    if (documentFile) {
      const uploadedFile = await storage.createFile(
        config.storageId,
        ID.unique(),
        documentFile
      );
      requestData.userId = uploadedFile.$id;
      // requestData.documentName = documentFile.name;
      requestData.documentUrl = storage.getFileDownload(
        config.storageId,
        uploadedFile.$id
      );
    }

    return await databases.createDocument(
      config.databaseId,
      config.ReportCollectionId,
      ID.unique(),
      requestData
    );
  } catch (error) {
    console.error('Leave request submission error:', error);
    throw new Error('Failed to submit request. Please try again.');
  }
}

/**
 * Robust file URL retrieval
 */
export async function getFileDownloadUrl(fileId) {
  if (!fileId) throw new Error("No file ID provided");
  
  try {
    return storage.getFileDownload(
      config.storageId,
      fileId
    );
  } catch (error) {
    console.error('File URL retrieval failed:', error);
    throw new Error('Document is currently unavailable');
  }
}
  // Add these new functions to your existing Appwrite service

/**
 * Get all leave requests (for admin)
 */
export async function getAllLeaveRequests() {
    try {
      const requests = await databases.listDocuments(
        config.databaseId,
        config.ReportCollectionId,
        [Query.orderDesc('createdAt')]
      );
      return requests.documents;
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      throw new Error('Failed to fetch leave requests');
    }
  }
  
  /**
   * Update request status (admin only)
   */
  export async function updateLeaveStatus(requestId, newStatus, adminNote = '') {
    try {
      const updatedRequest = await databases.updateDocument(
        config.databaseId,
        config.ReportCollectionId,
        requestId,
        {
          status: newStatus,
          adminNote,
          updatedAt: new Date().toISOString()
        }
      );
      return updatedRequest;
    } catch (error) {
      console.error('Error updating leave status:', error);
      throw new Error('Failed to update leave status');
    }
  }
  
  /**
   * Get user's leave requests
   */
  export async function getUserLeaveRequests(userId) {
    try {
      const requests = await databases.listDocuments(
        config.databaseId,
        config.ReportCollectionId,
        [Query.equal('userId', userId), Query.orderDesc('createdAt')]
      );
      return requests.documents;
    } catch (error) {
      console.error('Error fetching user leave requests:', error);
      throw new Error('Failed to fetch your leave requests');
    }
  }