'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  writeAnswerSchema,
  WriteAnswerSchemaFormData,
} from '@/config/validations/write-answer';

export const useWriteAnswerForm = () => {
  const form = useForm<WriteAnswerSchemaFormData>({
    resolver: zodResolver(writeAnswerSchema),
    mode: 'onBlur',
    defaultValues: {
      answer: '',
    },
  });

  return {
    form,
  };
};
