"use client"
import React from 'react'
import { Wrapper, Container, LogoContainer, FormContainer,  Footer } from './styled'
import Link from 'next/link'
import Image from "next/image";

const SignUp = () => {
  return (
    <Wrapper>


      <Container >
        <LogoContainer>
          <Image

            src="/logo.jpeg"
            alt="Next.js logo"
            width={90}
            height={50}
            priority
          />
          <h1 className='title'>Signup</h1>
          <p className='Subtitle'>Create a new account</p>
        </LogoContainer>
        <form >
          <FormContainer>

            <div className='level'>
              <input className='inputBox level1' type="text" placeholder="Surname" required />
              <input className='inputBox level2' type="text" placeholder="Other Names" required />
            </div>
            <input className='inputBox' type="email" placeholder="Email" required />
            <div className='level pic'>
              <input className='inputBox' type="file" placeholder="Profile Picture" required />
              <p className='level2 '> add picture </p>
            </div>

            <div className='level '>
              <input className='inputBox level1' type="text" placeholder="PhoneNumber" required />
              <input className='inputBox level2' type="text" placeholder="NDA Number" required />
            </div>
            <input className='inputBox' type="text" placeholder="Department" required />
            <div className='level'>
              <input className='inputBox level1' type="text" placeholder="Course" required />
              <input className='inputBox level2' type="text" placeholder="Level" required />
            </div>
            <input className='inputBox' type="password" placeholder="Create Password" required />

            {/* <ButtonContainer>
            <button onClick={console.log('press')}> submit</button>
          </ButtonContainer> */}
            <input className='btn' type="submit" placeholder="Create Password" required />

          </FormContainer>
          <Footer>
            <p>Already have an account?</p>
            <Link href='/signIn' className='link'>Sign In</Link>
          </Footer>
        </form>
      </Container >

    </Wrapper>
  )
}

export default SignUp