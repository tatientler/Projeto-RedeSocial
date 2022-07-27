import { useState, useEffect, memo } from 'react';

import decode from 'jwt-decode';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Spin } from 'antd';

import imgUser from './img/user-placeholder.png'

import './Sidebar.css';
import { Plus, SignOut, User, Users } from 'phosphor-react';
import { useModal } from '../../hooks/useModal';
import axios from 'axios';

function SidebarComponent({ currentUserImage, currentUserName }, modal) {

    const { openModal } = useModal();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const location = useLocation();

    const [data, setData] = useState({
        name: "",
        image: ""
    });

    const [previewSource, setPreviewSource] = useState();

    const handleChange = (name) => (e) => {
        const value = name === "image" ? e.target.files[0] : e.target.value;
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
        }	// reader.onloadend
    }

    const handleSubmit = async () => {
        setLoading(true)
        const userID = localStorage.getItem('user');
        try {
            await fetch(`http://localhost:3030/users/${userID}`, {
                method: "PATCH",
                body: formData
            })
                .then(res => res.json())
                .then(res => {
                    if (res) {
                        setLoading(false)
                        window.location.reload()
                    }
                })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        const userID = localStorage.getItem('user')

        fetch(`https://e2l89ma0ai.execute-api.us-east-1.amazonaws.com/dev/user/${userID}`)
            .then(async response => {
                const { user } = await response.json()
                setUser(user)
                console.log(user)
            })
    }, [location.pathname]);

    const logOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
    }

    const currentUserImg = () => {
        if (user.avatar) {
            return user.avatar
        }
        else if (previewSource) {
            return previewSource

        } else {
            return imgUser
        }
    }

    return (
        <section className="secUser">

            <div className='secUser__img'>
                <label className='secUser__label' htmlFor="uploadImage"><img src={currentUserImg()} alt="" /></label>
                <input onChange={handleChange("image")} id='uploadImage' type="file" />
                {previewSource && <button type='submit' onClick={handleSubmit}>{loading ? <Spin /> : "Salvar imagem"}</button>}
                <p>{user.name}</p>
            </div>

            <div className="btnsUser">
                <div className="user">
                    <Link to="/profile"><button className="btnIconUser"><User size={32} /></button></Link>
                    <Link to="/profile"><button className="btnUser">Perfil</button></Link>
                </div>

                <div className="user">
                    <button className="btnIconUser" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => { openModal() }}><Plus size={32} /></button>
                    <button className="btnUser" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {openModal()}}>Publicar</button>
                </div>

                <div className="user">
                    <Link to="" /><button className="btnIconUser"><Users size={32} /> </button>
                    <Link to="" /><button className="btnUser">Amigos</button>
                </div>

                {/*<div className="user">
                    <Link to="" /><button className="btnIconUser"><i className="bi bi-file-earmark-code-fill"><img src={file} alt="" /></i></button>
                    <Link to="" /><button className="btnUser">Códigos</button>
                </div>
                */}
            </div>

            <div>
                <Link to="/"><button onClick={() => { logOut() }} className="btn-exit btnIconExit"><SignOut size={32} /></button></Link>
                <Link to="/"><button onClick={() => { logOut() }} className="btn-exit">Sair</button></Link>
            </div>
        </section>
    )
}

export const Sidebar = memo(SidebarComponent);