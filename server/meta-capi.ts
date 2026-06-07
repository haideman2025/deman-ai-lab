/**
 * Meta Conversions API (CAPI) Integration
 * Server-side event tracking for demanlab.ai
 * 
 * Pixel ID: 3411058209059766
 * Access Token: EAAgqvja50agBRhYoa6sXXA6ODI0ZAZCXULrpM5Xm1S60HYBqp96EFDicKiJ9pqebDiOgkeZBiU6ElP1QHTfFyIgtQFAbcW5utUSXPlF4Eol3RwpoVUVqN47fvq5ZCqz0nw1yX7IvDfVFxeARRQXwJtcGnvZBUyeFXn1d5LKRR08J5RTwPSBkvvlhRp2BktHlofQZDZD
 */

import axios, { AxiosError } from 'axios';
import crypto from 'crypto';

const PIXEL_ID = '3411058209059766';
const ACCESS_TOKEN = 'EAAgqvja50agBRhYoa6sXXA6ODI0ZAZCXULrpM5Xm1S60HYBqp96EFDicKiJ9pqebDiOgkeZBiU6ElP1QHTfFyIgtQFAbcW5utUSXPlF4Eol3RwpoVUVqN47fvq5ZCqz0nw1yX7IvDfVFxeARRQXwJtcGnvZBUyeFXn1d5LKRR08J5RTwPSBkvvlhRp2BktHlofQZDZD';
const API_VERSION = 'v18.0';

/**
 * Hash PII (Personally Identifiable Information) for Meta CAPI
 * Meta requires hashed data for privacy compliance
 */
function hashPII(value: string): string {
  if (!value) return '';
  return crypto
    .createHash('sha256')
    .update(value.toLowerCase().trim())
    .digest('hex');
}

/**
 * Send event to Meta Conversions API
 */
