

import PropTypes from 'prop-types';
import React from 'react'
import { Content, Nav, Wrapper, Footer } from './styles'
import Image from 'next/image'
import { IoHome, IoNotifications, IoPerson } from "react-icons/io5";
import { FaFileMedical } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/appwrite';

// @ts-nocheck
const SideBar = ({ pushComponent, replaceComponent, popComponent, currentView }) => {
  const router = useRouter();
  // Navigation items configuration
  const navItems = [
    { 
      id: 'home', 
      icon: <IoHome size={25} />, 
      label: 'Home',
      action: () => replaceComponent('home') // Home should replace current view
    },
    { 
      id: 'request', 
      icon: <FaFileMedical size={25} />, 
      label: 'Request Leave',
      action: () => pushComponent('request')
    },
    { 
      id: 'notifications', 
      icon: <IoNotifications size={25} />, 
      label: 'Notifications',
      action: () => pushComponent('notifications')
    },
    { 
      id: 'profile', 
      icon: <IoPerson size={25} />, 
      label: 'Profile',
      action: () => pushComponent('profile')
    }
  ];

  
  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/signIn'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Wrapper>
      <Content>
        <div className='imageBox'>
          <div className='image'>
            <Image 
              className='image_img' 
              src='/profile.jpg' 
              width={100} 
              height={100}  
              priority 
              alt="profile"
            />
          </div>
          <h1 className='imageBox__title'>Anikulapokuti</h1>
        </div>

        <Nav>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`btn ${currentView === item.id ? 'active' : ''}`}
              onClick={item.action}
            >
              {item.icon} {item.label}
            </button>
          ))}
          
          {/* Back button when not on home */}
          {currentView !== 'home' && (
            <button className='btn back-btn' onClick={popComponent}>
              ← Back
            </button>
          )}
        </Nav>

        <Footer>
          <button className='btn-LogOut' onClick={handleLogout}>
            <IoHome size={25} /> Log Out
          </button>
        </Footer>
      </Content>
    </Wrapper>
  )
}

SideBar.propTypes = {
  pushComponent: PropTypes.func.isRequired, // or .func if not required
  replaceComponent: PropTypes.func.isRequired,
  popComponent: PropTypes.func.isRequired,
  currentView: PropTypes.any.isRequired // Use more specific type if possible (string, number, etc.)
};

export default SideBar
