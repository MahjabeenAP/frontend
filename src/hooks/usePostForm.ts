import { useState, useCallback } from 'react';
import { CreatePostData } from '../types/post';

export const usePostForm = (initialState: CreatePostData) => {
  const [formData, setFormData] = useState<CreatePostData>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.text_prompt.trim()) {
      newErrors.text_prompt = 'Text prompt is required';
    }
    
    if (!['photo', 'reel'].includes(formData.post_type)) {
      newErrors.post_type = 'Invalid post type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
  }, [initialState]);

  return {
    formData,
    errors,
    setFormData,
    handleChange,
    validate,
    resetForm,
  };
};
