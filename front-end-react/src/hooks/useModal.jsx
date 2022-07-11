import { createContext, useContext, useState } from "react";

const ModalContext = createContext(false)

export function ModalProvider({ children }) {
    
    const [modalOpen, setModalOpen] = useState(false)

    function openModal () {
        setModalOpen(true)
    }

    function closeModal () {
        setModalOpen(false)
    }

    return (
        <ModalContext.Provider value={{modalOpen, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal() {

    return useContext(ModalContext)
}