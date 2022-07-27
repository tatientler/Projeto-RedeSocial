import './Post.css'
import like from './img/like.svg'
import comment from './img/comment.svg'
import share from './img/share.svg'
import { DotsThreeVertical } from 'phosphor-react'
import { Popover } from './Popover'
import { memo, useState } from 'react'

function PostComponent({ userId, postData, postId, username, contentPost, imgPost, imgIdPost, imgUser }) {

    const [popoverOpen, setPopoverOpen] = useState(false);
    const formatedDate = new Date(postData).toLocaleDateString('pt-BR')

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
                    <button className="btnInt" id="reagir"><i className="material-icons icone-interacoes"><img src={like} alt="ícone curtir" /></i>Reagir</button>
                    <button className="btnInt" id="comentar"><i className="material-icons icone-interacoes"><img src={comment} alt="ícone comentar" /></i>Comentar</button>
                    <button className="btnInt" id="compartilhar"><i className="material-icons icone-interacoes"><img src={share} alt="ícone compartilhar" /></i>Compartilhar</button>
                </div>
                    
                <div className="btnInteracoes d-flex align-items-center">
                    <button className="btnAction" id="reagir-mobile"><i className="material-icons icone-interacoes"><img src={like} alt="ícone curtir" /></i></button>
                    <button className="btnAction" id="comentar-mobile"><i className="material-icons icone-interacoes"><img src={comment} alt="ícone comentar" /></i></button>
                    <button className="btnAction" id="compartilhar-mobile"><i className="material-icons icone-interacoes"><img src={share} alt="ícone compartilhar" /></i></button>
                </div>
            </div>
        </>
    )
}
export const Post = memo(PostComponent, (prevProps, nextProps) => {
    return prevProps.postId === nextProps.postId
})