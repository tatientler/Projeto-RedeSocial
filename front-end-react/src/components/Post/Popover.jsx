import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { postUpdate } from "../../redux/action";

export const Popover = ({ userId, postId, imgIdPost }) => {

    const updatePost = useSelector(state => state);
    console.log(updatePost)

    const dispatch = useDispatch();

    const api = axios.create({
        baseURL: `http://127.0.0.1:5000/photos`
    })

    function postDelete() {

        const token = localStorage.getItem('token')

        fetch(`http://localhost:3030/post/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(() => {
            if(imgIdPost != null) {
                api.delete(`/photo/${imgIdPost}`)
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
        }
        )
    }

    const buttons = {
        All: [
            <button type='button'>Editar post</button>,
            <button type='button' onClick={() => postDelete()}>Excluir post</button>,
            <button type='button'>Compartilhar</button>
        ],
        notAll: [
            <button type='button'>Compartilhar</button>
        ]
    }

    return (
        <div className='popover'>
            <p>Opções</p>
            <div className='popover-options'>
                {
                    userId === localStorage.getItem('user') ? buttons.All : buttons.notAll
                }
            </div>
        </div>
    )
}