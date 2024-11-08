import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Tutor } from "./schema";

// Função para buscar todos os animais
const fetchTutors = async (): Promise<Tutor[]> => {
  try {
    const response = await axios.get<Tutor[]>("/api/tutor");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar animais:", error);
    throw error;
  }
};

// Função para buscar um Tutor específico por ID
const fetchTutorById = async (id: number): Promise<Tutor> => {
  try {
    const response = await axios.get<Tutor>(`/tutor/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar Tutor com ID ${id}:`, error);
    throw error;
  }
};

// Função para criar um novo Tutor
const useCreateTutor = async (tutorData: Tutor): Promise<Tutor> => {
  try {
    const response = await axios.post<Tutor>("/api/tutor", tutorData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar Tutor:", error);
    throw error;
  }
};

// Função para atualizar um Tutor existente
const useUpdateTutor = async (tutorData: Tutor): Promise<Tutor> => {
  try {
    const response = await axios.put<Tutor>(`/api/tutor/`, tutorData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar Tutor:`, error);
    throw error;
  }
};

const useDeleteTutor = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/api/tutor`, {
      data: { id },
    });
  } catch (error) {
    console.error(`Erro ao atualizar Tutor:`, error);
    throw error;
  }
};

// Custom hook para atualizar um Tutor existente
const updateTutor = () => {
  // const updateTutor = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation((tutorData: Tutor) => useUpdateTutor(tutorData), {
    onSuccess: () => {
      queryClient.invalidateQueries(["tutors"]);
      // onClose();
      // toast({
      //   title: "Tutor atualizado com sucesso",
      //   description: "As alterações foram salvas.",
      //   variant: "success",
      // });
    },
    // onError: (error) => {
    //   console.error("Error updating tutor:", error);
    //   toast({
    //     title: "Erro ao atualizar tutor",
    //     description: "Por favor, tente novamente.",
    //     variant: "error",
    //   });
    // },
  });
};

const createTutor = ({ onClose }: { onClose: () => void }) => {
  // const createTutor = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation((tutorData: Tutor) => useCreateTutor(tutorData), {
    onSuccess: () => {
      queryClient.invalidateQueries(["tutors"]);
      // onClose();
      // toast({
      //   title: "Tutor criado com sucesso",
      //   description: "O tutor foi adicionado à lista.",
      //   variant: "success",
      // });
    },
    // onError: (error) => {
    //   console.error("Error creating tutor:", error);
    //   toast({
    //     title: "Erro ao criar tutor",
    //     description: "Por favor, tente novamente.",
    //     variant: "error",
    //   });
    // },
  });
};

const deleteTutor = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => useDeleteTutor(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["tutors"]);
    },
  });
};

export {
  createTutor,
  deleteTutor,
  fetchTutorById,
  fetchTutors,
  updateTutor,
  useCreateTutor,
  useUpdateTutor,
};
