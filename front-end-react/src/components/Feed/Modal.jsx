import { useState, useEffect } from 'react';
import { Image } from 'phosphor-react';
import close from './img/close-icon.svg'
import axios from 'axios';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import { useModal } from '../../hooks/useModal';
import './Modal.css'

export function Modal({ postSucess = () => {}}) {

    const { modalType, postId } = useModal();

    const [data, setData] = useState({
        name: "",
        image: null
      });

      const { closeModal } = useModal();
      
      const [textInput, setTextInput] = useState('');
      const [previewSource, setPreviewSource] = useState(undefined);
      const [loading, setLoading] = useState(false);
      const [emptyForm, setEmptyForm] = useState(false)

    const inputChange = (event) => {
        setTextInput(event.target.value);
    }

    const handleChange = (name) => (event) => {
      const value = name === "image" ? event.target.files[0] : event.target.value;
      previewFile(value);
      setData({ ...data, [name]: value });
    };

    const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      }
    }

    useEffect(() => {
        if(textInput === '' && data.image == null) {
            setEmptyForm(true);
        } else {
            setEmptyForm(false);
        }
    }, [data, textInput]);

    const URL_POSTS = process.env.REACT_APP_URL_POSTS

    const postUpdate = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");

        await fetch(`${URL_POSTS}/${postId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                text: textInput
            }),
            credentials: "same-origin"
        })
        .then(() => {
            toast.success('Post atualizado com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            closeModal()
            postSucess(true)
            setLoading(false)
            setTextInput('')
        })
        .catch(() => 
            toast.error('Erro ao atualizar post', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        )
        .finally(() => setLoading(false))
    }

    
    const post = async (event) => {
        const token = localStorage.getItem('token')

        if(textInput.length > 0 && data.image == null) {
            setLoading(true)
            
            await axios.post(`${URL_POSTS}`, {
                text: textInput
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })

            .then(() => {
                toast.success('Post adicionado com sucesso!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setData({image: null})
                closeModal()
                setPreviewSource(undefined)
                postSucess(true)
                setLoading(false)
                setTextInput('')
            })

            .catch(() => 
                toast.error('Erro ao adicionar post', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            )
            .finally(() => setLoading(false))
        }
        else if(textInput.length === 0 && data.image != null) {

            setLoading(true)

            await axios.post(URL_POSTS, {
                image: data.image
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token,
                }
            })

            .then(() => {
                toast.success('Post adicionado com sucesso!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

                setData({image: null})
                closeModal()
                setPreviewSource(undefined)
                postSucess(true)
                setLoading(false)
                setTextInput('')
            })

            .catch(() =>
                toast.error('Erro ao adicionar post', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            )
            .finally(() => setLoading(false))
        }
        else if (textInput.length > 0 && data.image != null) {
            setLoading(true)
            setEmptyForm(false)

            await axios.post(URL_POSTS, {
                text: textInput,
                image: data.image
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data'
                }
            })

            .then(() => {
                toast.success('Post adicionado com sucesso!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                
                setData({image: null})
                closeModal()
                setPreviewSource(undefined)
                postSucess(true)
                setLoading(false)
                setTextInput('')
            })
            .catch(() => 
                toast.error('Erro ao adicionar post', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            )
            .finally(() => setLoading(false))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        modalType === 'edit' ? postUpdate() : post()
    }

    return (
        <>
            <div className='modal__container'>
                <div className='modal__box'>
                    <div className='modal__header'>
                        <h2>Criar publicação</h2>
                        <button onClick={() => {closeModal()}}><img src={close} alt="" /></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='modal__input'>
                            <input value={textInput} onChange={inputChange} name="postContent" type="text" placeholder='No que está pensando?' />
                            <label htmlFor="photo"> <Image size={32} /> </label>
                            <input type="file" accept='image/*' name="image" id="photo" onChange={handleChange('image')} />
                        </div>
                            {previewSource && <img className='moda__form-imagem' src={previewSource} alt="imagem selecionada" />}
                        <div className='modal__button'>
                            <button className={loading || emptyForm ? 'disabled' : ''} type='submit'>{loading ? <Spin /> : modalType == "edit" ? "Editar" : 'Publicar'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}