import { create } from 'zustand';

import { WriteAnswerSchemaFormData } from '@/config/validations/write-answer';

interface AnswerStore {
  formData: WriteAnswerSchemaFormData | null;
  setFormData: (data: WriteAnswerSchemaFormData) => void;
}

export const useAnswerStore = create<AnswerStore>((set) => ({
  formData: null,
  setFormData: (data) => set({ formData: data }),
}));
