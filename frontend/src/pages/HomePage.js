import { Box, Container, Text, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'
import { useNavigate } from 'react-router-dom'




const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chats")
    }
  }, [navigate]);

  return (
    <Container maxW='100%' align={'center'}  >
      {/* <Box
        d='flex'
        justifyContent='center'
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius={"lg"}
        borderWidth={"1px"}
      >

        <Text fontSize='4xl' fontFamily='Work sans' color='black'> VishwaVarta </Text>
      </Box> */}
      <Box bg={'white'} w={'100%'} p={4}   >

        <Tabs colorScheme='whatsapp'   >
          <Box display="flex" justifyContent="center" mb={'1em'}>
            <TabList>
              <Tab width={'50%'}>Login</Tab>
              <Tab width={'50%'}>SignUp</Tab>
            </TabList>
          </Box>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage
