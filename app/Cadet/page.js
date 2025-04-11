import React from 'react'
import { MainPage, Wrapper, Body } from './styles'
import SideBar from '../../components/sideBar/page'
import HomeCard from '../../components/HomeCard/page'
import Request from '../../components/Request/page'

const page = () => {
  return (
<Body>
    <Wrapper>
      <SideBar />
      <MainPage>
       <div className='heading'>
         <h1 className='heading__great'>Good Morning, Anikulapokuti!</h1>
         <p className='heading__p'>Happiness is nothing more than good health</p>
       </div>
       {/* <HomeCard/> */}
       <Request/>
      </MainPage>
    </Wrapper>
    </Body>
  )
}

export default page
