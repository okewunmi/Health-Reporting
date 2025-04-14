// 'use client'
// import React, { useState } from 'react' 
// import { MainPage, Wrapper, Body } from './styles'
// import SideBar from '../../components/sideBar/page'
// import HomeCard from '../../components/HomeCard/page'
// import Request from '../../components/Request/page'

// // Component mapping for easy reference
// const componentMap = {
//   home: HomeCard,
//   request: Request,
//   // settings: Settings,
//   // profile: Profile
//   // Add more components here as needed
// }


// const page = () => {

//  // Initialize stack with home component
//  const [componentStack, setComponentStack] = useState(['home']);

//  // Push a new component onto the stack
//  const pushComponent = (componentName) => {
//    if (componentMap[componentName]) {
//      setComponentStack(prevStack => [...prevStack, componentName]);
//    }
//  };

//  // Pop the current component from the stack (go back)
//  const popComponent = () => {
//    if (componentStack.length > 1) {
//      setComponentStack(prevStack => prevStack.slice(0, -1));
//    }
//  };

//  // Replace current component (for direct navigation without stacking)
//  const replaceComponent = (componentName) => {
//    if (componentMap[componentName]) {
//      setComponentStack(prevStack => [...prevStack.slice(0, -1), componentName]);
//    }
//  };

//  // Get current component to render
//  const currentComponent = componentStack[componentStack.length - 1];
//  const CurrentComponent = componentMap[currentComponent] || HomeCard;

//   return (
// <Body>
//     <Wrapper>
//       <SideBar pushComponent={pushComponent}
//           replaceComponent={replaceComponent}
//           popComponent={popComponent}
//           currentView={currentComponent}
//           componentList={Object.keys(componentMap)} // Pass all available components
//             />

//       <MainPage>
//        <div className='heading'>
//          <h1 className='heading__great'>Good Morning, Anikulapokuti!</h1>
//          <p className='heading__p'>Happiness is nothing more than good health</p>
//        </div>
//        <HomeCard/>
//        <Request/>
//       </MainPage>
//     </Wrapper>
//     </Body>
//   )
// }

// export default page

// 'use client'
// import React, { useState } from 'react'
// import { MainPage, Wrapper, Body } from './styles'
// import SideBar from '../../components/sideBar/page'
// import HomeCard from '../../components/HomeCard/page'
// import Request from '../../components/Request/page'
// import Notification from '../../components/Notify/page'
// // import Settings from '../../components/Settings/page' // Example additional component
// import Profile from '../../components/Profile/page'

// // Component mapping for easy reference
// const componentMap = {
  
//   home: HomeCard,
//   request: Request,
//   notifications:Notification,
//   // settings: Settings,
//   profile: Profile
//   // Add more components here as needed
// }

// const Page = () => {
//   // Initialize stack with home component
//   const [componentStack, setComponentStack] = useState(['home']);

//   // Push a new component onto the stack
//   const pushComponent = (componentName) => {
//     if (componentMap[componentName]) {
//       setComponentStack(prevStack => [...prevStack, componentName]);
//     }
//   };

//   // Pop the current component from the stack (go back)
//   const popComponent = () => {
//     if (componentStack.length > 1) {
//       setComponentStack(prevStack => prevStack.slice(0, -1));
//     }
//   };

//   // Replace current component (for direct navigation without stacking)
//   const replaceComponent = (componentName) => {
//     if (componentMap[componentName]) {
//       setComponentStack(prevStack => [...prevStack.slice(0, -1), componentName]);
//     }
//   };

//   // Get current component to render
//   const currentComponent = componentStack[componentStack.length - 1];
//   const CurrentComponent = componentMap[currentComponent] || HomeCard;

//   return (
//     <Body>
//       <Wrapper>
//         <SideBar 
//           pushComponent={pushComponent}
//           replaceComponent={replaceComponent}
//           popComponent={popComponent}
//           currentView={currentComponent}
//           componentList={Object.keys(componentMap)} // Pass all available components
//         />
//         <MainPage>
//           <div className='heading'>
//             <h1 className='heading__great'>Good Morning, Anikulapokuti!</h1>
//             <p className='heading__p'>Happiness is nothing more than good health</p>
//           </div>
//           <CurrentComponent 
//             navigate={pushComponent} // Pass navigation to child components
//             goBack={popComponent}
//           />
//         </MainPage>
//       </Wrapper>
//     </Body>
//   )
// }

// export default Page

'use client'
import React, { useState } from 'react'
import { MainPage, Wrapper, Body } from './styles'
import SideBar from '../../components/sideBar/page'
import HomeCard from '../../components/HomeCard/page'
import Request from '../../components/Request/page'
import Notification from '../../components/Notify/page'
import Profile from '../../components/Profile/page'
import { useRequests } from '@/Context/RequestContexts'

const componentMap = {
  home: HomeCard,
  request: Request,
  notifications: Notification,
  profile: Profile
}

const Page = () => {
  const { user, loading } = useRequests()
  const [componentStack, setComponentStack] = useState(['home'])

  // Push a new component onto the stack
  const pushComponent = (componentName) => {
    if (componentMap[componentName]) {
      setComponentStack(prevStack => [...prevStack, componentName])
    }
  }

  // Pop the current component from the stack (go back)
  const popComponent = () => {
    if (componentStack.length > 1) {
      setComponentStack(prevStack => prevStack.slice(0, -1))
    }
  }

  // Replace current component (for direct navigation without stacking)
  const replaceComponent = (componentName) => {
    if (componentMap[componentName]) {
      setComponentStack(prevStack => [...prevStack.slice(0, -1), componentName])
    }
  }

  // Get current component to render
  const currentComponent = componentStack[componentStack.length - 1]
  const CurrentComponent = componentMap[currentComponent] || HomeCard

  if (loading) {
    return (
      <Body>
        <div>Loading user data...</div>
      </Body>
    )
  }

  return (
    <Body>
      <Wrapper>
        <SideBar 
          pushComponent={pushComponent}
          replaceComponent={replaceComponent}
          popComponent={popComponent}
          currentView={currentComponent}
          componentList={Object.keys(componentMap)}
        />
        <MainPage>
          <div className='heading'>
            <h1 className='heading__great'>
              Good Morning, {user?.surname || user?.otherNames || 'User'}!
            </h1>
            <p className='heading__p'>Happiness is nothing more than good health</p>
          </div>
          <CurrentComponent 
            navigate={pushComponent}
            goBack={popComponent}
          />
        </MainPage>
      </Wrapper>
    </Body>
  )
}

export default Page