import create from 'zustand';

// 상태의 타입 정의
interface QuestionTypeStore {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

// Zustand 스토어 생성
const useQuestionTypeStore = create<QuestionTypeStore>((set) => ({
  selectedCategory: '',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useQuestionTypeStore;
