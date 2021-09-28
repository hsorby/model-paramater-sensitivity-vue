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
  const config = {
    onUploadProgress: (progressEvent) => {
      callbackFunction(progressEvent, fileName)
    },
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await apiClient.post('upload', formData, config)

  return response.data
}

const storeParameterUncertainties = async (jsonData, modelFile, fileName, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      filename: fileName,
      model: modelFile,
    },
  }
  const response = await apiClient.post('store/parameter-uncertainties', jsonData, config)

  return response.data
}

const storeOutputParameters = async (jsonData, modelFile, fileName, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      filename: fileName,
      model: modelFile,
    },
  }
  const response = await apiClient.post('store/output-parameters', jsonData, config)

  return response.data
}

const listUserModels = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await apiClient.get('user/list-models', config)

  return response.data
}

const listUserOutputParameters = async (associated_model, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      model: associated_model,
    },
  }
  const response = await apiClient.get('user/list-output-parameters', config)

  return response.data
}

const listUserParameterUncertainties = async (associated_model, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      model: associated_model,
    },
  }
  const response = await apiClient.get('user/list-parameter-uncertainties', config)

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
  const response = await apiClient.get('info/model-parameters', config)

  return response.data
}

const fetchOutputParameters = async (associated_model, filename, token) => {
  const config = {
    params: {
      filename,
      model: associated_model,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await apiClient.get('info/output-parameters', config)

  return response.data
}

const fetchParameterUncertainties = async (associated_model, filename, token) => {
  const config = {
    params: {
      filename,
      model: associated_model,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await apiClient.get('info/parameter-uncertainty-distributions', config)

  return response.data
}

export {
  upload,
  listUserModels,
  fetchModelParameterInfo,
  fetchOutputParameters,
  fetchParameterUncertainties,
  storeOutputParameters,
  storeParameterUncertainties,
  listUserOutputParameters,
  listUserParameterUncertainties,
}
