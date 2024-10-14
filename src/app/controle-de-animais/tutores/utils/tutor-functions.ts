import axios from "axios";
import { Tutor } from "./schema";

// Função para buscar todos os animais
const fetchTutors = async (): Promise<Tutor[]> => {
  try {
    const response = await axios.get<Tutor[]>("/api/tutor");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os tutores:", error);
    throw error;
  }
};

export { fetchTutors };
