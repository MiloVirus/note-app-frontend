
import axios from 'axios';

const API_URL = 'http://localhost:3000/notes';


export const fetchNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};


export const createNote = async (noteData) => {
  try {
    const response = await axios.post(API_URL, noteData);
    return response.data;  
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};


export const updateNote = async (id, noteData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, noteData);
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};


export const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

