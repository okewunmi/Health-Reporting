import React from 'react'
import { Content, Nav, Wrapper , Footer} from './styles'
import Image from 'next/image'
import { IoHome, IoNotifications, IoPerson } from "react-icons/io5";
import { FaFileMedical } from "react-icons/fa";

const page = () => {
  return (
    <Wrapper>
      <Content>
        <div className='imageBox'>
          <div className='image'>
            <Image className='image_img' src='/profile.jpg' width={100} height={100}  priority alt="profile"/>
          </div>
        <h1 className='imageBox__title'>Anikulapokuti</h1>
        </div>

        <Nav>
          
          <button className='btn'> <IoHome  size={25} /> Home</button>
          <button className='btn'> <FaFileMedical size={25} /> Request Leave</button>
          <button className='btn'>  <IoNotifications size={25} /> Notifications</button>
          <button className='btn'> <IoPerson size={25} /> Profile</button>
        </Nav>
        <Footer>
        <button className='btn'> <IoHome  size={25} /> Log Out</button>
        </Footer>
      </Content>
    </Wrapper>
  )
}

export default page
