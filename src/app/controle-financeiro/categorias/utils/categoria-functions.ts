import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Categoria } from "./schema";

// Função para buscar todas as categorias
const fetchCategorias = async (): Promise<Categoria[]> => {
  try {
    const response = await axios.get<Categoria[]>("/api/categoria");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error;
  }
};

// Função para buscar uma categoria específica por ID
const fetchCategoriaById = async (id: number): Promise<Categoria> => {
  try {
    const response = await axios.get<Categoria>(`/api/categoria/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar categoria com ID ${id}:`, error);
    throw error;
  }
};

// Função para criar uma nova categoria
const useCreateCategoria = async (
  categoriaData: Categoria
): Promise<Categoria> => {
  try {
    const response = await axios.post<Categoria>(
      "/api/categoria",
      categoriaData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw error;
  }
};

// Função para atualizar uma categoria existente
const useUpdateCategoria = async (
  categoriaData: Categoria
): Promise<Categoria> => {
  try {
    const response = await axios.put<Categoria>(
      `/api/categoria`,
      categoriaData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    throw error;
  }
};

// Função para excluir uma categoria
const useDeleteCategoria = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/api/categoria`, { data: { id } });
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    throw error;
  }
};

// Custom hook para criar uma categoria
const createCategoria = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (categoriaData: Categoria) => useCreateCategoria(categoriaData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categorias"]);
      },
    }
  );
};

// Custom hook para atualizar uma categoria
const updateCategoria = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (categoriaData: Categoria) => useUpdateCategoria(categoriaData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categorias"]);
      },
    }
  );
};

// Custom hook para excluir uma categoria
const deleteCategoria = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => useDeleteCategoria(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["categorias"]);
    },
  });
};

export {
  createCategoria,
  deleteCategoria,
  fetchCategoriaById,
  fetchCategorias,
  updateCategoria,
  useCreateCategoria,
  useUpdateCategoria,
};
