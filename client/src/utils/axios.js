import axios from "axios";

let accessToken = "";
export function setAccessToken(token) {
  accessToken = token;
}

const appInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

appInstance.interceptors.request.use(function (config) {
  if (accessToken !== "") {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export async function postRequest(domain, body, headers) {
  try {
    const response = await appInstance.post(domain, body, headers);
    if (response.status < 300 && response.status > 199) {
      return {
        data: response.data,
        status: response.status,
      };
    }
    throw new Error(response);
  } catch (error) {
    return {
      message: error.message,
      error: error?.response?.data,
      status: error?.response?.status,
    };
  }
}

export async function getRequest(domain, headers) {
  try {
    const response = await appInstance.get(domain, headers);
    if (response.status < 300 && response.status > 199) {
      return {
        data: response.data,
        status: response.status,
      };
    }
    throw new Error(response);
  } catch (error) {
    return {
      message: error.message,
      error: error?.response?.data,
      status: error?.response?.status,
    };
  }
}

export async function putRequest(domain, body, headers) {
  try {
    const response = await appInstance.put(domain, body, headers);
    if (response.status < 300 && response.status > 199) {
      return {
        data: response.data,
        status: response.status,
      };
    }
    throw new Error(response);
  } catch (error) {
    return {
      message: error.message,
      error: error?.response?.data,
      status: error?.response?.status,
    };
  }
}
