import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Spin } from 'antd';

import decode from 'jwt-decode';

import './Feed.css'
import { Navbar } from '../Navbar'
import { Sidebar } from '../Sidebar'
import { Post } from '../Post'
import { Chat } from '../Chat'
import { Modal } from './Modal'

import userImage1 from './img/img1.jpg'
import userImage2 from './img/img2.jpg'
import userImage3 from './img/img3.jpg'


export function Feed() {

    const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
    const [openChat, setOpenChat] = useState(false)
    const [statusModal, setStatusModal] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const token = decode(localStorage.getItem('token'))
        fetch(`http://localhost:3030/post`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(data => {
                setPosts(data);
				setLoading(false);
            })

    }, [location.pathname])

    return (
        <div className='feed_content'>
            <Navbar />
            <main className="container justify-content-center">
                <Sidebar currentUserImage={userImage1} modalOpen={setStatusModal}/>
                <section className="secPosts container" id="posts">
                    {
                    loading ? 
                    <Spin /> : 
                    posts.map(post => <Post key={post._id} username={post.userID[0].name} contentPost={post.text} imgUser={userImage2} />)
                    }
                    <Post username={"John Doe"} imgUser={userImage1} contentPost={`Tenho a impressão de ter sido uma criança brincando à beira-mar, divertindo-me em descobrir uma pedrinha mais lisa ou uma concha mais bonita que as outras, enquanto o imenso oceano da verdade continua misterioso diante de meus olhos." - Isaac Newton`} />
                </section>
                <Chat openChat={setOpenChat} open={openChat} currentUserImage={userImage1} friendUserImage={userImage3}/>
            </main>
            <Modal modalClose={setStatusModal} modal={statusModal}/>
        </div>
    )
}