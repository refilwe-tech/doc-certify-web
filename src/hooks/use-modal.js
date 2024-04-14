import { useState } from "react";

export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => setIsOpen(!isOpen);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return {
    isOpen,
    toggle,
    closeModal,
    openModal,
  };
};
