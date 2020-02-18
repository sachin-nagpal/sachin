import React,{useState,useEffect} from 'react';
import '../styles/QA.css';
import image from '../images/image.jpeg';
import follow from '../images/follow.png';
import call from '../images/call.png';
import comment from '../images/comment.png';
import shareWhite from '../images/shareWhite.png';
import share from '../images/share.png';
import parse from 'html-react-parser';
import AxiosRequests from '../helpers/AxiosRequests';
import ProfileImage from '../images/noImage.jpg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SignupLoginPage from '../pages/SignupLoginPage';
import {createUseStyles} from 'react-jss';
// Context
import { useAuth } from "../context/auth";

import UpvoteBtn from './UpvoteBtn';
const useStyles = createUseStyles({
    modalContainer: {
        maxWidth: '60rem'
    }
})
const Answers = ({ answers, handleReload }) => {
    const classes = useStyles(false);
    const [clickedCount,setClickedCount] = useState('');
    const [time,setTime] = useState(0);
    const { authTokens } = useAuth();
    const [showSignUp, setShowSignUp] = useState(false);
    const [upvotes, setUpvotes] = useState(answers.upvotes);
    
      const [modal, setModal] = useState(false);

      const toggle = () => setModal(!modal);
    useEffect(() => {
        if(answers.findallanswers){
            setClickedCount(answers.findallanswers.upvotes);
        }
    }, []);

    const handleUpvote= async ()=>{
    //   alert('Clicked');
        if (!authTokens) {
           return toggle();
        }
    let vote = upvotes;
    const response = await AxiosRequests().post(`${process.env.REACT_APP_API_HOST_URL}/upvoteans`,{
        ans_id: answers.id,
        token: authTokens
    })
    console.log(response);
        if(response.data.vote === 'up'){
            setUpvotes(vote+1);
            }
            if(response.data.vote === 'down'){
                setUpvotes(vote-1);
            }
            // else{
            //     alert('Network Error')
            // }
    //   handleReload();
    }

    return(
        <div>
        <Modal isOpen={modal} toggle={toggle} className={classes.modalContainer}>
            <SignupLoginPage st={true}/>
        </Modal>
            <div className="answers-container">
                <div className="user-about">
                    <div className="d-flex">
                        <div className="answers-img-container">
                            <img src={answers.image ? answers.image : ProfileImage } alt="User" className="answers-img"></img>  
                        </div>
                        <div>
                            <div className="ans-user-name">{answers.fname} {answers.lname}</div>
                            <div className="ans-user-about">Founder at MiM-Essay.com , MiM Grad- ESCP Europe</div>
                            <div className="ans-date">{answers.created_at}</div>
                        </div>
                    </div>
                    <div>
                        <button className="answers-btn" style={{backgroundColor: "#3e70bb"}}>
                            <img src={follow} alt="" className="ans-btn-img"></img> 
                            <span className="">Follow</span>
                        </button>
                        <button className="answers-btn" style={{backgroundColor: "#2f9657"}}>
                            <img src={call} alt="" className="ans-btn-img"></img> 
                            <span className="">Connect</span>
                        </button>
                    </div> 
                </div>

                <div className="ans-text-area">
                    {parse(answers.answer)}
                </div> 

                <div className="d-flex align-items-center">
                    <div className="d-inline-flex">
                        {/* <div className="upvote-triangle" onClick={handleClick}>
                            <div style={{color:"#959595", marginLeft:"20px"}}>{clickedCount}</div>
                        </div> */}
                        <UpvoteBtn upvotes={upvotes} handleUpvote={handleUpvote}/>
                    </div>
                    <img src={comment} alt="" className="ans-btn-img"></img><span className="comment-share-text">Comment</span>
                    <img src={shareWhite} alt="" className="ans-btn-img"></img><span className="comment-share-text">Share</span>
                </div>
            </div>
        </div>
    );
}

export default Answers;

