import { DotsThreeVertical, ThumbsUp } from 'phosphor-react'
import { Popover } from './Popover'
import { useState } from 'react'

import comment from './img/comment.svg'
import share from './img/share.svg'

import './Post.css'

export function Post({ userId, postId, usersLike, username, contentPost, imgPost, imgIdPost, imgUser }) {

    const [popoverOpen, setPopoverOpen] = useState(false);
    const [likePost, setLikePost] = useState(false)

    const URL_POSTS = process.env.REACT_APP_URL_POSTS
    const token = localStorage.getItem('token')
    
    let userLike = usersLike?.find(id => id === userId)

    const changeLike = async () => {
        await fetch(`${URL_POSTS}/${postId}/like`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then(async response => {
            response.status === 201 ? setLikePost(true) : setLikePost(false);
        })
    }

    if(likePost) {
        userLike = userId
    } else {
        userLike = undefined
    }

    return (
        <>
            <div className="post">

                <div className='post-info'>
                    <div className="author">
                        <img src={imgUser} alt="Avatar ou imagem do perfil do amigo" />
                        <p>{username}</p>
                    </div>
                    <div className='post-popover'>
                        {
                           popoverOpen && <Popover key={Math.random( 100 * postId)} imgIdPost={imgIdPost} postId={postId} imgPost={imgPost} userId={userId} />
                        }
                        <DotsThreeVertical style={{cursor: "pointer"}} size={30} onClick={() => !popoverOpen ? setPopoverOpen(true) : setPopoverOpen(false)}/>
                    </div>
                </div>
                <div className="contentPost">
                    <p>{contentPost}</p>
                    {
                        imgPost && <img src={imgPost} alt="Imagem do post" />
                    }
                </div>

                <div className="reacoes desativar d-flex align-items-center">
                    <p><i className="material-icons icone-interacoes"></i> 10</p>
                    <div className="comentario d-flex">
                        <p><i className="material-icons icone-interacoes"></i> 10</p>
                        <p><i className="material-icons icone-interacoes"></i> 10</p>
                    </div>
                </div>

                <div className="interacoes container">
                    <button className={`btnInt ${userLike !== undefined || likePost ? 'like' : ''}`} id="reagir" onClick={() => changeLike()} ><i className="material-icons icone-interacoes"><ThumbsUp size={28} weight="fill" /></i>Reagir</button>
                    <button className="btnInt" id="comentar"><i className="material-icons icone-interacoes"><img src={comment} alt="ícone comentar" /></i>Comentar</button>
                    <button className="btnInt" id="compartilhar"><i className="material-icons icone-interacoes"><img src={share} alt="ícone compartilhar" /></i>Compartilhar</button>
                </div>
                    
                <div className="btnInteracoes d-flex align-items-center">
                    <button className={`btnAction ${userLike !== undefined || likePost ? 'like' : ''}`} id="reagir-mobile" onClick={() => changeLike()} ><i className="material-icons icone-interacoes"><ThumbsUp size={28} weight="fill" /></i></button>
                    <button className="btnAction" id="comentar-mobile"><i className="material-icons icone-interacoes"><img src={comment} alt="ícone comentar" /></i></button>
                    <button className="btnAction" id="compartilhar-mobile"><i className="material-icons icone-interacoes"><img src={share} alt="ícone compartilhar" /></i></button>
                </div>
            </div>
        </>
    )
}