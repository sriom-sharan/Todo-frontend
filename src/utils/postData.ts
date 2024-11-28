import {axiosInstance} from '../../axiosInstance'

export const postData = async (route:string,data:any) => {
//   console.log('Request Data:', data); // Logging the data being sent
  try {
    // Sending data directly http://localhost:3000/auth/login
    console.log(route,data);
    
    const response = await axiosInstance.post(route,data);
    
    // Log the response data
    console.log('Response Data:', response.data);
    
    return response.data; // Return the response data
  } catch (error:any) {
    // Improved error handling
    if (error.response) {
      // The server responded with a status code outside the range of 2xx
      console.log(error);
      
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      console.error('Error Response Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error Request:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error Message:', error.message);
    }
    console.error('Error Config:', error.config);
  }
};
export const putData = async (route:string,data:any) => {
//   console.log('Request Data:', data); // Logging the data being sent
  try {
    // Sending data directly http://localhost:3000/auth/login
    console.log(route,data);
    
    const response = await axiosInstance.put(route,data);
    
    // Log the response data
    console.log('Response Data:', response.data);
    
    return response.data; // Return the response data
  } catch (error:any) {
    // Improved error handling
    if (error.response) {
      // The server responded with a status code outside the range of 2xx
      console.log(error);
      
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      console.error('Error Response Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error Request:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error Message:', error.message);
    }
    console.error('Error Config:', error.config);
  }
};