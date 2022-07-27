import { useState, useEffect } from 'react';
import decode from 'jwt-decode';
import { Image } from 'phosphor-react';
import close from './img/close-icon.svg'
import axios from 'axios';
import { Spin } from 'antd';
import { toast } from 'react-toastify';

import './Modal.css'
import { useModal } from '../../hooks/useModal';

export function Modal({ postSucess = () => {}}) {

    const [data, setData] = useState({
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

    let formData = new FormData();
    formData.append("image", data.image);

    const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      }
    }

    useEffect(() => {
        if(textInput == '' && data.image == null) {
            setEmptyForm(true);
        } else {
            setEmptyForm(false);
        }
    }, [data, textInput]);

    
    const post = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')

        if(textInput.length > 0 && data.image == null) {
            setLoading(true)
            await fetch("https://wtmfgciejg.execute-api.us-east-1.amazonaws.com/dev/posts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                user: localStorage.getItem('user')
            },
            body: JSON.stringify({
                text: textInput,
                user: localStorage.getItem('user')
        }),
            credentials: "same-origin"
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
    }
        else if(textInput.length == 0 && data.image != null) {

            setLoading(true)
            const api = axios.create({
                baseURL: 'http://127.0.0.1:5000/photos',
               })

            await api.post('/', {user_id: localStorage.getItem('user'), uploadedFile: formData.get('image')}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            .then(async (res) => {
                console.log(res.data)
                await fetch("https://wtmfgciejg.execute-api.us-east-1.amazonaws.com/dev/posts", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        user: localStorage.getItem('user')
                    },
                    body: JSON.stringify({
                        image: res.data.url,
                        imageId: res.data.id,
                    })
                })
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
                event.target.postContent.value = ""
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
        }
        else if (textInput.length > 0 && data.image != null) {
            setLoading(true)
            setEmptyForm(false)

            const api = axios.create({
                baseURL: 'http://127.0.0.1:5000/photos',
               })

            await api.post('/', {uploadedFile: formData.get('image')}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            .then(async (res) => {
                console.log(res.data)
                await fetch("https://wtmfgciejg.execute-api.us-east-1.amazonaws.com/dev/posts", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        user: localStorage.getItem('user')
                    },
                    body: JSON.stringify({
                        text: textInput,
                        image: res.data.url,
                        imageId: res.data.id,
                        user: localStorage.getItem('user')
                    }),
                    credentials: "same-origin"
                })
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
        }
    }
    
    console.log(formData.get('image'))


    return (
        <>
            <div className='modal__container'>
                <div className='modal__box'>
                    <div className='modal__header'>
                        <h2>Criar publicação</h2>
                        <button onClick={() => {closeModal()}}><img src={close} alt="" /></button>
                    </div>
                    <form onSubmit={post}>
                        <div className='modal__input'>
                            <input value={textInput} onChange={inputChange} name="postContent" type="text" placeholder='No que está pensando?' />
                            <label htmlFor="photo"> <Image size={32} /> </label>
                            <input type="file" accept='image/*' name="uploadedFile" id="photo" onChange={handleChange('image')} />
                        </div>
                            {previewSource && <img className='moda__form-imagem' src={previewSource} alt="imagem selecionada" />}
                        <div className='modal__button'>
                            <button className={loading || emptyForm ? 'disabled' : ''} type='submit'>{loading ? <Spin /> : 'Publicar'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}