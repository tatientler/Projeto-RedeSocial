import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import decode from 'jwt-decode';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Spin } from 'antd';

import calendar from './img/calendar-icon.svg'
import circle from './img/circle-icon.svg'
import group from './img/group-icon.svg'
import box from './img/edit-box-icon.svg'
import file from './img/file-code-icon.svg'
import bag from './img/shopping-bag-icon.svg'
import exit from './img/exit-icon.svg'
import imgUser from './img/user-placeholder.png'

import './Sidebar.css';

export function Sidebar({currentUserImage, currentUserName, modalOpen=() => {}}, modal) {

    const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({});
    const location = useLocation();

    const [data, setData] = useState({
        name: "",
        image: ""
      });
      const [image, setImage] = useState();
    
      const [previewSource, setPreviewSource] = useState();
    
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
                if(res) {
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

		fetch(`http://localhost:3030/users/${userID}`)
			.then(response => response.json())
			.then(data => {
                setUser(data)
			})
	}, [location.pathname]);

    const logOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
    }

    const currentUserImg = () => {
        if(user.avatar) {
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
                        <Link to="/profile"><button className="btnIconUser"><i className="bi bi-pencil-square"><img src={box} alt="" /></i></button></Link>
                        <Link to="/profile"><button className="btnUser">Perfil</button></Link>
                    </div>

                    <div className="user">
                        <button className="btnIconUser" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {modalOpen(true); document.body.classList.add('modal-open')}}><i className="bi bi-plus-circle-fill"><img src={circle} alt="" /></i></button>
                        <button className="btnUser" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {modalOpen(true); document.body.classList.add('modal-open')}}>Publicar</button>
                    </div>

                    <div className="user">
                        <Link to="" /><button className="btnIconUser"><i className="bi bi-people-fill"><img src={group} alt="" /></i></button>
                        <Link to="" /><button className="btnUser">Amigos</button>
                    </div>

                    <div className="user">
                        <Link to="" /><button className="btnIconUser"><i className="bi bi-file-earmark-code-fill"><img src={file} alt="" /></i></button>
                        <Link to="" /><button className="btnUser">Códigos</button>
                    </div>

                    <div className="user">
                        <Link to="" /><button className="btnIconUser"><i className="bi bi-bag-check-fill"><img src={bag} alt="" /></i></button>
                        <Link to="" /><button className="btnUser">Market</button>
                    </div>

                    <div className="user">
                        <Link to="" /><button className="btnIconUser"><i className="bi bi-calendar-event"><img src={calendar} alt="" /></i></button>
                        <Link to="" /><button className="btnUser">Eventos</button>
                    </div>
                    </div>
                    
                    <div>
                        <Link to="/"><button onClick={() => {logOut()}} className="btn-exit btnIconExit"><i className="bi bi-box-arrow-left"><img src={exit} alt="" /></i></button></Link>
                        <Link to="/"><button onClick={() => {logOut()}} className="btn-exit">Sair</button></Link>
                    </div>
            </section>
    )
}