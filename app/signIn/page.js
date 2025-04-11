"use client"
import React from 'react'
import { Wrapper, Container, LogoContainer, FormContainer, Footer} from '../signUp/styled'
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
                    height={90}
                    priority
                  />
          <h1 className='title'>SignIn</h1>
          <p className='Subtitle'>Login into your account</p>
        </LogoContainer>
       
        <FormContainer>
           
          <input className='inputBox' type="email" placeholder="Email" required />

          
          <input className='inputBox' type="password" placeholder=" Password" required />

          {/* <ButtonContainer>
            <button onClick={console.log('press')}> submit</button>
          </ButtonContainer> */}
          <input className='btn' type="submit"  required />
          
        </FormContainer>
        <Footer>
                  <p>Don&apos;t have an account?</p>
                  <Link href='/signUp' className='link'>Sign Up</Link>
                </Footer>
      </Container >

    </Wrapper>
  )
}

export default SignUp