import axios from "axios";
import { Raca } from "./schema";

// Função para buscar todos os animais
const fetchRacas = async (): Promise<Raca[]> => {
  try {
    const response = await axios.get<Raca[]>("/api/animal");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar animais:", error);
    throw error;
  }
};

export { fetchRacas };
