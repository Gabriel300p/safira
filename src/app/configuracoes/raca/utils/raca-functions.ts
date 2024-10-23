import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Raca } from "./schema";

// Função para buscar todos os animais
const fetchRacas = async (): Promise<Raca[]> => {
  try {
    const response = await axios.get<Raca[]>("/api/raca");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar racas:", error);
    throw error;
  }
};

// Função para buscar um animal específico por ID
const fetchRacaById = async (id: number): Promise<Raca> => {
  try {
    const response = await axios.get<Raca>(`/raca/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar raca com ID ${id}:`, error);
    throw error;
  }
};

// Função para criar um novo animal
const createRaca = async (animalData: Omit<Raca, "id">): Promise<Raca> => {
  try {
    const response = await axios.post<Raca>("/api/raca", animalData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar animal:", error);
    throw error;
  }
};

// Função para atualizar um animal existente
const useUpdateRaca = async (animalData: Raca): Promise<Raca> => {
  try {
    const response = await axios.put<Raca>(`/api/raca/`, animalData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar animal:`, error);
    throw error;
  }
};

const useDeleteRaca = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/api/raca`, {
      data: { id },
    });
  } catch (error) {
    console.error(`Erro ao atualizar raca:`, error);
    throw error;
  }
};

// Custom hook para atualizar um animal existente
const updateRaca = () => {
  const queryClient = useQueryClient();
  return useMutation((animalData: Raca) => useUpdateRaca(animalData), {
    onSuccess: () => {
      queryClient.invalidateQueries(["racas"]);
    },
  });
};

const deleteAnimal = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => useDeleteRaca(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["racas"]);
    },
  });
};

export { createRaca, deleteAnimal, fetchRacaById, fetchRacas, updateRaca };
