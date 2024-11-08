import { Tutor } from "./schema";

export interface TutoresFormProps {
  tutorId?: number;
  onClose: () => void;
  tutorDataClick?: Tutor;
}
