import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import Select from 'react-select'
import languages from '../dataLanguages/languages'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { Flex, Img } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
// import { PhoneInput } from 'chakra-phone-input'
// import { parsePhoneNumber } from 'libphonenumber-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carousel from './Carousel'
import './InputLabelAnimation.css'
import VishwaLogo from '../assets/images/logo_vishwa.png'



const SignUp = () => {
    const navigate = useNavigate();
    const [preferredLanguage, setPreferredLanguage] = useState('')
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [pic, setPic] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const toast = useToast();

    const postDetails = (pic) => {
        setLoading(true)
        if (pic === undefined) {
            console.log("Undefined")
            toast({
                title: "Please Select an Image",
                status: 'warning',
                durataion: 5000,
                isClosable: true,
                position: "top"
            })
            return;
        }
        console.log(pic.type);
        if (pic.type === 'image/jpeg' || pic.type === 'image/png' || pic.type === 'image/gif') {
            console.log('If Block');

            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'chatty');          // upload preset 
            data.append('cloud_name', 'dezifvepx');          // cloud name
            fetch('https://api.cloudinary.com/v1_1/dezifvepx/image/upload', {        // Cross Check the URL /image/upload reh gya shayad
                method: 'post',
                body: data

            }).then((res) => res.json()).then((data) => {
                setPic(data.url.toString());
                console.log(data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            })
        } else {
            console.log('Else Block');
            toast({
                title: "Please Select an Image",
                status: 'warning',
                durataion: 5000,
                isClosable: true,
                position: "top"
            })
            setLoading(false);
            return;
        }
    }

    console.log(preferredLanguage);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "Please Fill All the Fields",
                status: 'warning',
                durataion: 5000,
                isClosable: true,
                position: "top"
            })
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "Password and Confirm Password do not Match",
                status: 'warning',
                durataion: 5000,
                isClosable: true,
                position: "top"
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            }
            const { data } = await axios
                .post('/api/user/register',
                    { name, email, password, pic, preferredLanguage },
                    config
                );
            toast({
                title: "Registered Successfully",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "top"
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            navigate('/chats');
        } catch (err) {
            toast({
                title: "Something Went Wrong",
                description: err.response.data.message,
                status: 'error',
                durataion: 5000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
        }

    }

    const handleClick = () => {
        setShow(!show)
    }


    return (
        // <VStack spacing={'5px'}>

        //         {/* -------------------------- Name ---------------------------- */}
        //     <FormControl id='first-name' isRequired>
        //         <FormLabel >Name</FormLabel>
        //         <Input
        //             placeholder='Enter Your Name'
        //             onChange={(e) => setName(e.target.value)}
        //         >
        //         </Input>
        //     </FormControl>

        //     {/* - ---------------------------- Email ---------------------------- */}

        //     <FormControl id='email' isRequired>
        //         <FormLabel >Email</FormLabel>
        //         <Input
        //             placeholder='Enter Your Email'
        //             onChange={(e) => setEmail(e.target.value)}
        //         >
        //         </Input>
        //     </FormControl>

        //     {/* ----------------------- Password -------------------------*/}

        //     <FormControl id='password' isRequired>
        //         <FormLabel >Password</FormLabel>
        //         <InputGroup >
        //             <Input
        //                 type={show ? "password" : "text"}
        //                 placeholder='Enter Your Password'
        //                 onChange={(e) => setPassword(e.target.value)}
        //             >
        //             </Input>
        //             <InputRightElement >
        //                 <Button h='1.75em' size='sm' onClick={handleClick}>
        //                     {show ? "🙈" : "🙉"}    
        //                     {/* {show ? "Hide" : "Show"} */}
        //                 </Button>
        //             </InputRightElement>
        //         </InputGroup>
        //     </FormControl>
        //                             {/* --------------- Confirm Password ---------------- */}

        //     <FormControl id='confirm-password' isRequired>
        //         <FormLabel > Confirm Password</FormLabel>
        //         <InputGroup >
        //             <Input
        //                 type={show ? "password" : "text"}
        //                 placeholder='Enter Your Password'
        //                 onChange={(e) => setConfirmPassword(e.target.value)}
        //             >
        //             </Input>
        //             <InputRightElement >
        //                 <Button h='1.75em' size='sm' onClick={handleClick}>
        //                     {show ? "🙈" : "🙉"}    
        //                     {/* {show ? "Hide" : "Show"} */}
        //                 </Button>
        //             </InputRightElement>
        //         </InputGroup>
        //     </FormControl>

        //         {/* ----------------------- Image ---------------------------- */}

        //         <FormControl>
        //             <FormLabel>Profile Picture</FormLabel>
        //             <Input type='file' p={1.5} accept='image/*' onChange={(e) => postDetails(e.target.files[0])} />   
        //         </FormControl>

        //     <Button
        //         width={'100%'}
        //         color='white'
        //         style={{ marginTop:15 }}
        //         onClick={submitHandler}
        //         isLoading={loading}
        //     >Submit</Button>
        // </VStack>
        <VStack spacing={'5px'}>
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
                    // width={{ base: '50%', md: '50%',lg:"100%" }}
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
                                src={VishwaLogo}
                                alt="Vishwavarta-logo"
                            />
                            <div
                                style={{
                                    marginLeft: '1%',
                                    marginBottom: '1rem',
                                }}
                                className="text"
                            >
                                <h6 style={{ marginLeft: '2%', fontSize: "12px" }}>
                                    Ready to Chat!
                                </h6>
                                <h3 style={{ fontSize: "18px" }}>👋 Create an account</h3>
                                {/* <h5 style={{ marginLeft: '2%', fontSize: "14px" }}>
                                    Create account as a
                                </h5> */}
                            </div>
                            <Flex
                                className='flexButton'
                                justifyContent="center"
                                alignItems="center"
                                flexDirection={{ base: 'row', md: 'row' }} // Stack on small screens, align horizontally on medium and larger screens
                                gap={{ base: '1rem', md: '1.5rem' }} // Adjust spacing between buttons
                                mt={{ base: '1rem', md: 0 }} // Add top margin on small screens
                            >
                                {/* <Button
                                    style={{ border: selectType != "candidate" ? "2px dotted #7f7f7f" : "2px solid #cc341f", color: selectType != "candidate" ? "#000" : "#cc341f", borderRadius: "25px 25px 25px 25px", transition: "all 0.3s linear" }}
                                    onClick={() => setSelectType("candidate")}

                                    variant="outline"
                                    borderColor="#ff7f6eff"
                                    color="#000"
                                    size="lg"
                                    fontSize="15px"
                                    p={{ base: '1rem', md: '1.5rem' }} // Add padding to button}
                                    w={{ base: '100%', md: 'auto' }} // Full width on small screens, auto width on medium and larger screens
                                    mb={{ base: '0.5rem', md: 0 }} // Add bottom margin on small screens
                                >
                                    Candidate
                                </Button>
                                <Button
                                    style={{ border: selectType != "recruiter" ? "2px dotted #7f7f7f" : "2px solid #cc341f", color: selectType != "recruiter" ? "#000" : "#cc341f", borderRadius: "25px 25px 25px 25px", transition: "all 0.3s linear" }}
                                    onClick={() => setSelectType("recruiter")}
                                    variant="outline"
                                    borderColor="#ff7f6eff"
                                    fontSize="15px"
                                    py={{ base: '1rem', md: '1.5rem' }} // Add padding to button}
                                    color="#000"
                                    size="lg"
                                    w={{ base: '100%', md: 'auto' }}
                                    mb={{ base: '0.5rem', md: 0 }}
                                >
                                    Recruiter
                                </Button>
                                <Button
                                    style={{ border: selectType != "educator" ? "2px dotted #7f7f7f" : "2px solid #cc341f", color: selectType != "educator" ? "#000" : "#cc341f", borderRadius: "25px 25px 25px 25px", transition: "all 0.3s linear" }}
                                    onClick={() => setSelectType("educator")}
                                    variant="outline"
                                    borderColor="#ff7f6eff"
                                    fontSize="15px"
                                    p={{ base: '1rem', md: '1.5rem' }} // Add padding to button}
                                    color="#000"
                                    size="lg"
                                    w={{ base: '100%', md: 'auto' }}
                                    mb={{ base: '0.5rem', md: 0 }}
                                >
                                    Educator
                                </Button> */}
                            </Flex>
                            {/* <br />
                        <br /> */}
                            <div className='form-fields'>
                                <VStack spacing={'5px'}>

                                    {/* -------------------------- Name ---------------------------- */}
                                    <FormControl id='first-name' isRequired>
                                        <FormLabel >Name</FormLabel>
                                        <Input
                                            placeholder='Enter Your Name'
                                            onChange={(e) => setName(e.target.value)}
                                        >
                                        </Input>
                                    </FormControl>

                                    {/* - ---------------------------- Email ---------------------------- */}

                                    <FormControl id='email' isRequired>
                                        <FormLabel >Email</FormLabel>
                                        <Input
                                            placeholder='Enter Your Email'
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
                                    {/* --------------- Confirm Password ---------------- */}

                                    <FormControl id='confirm-password' isRequired>
                                        <FormLabel > Confirm Password</FormLabel>
                                        <InputGroup >
                                            <Input
                                                type={show ? "text" : "password"}
                                                placeholder='Enter Your Password'
                                                onChange={(e) => setConfirmPassword(e.target.value)}
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

                                    {/* ----------------------- Image ---------------------------- */}

                                    <FormControl>
                                        <FormLabel>Profile Picture</FormLabel>
                                        <Input type='file' p={1.5} accept='image/*' onChange={(e) => postDetails(e.target.files[0])} />
                                    </FormControl>


                                    <FormControl >
                                        <FormLabel> Select Langauge for Translation </FormLabel>
                                        <Select
                                            options={languages}
                                            // placeholder='English'
                                            // isMulti
                                            onChange={(e) => setPreferredLanguage(e.code)}
                                        // onChange={(selectedOptions) =>
                                        // setPreferredLanguage(selectedOptions.map((option) => option.value))
                                        // }
                                        />
                                    </FormControl>

                                    {/* <Button
                                        width={'100%'}
                                        color='white'
                                        style={{ marginTop: 15 }}
                                        onClick={submitHandler}
                                        isLoading={loading}
                                    >Submit</Button> */}
                                </VStack>
                            </div>
                            <Button
                                mt={4}
                                style={{
                                    // backgroundColor: '#ff7f6eff',
                                    color: 'white',
                                    width: '100%',
                                }}
                                colorScheme='whatsapp'
                                isLoading={loading}
                                onClick={submitHandler}
                                type="submit"
                                size="lg"
                            >
                                Sign Up
                            </Button>
                            <br />
                            Already have an account?{' '}
                            <NavLink
                                style={{
                                    color: '#0000f2ff',
                                    textDecoration: 'none',
                                }}
                                to="/login"
                            >
                                Login
                            </NavLink>
                        </form>
                    </Flex>
                </Flex >
            </div >
        </VStack>

    )
}

export default SignUp
