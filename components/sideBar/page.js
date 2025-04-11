// import React from 'react'
// import { Content, Nav, Wrapper , Footer} from './styles'
// import Image from 'next/image'
// import { IoHome, IoNotifications, IoPerson } from "react-icons/io5";
// import { FaFileMedical } from "react-icons/fa";

// const page = () => {
//   return (
//     <Wrapper>
//       <Content>
//         <div className='imageBox'>
//           <div className='image'>
//             <Image className='image_img' src='/profile.jpg' width={100} height={100}  priority alt="profile"/>
//           </div>
//         <h1 className='imageBox__title'>Anikulapokuti</h1>
//         </div>

//         <Nav>
          
//           <button className='btn'> <IoHome  size={25} /> Home</button>
//           <button className='btn'> <FaFileMedical size={25} /> Request Leave</button>
//           <button className='btn'>  <IoNotifications size={25} /> Notifications</button>
//           <button className='btn'> <IoPerson size={25} /> Profile</button>
//         </Nav>
//         <Footer>
//         <button className='btn'> <IoHome  size={25} /> Log Out</button>
//         </Footer>
//       </Content>
//     </Wrapper>
//   )
// }

// export default page


import React from 'react'
import { Content, Nav, Wrapper, Footer } from './styles'
import Image from 'next/image'
import { IoHome, IoNotifications, IoPerson } from "react-icons/io5";
import { FaFileMedical } from "react-icons/fa";

const SideBar = ({ pushComponent, replaceComponent, popComponent, currentView }) => {
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

  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
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

export default SideBar