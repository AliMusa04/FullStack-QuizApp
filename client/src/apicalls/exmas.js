const { default: axiosInstance } = require(".");

// add exam

export const addExam = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/exams/add', payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// GET ALL EXMAS
export const getAllExams = async () => {
  try {
    const response = await axiosInstance.post('/api/exams/get-all-exams')
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// GET EXAM BY ID
export const getExamById = async(payload) => {
  try {
    const response = await axiosInstance.post('/api/exams/get-exam-by-id', payload);
    return response.data
  } catch (error) {
    return error.response.data;
  }
}