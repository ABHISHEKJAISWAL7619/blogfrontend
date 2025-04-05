
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaCameraRetro } from "react-icons/fa";
import UserProfileCard from '../components/UserProfileCard';
import { FaHeart } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
// import { FaHeart } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import Progressbar from './Progressbar';


const FriendProfile = (props) => {

    let userStore = useSelector((state)=>state.user);
    let token = useSelector((state)=>state.user.token)
    console.log(token)
    let originaluser = userStore.user
    console.log(originaluser)

  let location = useLocation();
  let userId = location.state

  const [userDetails, setuserDetails] = useState('');
    async function getUserDetails (){
        let res = await axios.get(`https://blogbackend-i274.onrender.com/users/getSingleUser/${userId}`);
        let data = res.data;
        console.log(data)
        setuserDetails(data.user)
    }

    useEffect(()=>{
        getUserDetails()
    },[userId])
  








    const [userPics, setuserPics] = useState({
      coverPic:"",
      profilePic:""
    });
    console.log(userPics)

    const [allPosts, setallPosts] = useState([]);
    const getUserPost = async()=>{
      let res = await axios.get(`https://blogbackend-i274.onrender.com/posts/userPost/${userId}`)
      let data = res.data
      console.log(data)
      setallPosts(data.posts)
  }

  useEffect(()=>{
      getUserPost()
  },[userId])

  



    const [likesCount, setlikesCount] = useState(0);
    const getLikes = (ans)=>{
        console.log(ans)
        setlikesCount(ans)
    }


    const handlefollow=async()=>{
      let res = await axios(`https://blogbackend-i274.onrender.com/users/follow/${userId}`,{
        headers:{
          'Authorization': token
        }
      })
      let data = res.data
      console.log(data)
      if(data.success){
        // props.getUserDetails()
        getUserDetails()
      }
      props.getUserDetails()
      // getUserDetails()

    }
    
  return (
    <div>
     
      

<div className=" mx-auto w-[90%] bg-white shadow-xl rounded-lg text-gray-900">
  <div className="rounded-t-lg h-64 overflow-hidden relative">
    
    <img className="object-cover object-top w-full" src={ userDetails?.coverPic} alt="Mountain" />
  </div>
  <div className="mx-auto  w-32 h-32 relative -mt-16 border-4 border-white rounded-full ">
  
    <img className="object-cover object-center h-32 rounded-full" src={userDetails?.profilePic} alt="Woman looking front" />
  </div>
  <div className="text-center mt-2">
    <h2 className="font-semibold">{userDetails?.name}</h2>
    <p className="text-gray-500">{userDetails?.bio?userDetails?.bio:'enter a bio'}</p>

    {  !originaluser.followings.includes(userId) && <button  onClick={handlefollow} className='bg-green-950 text--white px-3 py-2 rounded-md' >Follow</button>}
   {  originaluser.followings.includes(userId) &&  <button onClick={handlefollow} className='bg-green-950 text--white px-3 py-2 rounded-md' >Unfollow</button>}
   {/* l<Link to="/chat" state={{friend:userDetails}}  className='bg-blue-950 mx-2 text-white px-3 py-2 rounded-md hover:bg-blue-700' >Chat</Link> */}
  </div>
  <ul className="py-4 mt-2 text-gray-700 flex items-center  justify-around">
    <li className="flex flex-col items-center justify-around">
    <p className='font-bold'>Followings</p>
    <div>{userDetails?.followings?.length}</div>
    </li>
    <li className="flex flex-col items-center -ms-10 justify-between">
     
      <p className='font-bold'>Followers</p>
      <div>{userDetails?.followers?.length}</div>
    </li>
    <li className="flex flex-col items-center justify-around">
     
      <FaHeart size={30} color='red'/>
      <div>{likesCount}</div>
    </li>
  </ul>

</div>

<div className='flex gap-5 mt-4 mx-auto w-[90%]'>


 { originaluser.followings.includes(userId)?  <div>
      {/* <UserProfileCard getLikes={getLikes}/> */}
     {  allPosts.length>0 ?<div>
      
      {
        allPosts.map((ele)=>{
            return <article className="relative flex bg-white transition hover:shadow-xl mb-4 w-96">

                <div className='absolute right-4 top-4'>
                   <span className='flex'> <FaHeart color={ele.likes.includes(userStore.user._id)?'red':''} onClick={()=>handleLike(ele._id)} size={25}/> <sup>{ele.likes.length}</sup></span>
                    <span className='flex mt-6'><GoCommentDiscussion size={25} /> <sub>{ele.comments.length}</sub></span>
                </div>
            
          {ele.file.map((obj)=>{
              return <div className='h-36 w-36 bg-cover object-center '>
                <img src={obj.url} alt="" />
              </div>
          })}
           
          
            <div className="flex flex-1 flex-col justify-between">
              <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                <a href="#">
                  <h3 className="font-bold uppercase text-gray-900">
                    {ele.title}
                  </h3>
                </a>
          
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 h-24 w-52">
                 {ele.description}
                </p>
              </div>
          
              <div className="sm:flex sm:items-end sm:justify-end">
                <a
                  href="#"
                  className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                >
                  Read Post
                </a>
              </div>
            </div>
          </article>
        })
      }
    </div> :<h1 className='w-96 justify-center ml-96 text-center bg-black text-white' >No post Available</h1> }
    </div> :<h1 className='text-center w-full mt-10 text-6xl'><Progressbar/></h1>}
</div>

      
    </div>
  )
}

export default FriendProfile
