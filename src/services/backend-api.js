import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_HOST_API,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 60000,
  // Cap the maximum content length we'll accept to 10MBs, just in case
  // This should be matched on the production server as well!
  maxContentLength: 10 * 1024 * 1024,
})

const upload = async (formData, fileName, callbackFunction, token) => {
  const response = await apiClient.post('upload', formData, {
    onUploadProgress: (progressEvent) => {
      callbackFunction(progressEvent, fileName)
    },
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const listUserModels = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await apiClient.get('user-models', config)

  return response.data
}

const fetchModelParameterInfo = async (filename, token) => {
  const config = {
    params: {
      filename,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await apiClient.get('parameter-info', config)

  return response.data
}

export { upload, listUserModels, fetchModelParameterInfo }
