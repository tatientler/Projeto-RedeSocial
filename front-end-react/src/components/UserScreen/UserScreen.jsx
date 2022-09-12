import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'

import { Navbar } from "../Navbar"
import { Post } from "../Post"
import { ToastContainer } from "react-toastify";
import { Modal } from "../Feed/Modal";
import { useModal } from "../../hooks/useModal";

import "./UserScreen.css";

export function UserScreen () {
    const { modalOpen } = useModal()
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [postSucess, setPostSucess] = useState(false)

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
            setUser(data)})
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
                    <p>Biografia</p>
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