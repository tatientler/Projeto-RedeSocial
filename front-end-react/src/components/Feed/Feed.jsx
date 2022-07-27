import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Spin } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';

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
import { postUpdate } from '../../redux/action';
import { useModal } from '../../hooks/useModal';


export function Feed() {

    const updatePost = useSelector(state => state);
    const dispatch = useDispatch();

    const [newPost, setNewPost] = useState(false);

    const { modalOpen, openModal } = useModal();

    const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
    const [openChat, setOpenChat] = useState(false)
    const [statusModal, setStatusModal] = useState(false)
    const location = useLocation()

    !statusModal ? document.body.classList.remove('modal-open') : document.body.classList.add('modal-open')

    const getPosts = () => {
        const token = localStorage.getItem('token')
        fetch(`https://wtmfgciejg.execute-api.us-east-1.amazonaws.com/dev/posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(async response => {
            const data = await response.json()
            console.log(data)
            setPosts(data.body);
            setLoading(false);
        })
    }

    useEffect(() => {
        getPosts()
    }, [location.pathname])

    useEffect(() => {
        getPosts()
        setNewPost(false)
    }, [newPost])

    useEffect(() => {
        getPosts()
        dispatch(postUpdate(false))
    }, [updatePost])

    return (
        <div className='feed_content'>
            <Navbar />
            <main className="container justify-content-center">
                <Sidebar currentUserImage={userImage1} modalOpen={setStatusModal}/>
                <section className="secPosts container" id="posts">
                    {
                    loading ? 
                    <Spin /> : 
                    posts.map(post => <Post key={post._id} postData={post.createdAt} imgIdPost={post.imageId} userId={post.userID[0]._id} postId={post._id} username={post.userID[0]?.name} contentPost={post.text != undefined ? post.text : ''} imgPost={post.image != undefined ? post.image : false} imgUser={post.userID[0]?.avatar} />).reverse()
                    }
                    <Post username={"John Doe"} imgUser={userImage1} contentPost={`Tenho a impressão de ter sido uma criança brincando à beira-mar, divertindo-me em descobrir uma pedrinha mais lisa ou uma concha mais bonita que as outras, enquanto o imenso oceano da verdade continua misterioso diante de meus olhos." - Isaac Newton`} />
                </section>
                <Chat openChat={setOpenChat} open={openChat} currentUserImage={userImage1} friendUserImage={userImage3}/>
            </main>
            {
                modalOpen &&
                <Modal postSucess={setNewPost} />
            }
            
            <ToastContainer />
        </div>
        
    )
}