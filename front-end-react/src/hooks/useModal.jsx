import { createContext, useContext, useState } from "react";

const ModalContext = createContext(false)

export function ModalProvider({ children }) {
    
    const [modalOpen, setModalOpen] = useState(false)
    const [modalType, setModalType] = useState('')
    const [postId, setPostId] = useState('')

    function openModal () {
        setModalOpen(true)
    }

    function closeModal () {
        setModalOpen(false)
    }

    return (
        <ModalContext.Provider value={{modalOpen, postId, setPostId, modalType, setModalType, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal() {

    return useContext(ModalContext)
}