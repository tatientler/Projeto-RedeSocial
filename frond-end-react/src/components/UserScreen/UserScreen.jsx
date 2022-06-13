import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'

import { Navbar } from "../Navbar"
import { Chat } from "../Chat"
import { Post } from "../Post"

import decode from 'jwt-decode';
import userImage from "./img/img1.jpg"

import "./UserScreen.css";

export function UserScreen () {

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [posts, setPosts] = useState([]);
    const location = useLocation()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userID = localStorage.getItem('user')
        fetch(`http://localhost:3030/users/${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        .then(response => response.json())
        .then(user => {
            setUser(user);
        })
    }, [location.pathname])

    useEffect(() => {
        const token = localStorage.getItem('token')
        const profileID = localStorage.getItem('profile')
        fetch(`http://localhost:3030/usuarios/${profileID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(profile => {
            setProfile(profile);
            setPosts(profile.post)
        })
    }, [location.pathname])

    return (
        <>  
            <Navbar />

            <div className="userScreen_content">
                <div className="userScreen__header">
                    <img src={userImage} alt="" />
                    <h2>{user.name}</h2>
                </div>

                <div className="userScreen__bio">
                    <p>Biografia</p>
                </div>

                <div className="userScreen__fotos">
                    <h3>Fotos</h3>
                    <div className="fotos__container">
                        <img src={userImage} alt="" />
                        <img src={userImage} alt="" />
                        <img src={userImage} alt="" />
                        <img src={userImage} alt="" />
                        <img src={userImage} alt="" />
                    </div>
                </div>
                <div className="userScreen__posts">
                    <h3>Suas publicações</h3>
                    {
                        posts.map(post => <Post key={post._id} username={user.name} imgUser={userImage} contentPost={post.text}/>)
                    }
                </div>
            </div>
        </>
    )
}