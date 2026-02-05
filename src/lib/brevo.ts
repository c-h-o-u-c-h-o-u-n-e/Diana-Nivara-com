/**
 * Brevo API integration utilities
 */

export interface BrevoContact {
  email: string;
  attributes?: {
    FNAME?: string;
    LNAME?: string;
    [key: string]: any;
  };
  listIds?: number[];
  updateEnabled?: boolean;
}

export interface BrevoResponse {
  id?: number;
  code?: string;
  message?: string;
}

/**
 * Subscribe an email to the Brevo mailing list
 */
export async function subscribeToBrevo(email: string): Promise<{ success: boolean; message?: string }> {
  // Use environment variables
  const apiKey = import.meta.env.VITE_BREVO_API_KEY;
  const listId = import.meta.env.VITE_BREVO_LIST_ID;

  // Log to verify values are available
  console.log("API Key available:", !!apiKey);
  console.log("List ID available:", !!listId);
  console.log("Environment:", import.meta.env.MODE);

  if (!apiKey) {
    console.error('Brevo API key not configured');
    return { success: false, message: 'Configuration error' };
  }

  if (!listId) {
    console.error('Brevo list ID not configured');
    return { success: false, message: 'Configuration error' };
  }

  try {
    const contact: BrevoContact = {
      email: email.trim(),
      attributes: {
        FNAME: '',
        LNAME: '',
      },
      listIds: [parseInt(listId)],
      updateEnabled: false, // Don't update if contact already exists
    };

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(contact),
    });

    if (response.ok) {
      return { success: true };
    }

    // Handle specific error cases
    if (response.status === 400) {
      const errorData: BrevoResponse = await response.json();
      
      // Contact already exists - this is actually a success case
      if (errorData.code === 'duplicate_parameter') {
        return { success: true };
      }
      
      return { 
        success: false, 
        message: errorData.message || 'Invalid email address' 
      };
    }

    // Handle other HTTP errors
    return { 
      success: false, 
      message: `Server error: ${response.status}` 
    };

  } catch (error) {
    console.error('Brevo subscription error:', error);
    return { 
      success: false, 
      message: 'Network error. Please try again.' 
    };
  }
}
