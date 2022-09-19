import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'
import { Spin } from 'antd';

import { Post } from "../Post"
import { Navbar } from "../Navbar"
import { Modal } from "../Feed/Modal";
import { PencilSimple } from "phosphor-react";
import { useModal } from "../../hooks/useModal";
import { toast, ToastContainer } from "react-toastify";

import "./UserScreen.css";

export function UserScreen () {
    const { modalOpen } = useModal()
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [postSucess, setPostSucess] = useState(false)
    const [editBio, setEditBio] = useState(false)
    const [bioInput, setBioInput] = useState('')
    const [loading, setLoading] = useState(false)

    const location = useLocation()

    const URL_USERS = process.env.REACT_APP_URL_USERS;
    const URL_PROFILE = process.env.REACT_APP_URL_PROFILE;

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userID = localStorage.getItem('user')

        fetch(`${URL_USERS}/${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        .then(async response => {
            const data = await response.json()
            setUser(data)
            setBioInput(data.profile.bio)
        })
    }, [location.pathname])

    const getPosts = async () => {
        const token = localStorage.getItem('token')
        const profileID = localStorage.getItem('profile')

        await fetch(`${URL_PROFILE}/${profileID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(async response => {
            const data = await response.json()
            setPosts(data.post)
        })
    }

    async function profileUpdate() {
        const token = localStorage.getItem('token')
        const profileID = localStorage.getItem('profile')

        setLoading(true)

        await fetch(`${URL_PROFILE}/${profileID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                bio: user.profile.bio !== bioInput ? bioInput : user.profile.bio
            })
        })
        .then(() => {
            toast.success('Biografia atualizada com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setEditBio(false)
            setUser(
                {
                    ...user,
                    profile: {
                        ...user.profile,
                        bio: bioInput
                    }
                }
            )
        })
        .catch(() => {
            toast.error('Erro ao atualizar biografia', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .finally(() => setLoading(false))
    }

    useEffect(() => {
        getPosts()
        setPostSucess(false)
    }, [postSucess])

    useEffect(() => {
        getPosts()
    }, [location.pathname])

    return (
        <>  
            {
                modalOpen &&
                <Modal postSucess={setPostSucess} />
            }
            <Navbar />
            <div className="userScreen_content">
                <div className="userScreen__header">
                    <img src={user.avatar} alt="" />
                    <h2>{user.name}</h2>
                </div>

                <div className="userScreen__bio">
                    <h3>Biografia</h3>
                    {
                        editBio ?
                        <div className="userScreen__bio__edit">
                            <textarea defaultValue={user.profile.bio} onChange={(event) => setBioInput(event.target.value)} type="text" placeholder="Editar biografia" />
                        </div>
                        : <p>{user?.profile?.bio}</p>
                    }
                    {
                        editBio ? 
                        <button
                            className="userScreen__bio__edit__button"
                            onClick={profileUpdate}
                            disabled={loading}
                        >
                            {
                                loading ? <Spin /> : 'Salvar'
                            }
                        </button>
                        : <PencilSimple onClick={() => setEditBio(true)} cursor={"pointer"} color={"#221772"} size={25} weight="fill" /> 
                    }
                </div>

                <div className="userScreen__fotos">
                    <h3>Fotos</h3>
                    <div className="fotos__container">
                        {
                            posts.map(post => { return post.image != undefined ? <img src={post.image} alt="" key={post._id} /> : null })
                        }
                    </div>
                </div>
                <div className="userScreen__posts">
                    <h3>Suas publicações</h3>
                    {
                        posts.map(post =>
                            <Post
                                key={post._id}
                                imgIdPost={post.imageId}
                                userId={localStorage.getItem('user')}
                                postId={post._id}
                                usersLike={post.usersLike}
                                username={user.name}
                                imgUser={user.avatar}
                                contentPost={post.text}
                                imgPost={post.image}
                            />
                        )
                    }
                </div>
            </div>
            <ToastContainer />
        </>
    )
}