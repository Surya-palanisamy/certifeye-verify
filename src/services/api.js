const API_BASE_URL = 'http://localhost:5000/api';

export const uploadCertificate = async (file) => {
  const formData = new FormData();
  formData.append('certificate', file);

  const response = await fetch(`${API_BASE_URL}/upload-certificate`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload certificate');
  }

  return response.json();
};

export const getCertificate = async (id) => {
  const response = await fetch(`${API_BASE_URL}/certificate/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch certificate');
  }

  return response.json();
};

export const getAllCertificates = async () => {
  const response = await fetch(`${API_BASE_URL}/certificates`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch certificates');
  }

  return response.json();
};

export const getStats = async () => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }

  return response.json();
};