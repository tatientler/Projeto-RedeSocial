import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { postUpdate } from "../../redux/action";
import { useState } from "react";
import { Spin } from "antd";
import { useModal } from "../../hooks/useModal";

export const Popover = ({ userId, postId, imgIdPost }) => {

    const { openModal, setModalType, setPostId } = useModal();

    const URL_POSTS = process.env.REACT_APP_URL_POSTS;

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const api = axios.create({
        baseURL: `https://back-end-python-tera.herokuapp.com`
    })

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
            if(imgIdPost != null) {
                api.delete(`/photos/photo/${imgIdPost}`)
                .then(() => {
                    toast.success('Post excluído com sucesso!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    dispatch(postUpdate(true));
                })
                .catch(() => {
                    toast.error('Erro ao excluir post!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
            } else {
                toast.success('Post excluído com sucesso!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(postUpdate(true));
            }
            setLoading(false)
        })
    }

    const allButtons = [
        <div key={postId + userId} className='popover-options'>
            <button
                type='button'
                onClick={() => {setModalType("edit"); setPostId(postId); openModal()}}
            >Editar post</button>
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

    const buttons = userId == localStorage.getItem('user') ? allButtons : noAllButtons

    return (
        <div className='popover'>
            <p>Opções</p>
            {buttons}
        </div>
    )
}