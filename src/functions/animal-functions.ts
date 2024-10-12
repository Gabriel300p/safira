import axios from "axios";

// Defina a interface para o tipo Animal
export interface Animal {
  id: string;
  nome: string;
  sexo: "MACHO" | "FÊMEA" | "INDEFINIDO";
  porte: "PEQUENO" | "MÉDIO" | "GRANDE";
  castrado: boolean;
  vacinado: boolean;
  adestrado: boolean;
  obito: boolean;
  microchip: boolean;
  adotado: boolean;
  racaId: number;
  userId: number;
  tutorId: number;
  observacao: string;
  imagem: string;
  created_at: string;
  updated_at: string;
}

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
    const response = await axios.post<Animal>("/animal", animalData);
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
    const response = await axios.put<Animal>(`/animal/${id}`, animalData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar animal com ID ${id}:`, error);
    throw error;
  }
};

// Função para deletar um animal
const deleteAnimal = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/animal/${id}`);
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
