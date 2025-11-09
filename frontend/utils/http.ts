import { API_CONFIG } from '@/lib/config/api';
import { cookies } from './cookies';

interface CustomRequestInit extends RequestInit {
  params?: Record<string, any>;
}

const http = {
  get: async <T>(url: string, options?: CustomRequestInit): Promise<T> => {
    const token = cookies.get('token');
    const headers = {
      ...API_CONFIG.DEFAULT_HEADERS,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    };

    let requestUrl = API_CONFIG.BASE_URL + url;
    if (options?.params) {
      const queryParams = new URLSearchParams(options.params).toString();
      requestUrl += `?${queryParams}`;
    }

    const response = await fetch(requestUrl, {
      method: 'GET',
      ...options,
      headers,
    });
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        } else {
          errorMessage = await response.text();
        }
      } catch (e) {
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }
    return response.json() as Promise<T>;
  },

  post: async <T>(url: string, data: any, options?: RequestInit): Promise<T> => {
    const token = cookies.get('token');
    const headers = {
      ...API_CONFIG.DEFAULT_HEADERS,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    };

    const response = await fetch(API_CONFIG.BASE_URL + url, {
      method: 'POST',
      ...options,
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        } else {
          errorMessage = await response.text();
        }
      } catch (e) {
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }
    return response.json() as Promise<T>;
  },

  put: async <T>(url: string, data: any, options?: RequestInit): Promise<T> => {
    const token = cookies.get('token');
    const headers = {
      ...API_CONFIG.DEFAULT_HEADERS,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    };

    const response = await fetch(API_CONFIG.BASE_URL + url, {
      method: 'PUT',
      ...options,
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        } else {
          errorMessage = await response.text();
        }
      } catch (e) {
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }
    return response.json() as Promise<T>;
  },

  patch: async <T>(url: string, data: any, options?: RequestInit): Promise<T> => {
    const token = cookies.get('token');
    const headers = {
      ...API_CONFIG.DEFAULT_HEADERS,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    };

    const response = await fetch(API_CONFIG.BASE_URL + url, {
      method: 'PATCH',
      ...options,
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        } else {
          errorMessage = await response.text();
        }
      } catch (e) {
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }
    return response.json() as Promise<T>;
  },

  delete: async <T>(url: string, options?: RequestInit): Promise<T> => {
    const token = cookies.get('token');
    const headers = {
      ...API_CONFIG.DEFAULT_HEADERS,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    };

    const response = await fetch(API_CONFIG.BASE_URL + url, {
      method: 'DELETE',
      ...options,
      headers,
    });
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        } else {
          errorMessage = await response.text();
        }
      } catch (e) {
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }
    return response.json() as Promise<T>;
  },
};

export default http;