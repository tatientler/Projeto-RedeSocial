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
                        posts.map(post => <Post key={post._id} username={user.name} imgUser={user.avatar} contentPost={post.text} imgPost={post.image} />)
                    }
                </div>
            </div>
        </>
    )
}