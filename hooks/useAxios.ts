// Import axios and types for TypeScript
import axios, { AxiosRequestConfig, AxiosError } from "axios";

// Flag to track if token refresh is already happening
let isRefreshing = false;

// Queue to hold requests that fail while token is refreshing
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}[] = [];

// Helper to process the queued requests once refresh is done
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error); // If refresh failed, reject queued requests
    } else {
      prom.resolve(token as string); // If refresh succeeded, retry queued requests with new token
    }
  });
  failedQueue = []; // Clear the queue
};

// Function to get the current access token from localStorage
function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

// Function to get the current refresh token from localStorage
function getRefreshToken(): string | null {
  return localStorage.getItem("refreshToken");
}

// Function to refresh the access token using the refresh token
async function refreshAuthToken(): Promise<string> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");

  // Call the API to get a new access token
  const response = await axios.post("http://localhost:8000/token/refresh/", {
    refresh: refreshToken,
  });

  const newAccessToken = response.data.access;

  // Save the new access token to storage
  localStorage.setItem("accessToken", newAccessToken);

  return newAccessToken; // Return the new token for use
}

// Create the Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/", // Your API base URL
  headers: {
    "Content-Type": "application/json", // Set content type for all requests
  },
});

// 👉 Add access token to every request before it is sent
api.interceptors.request.use(async (config) => {
  const token = getAccessToken(); // Get the current token
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// 👉 Handle response errors like 401 (unauthorized due to expired token)
api.interceptors.response.use(
  (response) => response, // If response is OK, just return it
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    }; // Cast to allow _retry flag

    // If the error is 401 Unauthorized and request is not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing token, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // Once refresh is done, attach new token and retry request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err); // If refresh fails
          });
      }

      // Mark request as already retried
      originalRequest._retry = true;
      isRefreshing = true; // Start refreshing

      try {
        const newToken = await refreshAuthToken(); // Try refreshing token
        processQueue(null, newToken); // Process queued requests with new token
        console.log("token refresh ");

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`; // Attach new token to original request
        }
        return api(originalRequest); // Retry original request
      } catch (err) {
        processQueue(err, null); // If refresh fails, reject queued requests
        return Promise.reject(err); // Also reject this request
      } finally {
        isRefreshing = false; // Refresh process done
      }
    }

    return Promise.reject(error); // If error not 401, just reject it
  }
);

// Export the configured axios instance
export default function useAxios() {
  return api;
}
