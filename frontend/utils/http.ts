import { API_CONFIG } from '@/lib/config/api';

const http = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(API_CONFIG.BASE_URL + url, {
      method: 'GET',
      headers: API_CONFIG.DEFAULT_HEADERS,
    });
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
      }
      throw new Error(errorMessage);
    }
    return response.json() as Promise<T>;
  },

  post: async <T>(url: string, data: any): Promise<T> => {
    const response = await fetch(API_CONFIG.BASE_URL + url, {
      method: 'POST',
      headers: API_CONFIG.DEFAULT_HEADERS,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
      }
      throw new Error(errorMessage);
    }
    return response.json() as Promise<T>;
  },

  put: async <T>(url: string, data: any): Promise<T> => {
    const response = await fetch(API_CONFIG.BASE_URL + url, {
      method: 'PUT',
      headers: API_CONFIG.DEFAULT_HEADERS,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
      }
      throw new Error(errorMessage);
    }
    return response.json() as Promise<T>;
  },

  patch: async <T>(url: string, data: any): Promise<T> => {
    const response = await fetch(API_CONFIG.BASE_URL + url, {
      method: 'PATCH',
      headers: API_CONFIG.DEFAULT_HEADERS,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
      }
      throw new Error(errorMessage);
    }
    return response.json() as Promise<T>;
  },

  delete: async <T>(url: string): Promise<T> => {
    const response = await fetch(API_CONFIG.BASE_URL + url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
      }
      throw new Error(errorMessage);
    }
    return response.json() as Promise<T>;
  },
};

export default http;