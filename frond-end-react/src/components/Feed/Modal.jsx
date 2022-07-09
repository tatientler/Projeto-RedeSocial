import { useState, useEffect } from 'react';
import decode from 'jwt-decode';
import { Image } from 'phosphor-react';
import close from './img/close-icon.svg'
import axios from 'axios';
import { Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';

import './Modal.css'

export function Modal({modalClose = () => {}, postSucess = () => {}}) {

    const [data, setData] = useState({
        image: null
      });
        
    const [previewSource, setPreviewSource] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const handleChange = (name) => (e) => {
      const value = name === "image" ? e.target.files[0] : e.target.value;
      previewFile(value);
      setData({ ...data, [name]: value });
    };

    let formData = new FormData();
    formData.append("image", data.image);
    formData.append("name", data.name);

    const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      }
    }

    const [emptyForm, setEmptyForm] = useState()
    
    const post = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        const postText = event.target.postContent.value

        if(postText != undefined && data.image == null) {
            setEmptyForm(false)
            setLoading(true)
            await fetch("http://localhost:3030/post", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                user: localStorage.getItem('user')
            },
            body: JSON.stringify({
                text: postText,
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
            setLoading(false)
            modalClose(false)
            event.target.postContent.value = ""
            setPreviewSource(undefined)
            formData.delete('image')
            postSucess(true)
        }
        )
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
        .finally(setLoading(false))
    }
        else if(postText == undefined && data.image != null) {
            setLoading(true)
            const api = axios.create({
                baseURL: 'http://127.0.0.1:5000/photos',
               })

            await api.post('/', {uploadedFile: formData.get('image')}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            .then(res => {
                console.log(res.data)
                fetch("http://localhost:3030/post", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        user: localStorage.getItem('user')
                    },
                    body: JSON.stringify({
                        image: res.data
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
                setLoading(false)
                modalClose(false)
                event.target.postContent.value = ""
                setPreviewSource(undefined)
                formData.delete('image')
                postSucess(true)
        
            }
            )
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
            .finally(setLoading(false))
        }
        else if (postText != undefined && data.image != null) {
            setEmptyForm(false)
            setLoading(true)
            const api = axios.create({
                baseURL: 'http://127.0.0.1:5000/photos',
               })

            await api.post('/', {uploadedFile: formData.get('image')}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(res => {
                console.log(res.data)
                fetch("http://localhost:3030/post", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        user: localStorage.getItem('user')
                    },
                    body: JSON.stringify({
                        text: postText,
                        image: res.data,
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
                setLoading(false)
                modalClose(false)
                event.target.postContent.value = ""
                setPreviewSource(undefined)
                formData.delete('image')
                postSucess(true)
            }
            )
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
            .finally(setLoading(false))
        }
        else {
            setEmptyForm(true)
        }
    }
    console.log(formData)

    return (
        <>
            <div className='modal__container'>
                <div className='modal__box'>
                    <div className='modal__header'>
                        <h2>Criar publicação</h2>
                        <button onClick={() => {modalClose(false)}}><img src={close} alt="" /></button>
                    </div>
                    <form action="#" onSubmit={post}>
                        <div className='modal__input'>
                            <input onClick={() => {setEmptyForm(false)}} name="postContent" type="text" placeholder='No que está pensando?' />
                            <label htmlFor="photo"> <Image size={32} /> </label>
                            <input type="file" name="uploadedFile" id="photo" onChange={handleChange('image')} />
                        </div>
                            {previewSource && <img className='moda__form-imagem' src={previewSource} alt="imagem selecionada" />}
                        <div className='modal__button'>
                            {emptyForm && <p>Preencha o campo</p>}
                            <button type='submit'>{loading ? <Spin /> : 'Publicar'}</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}