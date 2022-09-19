import { Spin } from "antd";
import { postUpdate } from "../../redux/action";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";

export const Popover = ({ userId, postId }) => {

    const { openModal, setModalType, setPostId } = useModal();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const URL_POSTS = process.env.REACT_APP_URL_POSTS;

    async function postDelete() {
        setLoading(true)
        const token = localStorage.getItem('token')

        await fetch(`${URL_POSTS}/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(() => {
            toast.success('Post deletado com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
        });
            setLoading(false)
            dispatch(postUpdate(true))
        })
        .catch(() => {
            toast.error('Erro ao deletar post', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
        });
            setLoading(false)
        })
    }

    const allButtons = [
        <div key={postId + userId} className='popover-options'>
            <button
                type='button'
                onClick={() => {
                    setModalType("edit");
                    setPostId(postId);
                    openModal()
                }}
            >Editar post
            </button>
            <button
                className={`popover_option-delete ${loading ? 'disabled' : ''}`}
                type='button'
                onClick={() => postDelete()}>
                    {loading ? <Spin /> : "Excluir post"}
            </button>
            <button type='button'>Compartilhar</button>
        </div>
    ]

    const noAllButtons = [
        <div key={postId + userId} className='popover-options'>
            <button type='button'>Compartilhar</button>
        </div>
    ]

    const buttons = userId === localStorage.getItem('user') ? allButtons : noAllButtons

    return (
        <div className='popover'>
            <p>Opções</p>
            {buttons}
        </div>
    )
}