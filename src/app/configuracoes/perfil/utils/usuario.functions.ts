import axios from "axios";
import { Usuario } from "./schema";

const fetchUsuarios = async (): Promise<Usuario[]> => {
  try {
    const response = await axios.get<Usuario[]>("/api/animal");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar animais:", error);
    throw error;
  }
};

export { fetchUsuarios };
