import axios from "axios";
import { Animal } from "./schema";

// Função para buscar todos os animais
const fetchAnimals = async (): Promise<Animal[]> => {
  try {
    const response = await axios.get<Animal[]>("/api/animal");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar animais:", error);
    throw error;
  }
};

// Função para buscar um animal específico por ID
const fetchAnimalById = async (id: number): Promise<Animal> => {
  try {
    const response = await axios.get<Animal>(`/animal/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar animal com ID ${id}:`, error);
    throw error;
  }
};

// Função para criar um novo animal
const createAnimal = async (
  animalData: Omit<Animal, "id">
): Promise<Animal> => {
  try {
    const response = await axios.post<Animal>("/api/animal", animalData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar animal:", error);
    throw error;
  }
};

// Função para atualizar um animal existente
const updateAnimal = async (
  id: number,
  animalData: Partial<Animal>
): Promise<Animal> => {
  try {
    const response = await axios.put<Animal>(`/api/animal`, {
      id,
      ...animalData,
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar animal com ID ${id}:`, error);
    throw error;
  }
};

// Função para deletar um animal
const deleteAnimal = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/api/animal`, {
      data: { id },
    });
  } catch (error) {
    console.error(`Erro ao deletar animal com ID ${id}:`, error);
    throw error;
  }
};

export {
  createAnimal,
  deleteAnimal,
  fetchAnimalById,
  fetchAnimals,
  updateAnimal,
};
