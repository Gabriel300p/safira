import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Financeiro } from "./schema";

// Função para buscar todos os registros financeiros
const fetchFinanceiros = async (): Promise<Financeiro[]> => {
  try {
    const response = await axios.get<Financeiro[]>("/api/financeiro");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar registros financeiros:", error);
    throw error;
  }
};

// Função para buscar um registro financeiro específico por ID
const fetchFinanceiroById = async (id: number): Promise<Financeiro> => {
  try {
    const response = await axios.get<Financeiro>(`/api/financeiro/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar registro financeiro com ID ${id}:`, error);
    throw error;
  }
};

// Função para criar um novo registro financeiro
const useCreateFinanceiro = async (
  financeiroData: Financeiro
): Promise<Financeiro> => {
  try {
    const response = await axios.post<Financeiro>(
      "/api/financeiro",
      financeiroData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar registro financeiro:", error);
    throw error;
  }
};

// Função para atualizar um registro financeiro existente
const useUpdateFinanceiro = async (
  financeiroData: Financeiro
): Promise<Financeiro> => {
  try {
    const response = await axios.put<Financeiro>(
      `/api/financeiro/`,
      financeiroData
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar registro financeiro:`, error);
    throw error;
  }
};

// Função para deletar um registro financeiro existente
const useDeleteFinanceiro = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/api/financeiro`, {
      data: { id },
    });
  } catch (error) {
    console.error(`Erro ao deletar registro financeiro:`, error);
    throw error;
  }
};

// Custom hook para atualizar um registro financeiro existente
const updateFinanceiro = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (financeiroData: Financeiro) => useUpdateFinanceiro(financeiroData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["financeiros"]);
      },
    }
  );
};

// Custom hook para criar um novo registro financeiro
const createFinanceiro = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (financeiroData: Financeiro) => useCreateFinanceiro(financeiroData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["financeiros"]);
      },
    }
  );
};

// Custom hook para deletar um registro financeiro
const deleteFinanceiro = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => useDeleteFinanceiro(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["financeiros"]);
    },
  });
};

export {
  createFinanceiro,
  deleteFinanceiro,
  fetchFinanceiroById,
  fetchFinanceiros,
  updateFinanceiro,
  useCreateFinanceiro,
  useUpdateFinanceiro,
};
