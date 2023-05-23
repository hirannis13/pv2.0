import { createContext, useState } from "react";

const initialState = { openModal: false };

const ModalContext = createContext(initialState);

function ModalProvider({ children }) {
  const [openModal, setOpenModal] = useState(false);

  const updateModalState = (newState) => setOpenModal(newState); // Rename the update function

  return (
    <ModalContext.Provider value={{ openModal, updateModalState }}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalProvider, ModalContext };
