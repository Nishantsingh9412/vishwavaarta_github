import React, { useState } from 'react'
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, Button, Toast, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Flex, Img } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Carousel from './Carousel'
import './InputLabelAnimation.css'
import Logo from '../assets/images/logo_vishwa.png'

const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setloading] = useState(false)
    const navigate = useNavigate();

    const toast = useToast();

    // function for submission of image


    const submitHandler = async () => {
        setloading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill All the Fields",
                status: 'warning',
                durataion: 5000,
                isClosable: true,
                position: "top"
            });
            setloading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            };
            const { data } = await axios.post("/api/user/login", { email, password }, config);

            toast({
                title: "Login Successful",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top'
            })

            localStorage.setItem("userInfo", JSON.stringify(data));
            setloading(false);
            navigate('/chats');
        } catch (err) {
            toast({
                title: "Invalid Credentials",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            setloading(false);
        }


    }

    const handleClick = () => {
        setShow(!show)
    }


    return (
        //   <VStack spacing={'5px'}>

        //       {/* - ---------------------------- Email ---------------------------- */}

        //       <FormControl id='email' isRequired>
        //           <FormLabel >Email</FormLabel>
        //           <Input
        //               placeholder='Enter Your Email'
        //               value={email}
        //               onChange={(e) => setEmail(e.target.value)}
        //           >
        //           </Input>
        //       </FormControl>

        //       {/* ----------------------- Password -------------------------*/}

        //       <FormControl id='password' isRequired>
        //           <FormLabel >Password</FormLabel>
        //           <InputGroup >
        //               <Input

        //                   type={show ? "text" : "password"}
        //                   placeholder='Enter Your Password'
        //                   value={password}
        //                   onChange={(e) => setPassword(e.target.value)}
        //               >
        //               </Input>
        //               <InputRightElement >
        //                   <Button h='1.75em' size='sm' onClick={handleClick}>
        //                       {show ? "🙈" : "🙉"}    
        //                       {/* {show ? "Hide" : "Show"} */}
        //                   </Button>
        //               </InputRightElement>
        //           </InputGroup>
        //       </FormControl>

        //       <Button
        //           colorScheme='blue'
        //           width={'100%'}
        //           style={{ marginTop:15 }}
        //           onClick={submitHandler}
        //           isLoading={loading}
        //       >Login</Button>

        //     <Button
        //           variant='solid'
        //           colorScheme='red'
        //           width={'100%'}
        //           style={{ marginTop:15 }}
        //           onClick={ () => {
        //             setEmail('test@example.com');
        //             setPassword('12345678');
        //             }
        //           }
        //           isLoading={loading}
        //       >Test Application</Button>



        //   </VStack>

        <div
            className="signup"
            borderRadius="0px 30px 0px 30px"
            style={{
                height: 'auto',
                marginTop: '1vw',
                marginBottom: '1vw',
            }}
        >
            <ToastContainer />
            <Flex
                alignContent={'center'}
                justifyContent={'center'}
                className="signup-center-box"
            >
                <div className='curousel_box'>
                    <Carousel />
                </div>
                <Flex
                    className='box-form'
                    direction="column"
                    align="center"
                    justify="center"
                >
                    <form
                        // onSubmit={submitHandler}
                        className="form-signup"
                        style={{
                            width: '100%',
                            padding: '1rem',
                        }}
                    >
                        <Img
                            className='LogoImg'
                            src={Logo}
                            alt="Logo"
                            width="5%"
                            height="10%"

                        />
                        <div
                            style={{
                                marginLeft: '1%',
                                marginBottom: '1rem',
                            }}
                            className="text"
                        >
                            <h6 style={{ marginLeft: '2%', fontSize: "12px" , marginTop:'4vw'}}>
                                Hello Chatters
                            </h6>
                            <h3 style={{ fontSize: "18px" }}>👋 Welcome Back to VishwaVarta!</h3>
                        </div>
                        <br />
                        <div className='form-fields'>
                            {/* - ---------------------------- Email ---------------------------- */}

                            <FormControl id='email' isRequired>
                                <FormLabel >Email</FormLabel>
                                <Input
                                    placeholder='Enter Your Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Input>
                            </FormControl>

                            {/* ----------------------- Password -------------------------*/}

                            <FormControl id='password' isRequired>
                                <FormLabel >Password</FormLabel>
                                <InputGroup >
                                    <Input

                                        type={show ? "text" : "password"}
                                        placeholder='Enter Your Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    >
                                    </Input>
                                    <InputRightElement >
                                        <Button h='1.75em' size='sm' onClick={handleClick}>
                                            {show ? "🙈" : "🙉"}
                                            {/* {show ? "Hide" : "Show"} */}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <Button
                                colorScheme='whatsapp'
                                width={'100%'}
                                style={{ marginTop: 15 }}
                                onClick={submitHandler}
                                isLoading={loading}
                            >Login</Button>

                            {/* <Button
                                variant='solid'
                                colorScheme='red'
                                width={'100%'}
                                style={{ marginTop: 15 }}
                                onClick={() => {
                                    setEmail('test@example.com');
                                    setPassword('12345678');
                                }
                                }
                                isLoading={loading}
                            >Test Application</Button> */}
                        </div>
                        <br />
                        {/* Don't have an account?{' '}
                        <NavLink
                            style={{
                                color: '#0000f2ff',
                                textDecoration: 'none',
                            }}
                            to="/signup"
                        >
                            Signup
                        </NavLink> */}

                    </form>
                </Flex>
            </Flex>
        </div >
    )
}

export default Login
