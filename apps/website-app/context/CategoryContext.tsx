'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context state
interface CategoryContextType {
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
}

// Create the context with a default value
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// Define the provider component
export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  return (
    <CategoryContext.Provider value={{ selectedCategoryId, setSelectedCategoryId }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to use the context
export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
