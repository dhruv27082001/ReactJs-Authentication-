import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { StateContext } from './Authication'
import './style.css'

const Home = () => {

    const {
        name, 
        setName, 
        email, 
        setEmail, 
        password, 
        setPassword, 
        confirmPassword, 
        setConfirmPassword,
    } = useContext(StateContext);

    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);

    const [redAlert, setRedAlert] = useState(false);
    const [greenAlert, setGreenAlert] = useState(false);

    const navigate = useNavigate();

    const checkName =(e)=>{
        setName(e.target.value);
        if(name.length<=2){
            setValidName(false);
        }else if(!name.includes(" ")){
            setValidName(false);
        }else if(!name.split(" ")[1]){
            setValidName(false);
        }else{
            setValidName(true);
        }
    }

    const checkEmail =(e)=>{
        setEmail(e.target.value);
        if(email.length<=12){
            setValidEmail(false);
        }else if(!email.includes("@")){
            setValidEmail(false);
        }else if(!email.split("@")[1]===("gmail.com" || "outlook.com" || "yahoo.com")){
            setValidEmail(false);
        }else{
            setValidEmail(true);
        }
    }

    const checkPassword =(e)=>{
        setPassword(e.target.value);
        if(password.length<5){
            setValidPassword(false);
        }else{
            setValidPassword(true);
        }
    }

    const checkConfirmPassword =(e)=>{
        setConfirmPassword(e.target.value);
        if(confirmPassword.length < 5 ){
            setValidConfirmPassword(false);
        }else{
            setValidConfirmPassword(true);
        }
    }


    const onSubmit=()=>{
        if(!validName || !validEmail || (password !== confirmPassword) || !validPassword){
            console.log("Invalid")
            setRedAlert(true);
            setGreenAlert(false);
            if(!validName){
                alert("Enter valid name");
            }else if(!validEmail){
                alert("Enter valid email");
            }else if(password !== confirmPassword){
                alert("Password did not matched");
            }else if(password.length < 5){
                alert("Password is too short");
            }
        }else{
            setRedAlert(false);
            setGreenAlert(true);
            window.localStorage.setItem("localName", name);
            window.localStorage.setItem("localEmail", email);
            window.localStorage.setItem("localPassword", password);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                navigate('/profile');
            },500 );
        }
    }

    useEffect(() => {
        if(window.localStorage.getItem("localName")){
            setTimeout(()=>{
                navigate('/profile');
            }, 500)
        }
    }, [])
    

  return (
    <div className='h-full w-[70%] m-auto'>
        <div className='mt-10'>
            <h2 className='text-3xl text-center'>Signup</h2>
            <div className='mt-5'>
                <div className=' border border-transparent border-b-white mt-5'>
                    <input 
                        placeholder='Full Name' 
                        className='bg-transparent h-10 w-full outline-none' 
                        value={name} 
                        type='text'
                        onChange={checkName} />
                </div>

                <div className=' border border-transparent border-b-white mt-5'>
                    <input 
                        placeholder='Email' 
                        className='bg-transparent h-10 w-full outline-none' 
                        value={email} 
                        type='email'
                        onChange={checkEmail}  />
                </div>

                <div className=' border border-transparent border-b-white mt-5'>
                    <input 
                        placeholder='Password' 
                        className='bg-transparent h-10 w-full outline-none' 
                        value={password} 
                        type='password'
                        onChange={checkPassword} />
                </div>

                <div className=' border border-transparent border-b-white mt-5'>
                    <input 
                        placeholder='Confirm Password' 
                        className='bg-transparent h-10 w-full outline-none'  
                        value={confirmPassword} 
                        type='password'
                        onChange={checkConfirmPassword} />
                </div>

                <div className='py-5'>
                    <blink><h2 className={`text-red-800 text-3xl ${!redAlert?"hidden":"flex"}`}>Error: All the fields are mandatory</h2></blink>
                    <h2 className={`text-green-700 text-3xl  ${!greenAlert?"hidden":"flex"}`}>Successfully Signed Up!</h2>
                </div>
                <center>
                <button onClick={onSubmit}  className='bg-white text-black text-2xl w-24 rounded-sm p-2'>Signup</button>
                </center>

            </div>
        </div>
    </div>
  )
}

export default Home