export async function sendMetaEvent(event: {
  event_name: string; // 'Purchase', 'AddToCart', 'ViewContent', 'Lead', 'CompleteRegistration', etc.
  event_time: number; // Unix timestamp
  user_data?: {
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
  };
  custom_data?: {
    value?: number;
    currency?: string;
    content_name?: string;
    content_type?: string;
    content_id?: string;
  };
  event_source_url?: string;
  action_source?: string; // 'website', 'app', 'phone_call', 'chat', 'physical_store', 'system_generated'
}) {
  try {
    // Hash user data for privacy
        const user_data: Record<string, string> = event.user_data
      ? {
          em: event.user_data.email ? hashPII(event.user_data.email) : '',
          ph: event.user_data.phone ? hashPII(event.user_data.phone) : '',
          fn: event.user_data.first_name ? hashPII(event.user_data.first_name) : '',
          ln: event.user_data.last_name ? hashPII(event.user_data.last_name) : '',
          ct: event.user_data.city ? hashPII(event.user_data.city) : '',
          st: event.user_data.state ? hashPII(event.user_data.state) : '',
          zp: event.user_data.zip_code ? hashPII(event.user_data.zip_code) : '',
          country: event.user_data.country ? hashPII(event.user_data.country) : '',
        }
      : {};

    // Remove empty values
    Object.keys(user_data).forEach(
      (key) => !user_data[key] && delete user_data[key]
    );

    const payload: Record<string, any> = {
      data: [
        {
          event_name: event.event_name,
          event_time: event.event_time,
          action_source: event.action_source || 'website',
          user_data,
          custom_data: event.custom_data || {},
          event_source_url: event.event_source_url,
        },
      ],
    };

    if (process.env.META_TEST_EVENT_CODE) {
      payload.test_event_code = process.env.META_TEST_EVENT_CODE;
    }

    const response = await axios.post(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`,
      payload,
      {
        params: {
          access_token: ACCESS_TOKEN,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('[Meta CAPI] Event sent successfully:', {
      event_name: event.event_name,
      response_data: response.data,
    });

    return response.data as Record<string, any>;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[Meta CAPI] Error sending event:', {
      event_name: event.event_name,
      error: errorMessage,
    });
    throw error;
  }
}

/**
 * Track workflow purchase
 */
export async function trackWorkflowPurchase(data: {
  user_email?: string;
  workflow_name: string;
  workflow_id: string;
  purchase_amount: number;
  currency?: string;
}) {
  const event_time = Math.floor(Date.now() / 1000);

  return sendMetaEvent({
    event_name: 'Purchase',
    event_time,
    user_data: {
      email: data.user_email,
    },
    custom_data: {
      value: data.purchase_amount,
      currency: data.currency || 'VND',
      content_name: data.workflow_name,
      content_type: 'workflow',
      content_id: data.workflow_id,
    },
    action_source: 'website',
  });
}

/**
 * Track workflow view
 */
export async function trackWorkflowView(data: {
  user_email?: string;
  workflow_name: string;
  workflow_id: string;
}) {
  const event_time = Math.floor(Date.now() / 1000);

  return sendMetaEvent({
    event_name: 'ViewContent',
    event_time,
    user_data: {
      email: data.user_email,
    },
    custom_data: {
      content_name: data.workflow_name,
      content_type: 'workflow',
      content_id: data.workflow_id,
    },
    action_source: 'website',
  });
}

/**
 * Track add to cart (workflow)
 */
export async function trackAddToCart(data: {
  user_email?: string;
  workflow_name: string;
  workflow_id: string;
  price: number;
  currency?: string;
}) {
  const event_time = Math.floor(Date.now() / 1000);

  return sendMetaEvent({
    event_name: 'AddToCart',
    event_time,
    user_data: {
      email: data.user_email,
    },
    custom_data: {
      value: data.price,
      currency: data.currency || 'VND',
      content_name: data.workflow_name,
      content_type: 'workflow',
      content_id: data.workflow_id,
    },
    action_source: 'website',
  });
}

/**
 * Track user registration
 */
export async function trackRegistration(data: {
  user_email?: string;
  user_phone?: string;
  first_name?: string;
  last_name?: string;
}) {
  const event_time = Math.floor(Date.now() / 1000);

  return sendMetaEvent({
    event_name: 'CompleteRegistration',
    event_time,
    user_data: {
      email: data.user_email,
      phone: data.user_phone,
      first_name: data.first_name,
      last_name: data.last_name,
    },
    action_source: 'website',
  });
}

/**
 * Track lead (contact form submission)
 */
export async function trackLead(data: {
  user_email?: string;
  user_phone?: string;
  first_name?: string;
  last_name?: string;
  message?: string;
}) {
  const event_time = Math.floor(Date.now() / 1000);

  return sendMetaEvent({
    event_name: 'Lead',
    event_time,
    user_data: {
      email: data.user_email,
      phone: data.user_phone,
      first_name: data.first_name,
      last_name: data.last_name,
    },
    custom_data: {
      content_name: data.message || 'Contact Form',
    },
    action_source: 'website',
  });
}

/**
 * Track learning path enrollment
 */
export async function trackLearningEnrollment(data: {
  user_email?: string;
  path_name: string;
  path_id: string;
  price: number;
  currency?: string;
}) {
  const event_time = Math.floor(Date.now() / 1000);

  return sendMetaEvent({
    event_name: 'Purchase',
    event_time,
    user_data: {
      email: data.user_email,
    },
    custom_data: {
      value: data.price,
      currency: data.currency || 'VND',
      content_name: data.path_name,
      content_type: 'learning_path',
      content_id: data.path_id,
    },
    action_source: 'website',
  });
}

/**
 * Test Meta CAPI connection
 */
export async function testMetaConnection() {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}`,
      {
        params: {
          access_token: ACCESS_TOKEN,
          fields: 'id,name,created_time',
        },
      }
    );

    console.log('[Meta CAPI] Connection test successful:', response.data);
    return { success: true, data: response.data as Record<string, any> };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[Meta CAPI] Connection test failed:', errorMessage);
    return { success: false, error: errorMessage as string };
  }
}
