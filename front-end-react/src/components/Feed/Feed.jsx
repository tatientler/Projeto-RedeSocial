import { Chat } from '../Chat'
import { Modal } from './Modal'
import { Navbar } from '../Navbar'
import { Post } from '../Post'
import { Sidebar } from '../Sidebar'
import { Spin } from 'antd';
import { ToastContainer } from 'react-toastify';
import { postUpdate } from '../../redux/action';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'
import { useModal } from '../../hooks/useModal';
import { useState, useEffect } from 'react';

import userImage1 from './img/img1.jpg'
import userImage3 from './img/img3.jpg'

import './Feed.css'

export function Feed() {

    const updatePost = useSelector(state => state);
    const dispatch = useDispatch();

    const [newPost, setNewPost] = useState(false);

    const { modalOpen } = useModal();

    const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
    const [openChat, setOpenChat] = useState(false)
    const [statusModal, setStatusModal] = useState(false)
    const location = useLocation()

    !statusModal ? document.body.classList.remove('modal-open') : document.body.classList.add('modal-open')

    const getPosts = async () => {

        const URL_POSTS = process.env.REACT_APP_URL_POSTS;

        const token = localStorage.getItem('token')
        await fetch(URL_POSTS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(async response => {
            const data = await response.json()
            setPosts(data);
            setLoading(false);
        })
    }

    useEffect(() => {
        getPosts()
    }, [location.pathname])

    useEffect(() => {
        if(newPost) {
            getPosts()
            setNewPost(false)
        }
    }, [newPost === true])

    useEffect(() => {
        if(updatePost) {
            getPosts()
            dispatch(postUpdate(false))
        }
    }, [updatePost === true])

    return (
        <div className='feed_content'>
            <Navbar />
            <main className="container justify-content-center">
                <Sidebar currentUserImage={userImage1} modalOpen={setStatusModal}/>
                <section className="secPosts container" id="posts">
                    {
                    loading ? 
                    <Spin /> : 
                    posts.map(post =>
                    <Post
                        key={post._id}
                        postData={post.createdAt}
                        usersLike={post.usersLike}
                        imgIdPost={post.imageId}
                        userId={post.user?._id}
                        postId={post._id}
                        username={post.user?.name}
                        contentPost={post.text !== undefined ? post.text : ''}
                        imgPost={post.image !== undefined ? post.image : false}
                        imgUser={post.user?.avatar} />).reverse()
                    }
                    <Post username={"John Doe"} imgUser={userImage1} contentPost={`Tenho a impressão de ter sido uma criança brincando à beira-mar, divertindo-me em descobrir uma pedrinha mais lisa ou uma concha mais bonita que as outras, enquanto o imenso oceano da verdade continua misterioso diante de meus olhos." - Isaac Newton`} />
                </section>
                <Chat openChat={setOpenChat} open={openChat} currentUserImage={userImage1} friendUserImage={userImage3}/>
            </main>
            {
                modalOpen &&
                <Modal postSuccess={setNewPost} />
            }
            
            <ToastContainer />
        </div>
        
    )
}