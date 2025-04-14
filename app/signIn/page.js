// // "use client"
// // import React from 'react'
// // import { Wrapper, Container, LogoContainer, FormContainer, Footer} from '../signUp/styled'
// // import Link from 'next/link'
// // import Image from "next/image";
// // const SignUp = () => {
// //   return (
// //     <Wrapper>

// //       <Container >
// //         <LogoContainer>
// //           <Image
                   
// //                     src="/logo.jpeg"
// //                     alt="Next.js logo"
// //                     width={90}
// //                     height={90}
// //                     priority
// //                   />
// //           <h1 className='title'>SignIn</h1>
// //           <p className='Subtitle'>Login into your account</p>
// //         </LogoContainer>
       
// //         <FormContainer>
           
// //           <input className='inputBox' type="email" placeholder="Email" required />

          
// //           <input className='inputBox' type="password" placeholder=" Password" required />

// //           {/* <ButtonContainer>
// //             <button onClick={console.log('press')}> submit</button>
// //           </ButtonContainer> */}
// //           <input className='btn' type="submit"  required />
          
// //         </FormContainer>
// //         <Footer>
// //                   <p>Don&apos;t have an account?</p>
// //                   <Link href='/signUp' className='link'>Sign Up</Link>
// //                 </Footer>
// //       </Container >

// //     </Wrapper>
// //   )
// // }

// // export default SignUp

// "use client"
// import React, { useState } from 'react'
// import { Wrapper, Container, LogoContainer, FormContainer, Footer } from '../signUp/styled'
// import Link from 'next/link'
// import Image from "next/image"
// import {signIn } from '../../lib/appwrite'
// import { useRouter } from 'next/navigation'

// const SignIn = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const router = useRouter()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')
  
//     try {
//       await signIn(email, password)
//       router.push('/Cadet')
//     } catch (err) {
//       setError(err.message || 'Login failed')
//     } finally {
//       setLoading(false)
//     }
//   }
//   return (
//     <Wrapper>
//       <Container>
//         <LogoContainer>
//           <Image
//             src="/logo.jpeg"
//             alt="App logo"
//             width={90}
//             height={90}
//             priority
//           />
//           <h1 className='title'>Sign In</h1>
//           <p className='Subtitle'>Login to your account</p>
//         </LogoContainer>
       
//         <FormContainer onSubmit={handleSubmit}>
//           {error && (
//             <div className="error-message">
//               {error}
//             </div>
//           )}
          
//           <input 
//             className='inputBox' 
//             type="email" 
//             placeholder="Email" 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             disabled={loading}
//           />
          
//           <input 
//             className='inputBox' 
//             type="password" 
//             placeholder="Password" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             disabled={loading}
//           />

//           <button 
//             className='btn' 
//             type="submit"
//             disabled={loading}
//             onSubmit={handleSubmit}
//           >
//             {loading ? (
//               <span className="loading-indicator">Signing In...</span>
//             ) : (
//               'Sign In'
//             )}
//           </button>
//         </FormContainer>
        
//         <Footer>
//           <p>Don&apos;t have an account?</p>
//           <Link href='/signUp' className='link'>
//             Sign Up
//           </Link>
//         </Footer>
//       </Container>

//       <style jsx>{`
//         .error-message {
//           color: #ff3333;
//           background: #ffeeee;
//           padding: 12px;
//           border-radius: 4px;
//           margin-bottom: 16px;
//           text-align: center;
//         }
//         .loading-indicator {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//         }
//         .loading-indicator::after {
//           content: "";
//           width: 16px;
//           height: 16px;
//           border: 2px solid transparent;
//           border-top-color: white;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//         button:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }
//       `}</style>
//     </Wrapper>
//   )
// }

// export default SignIn

"use client"
import React, { useState } from 'react'
import { Wrapper, Container, LogoContainer, FormContainer, Footer } from '../signUp/styled'
import Link from 'next/link'
import Image from "next/image"
import { signIn } from '../../lib/appwrite'
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
  
    try {
      console.log('Attempting sign in...') // Debug log
      await signIn(email, password)
      console.log('Sign in successful, redirecting...') // Debug log
      router.push('/Cadet')
    } catch (err) {
      console.error('Sign in error:', err) // Debug log
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Wrapper>
      <Container>
        <LogoContainer>
          <Image
            src="/logo.jpeg"
            alt="App logo"
            width={90}
            height={90}
            priority
          />
          <h1 className='title'>Sign In</h1>
          <p className='Subtitle'>Login to your account</p>
        </LogoContainer>
       
        {/* Ensure FormContainer renders as a form */}
        <FormContainer as="form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <input 
            className='inputBox' 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          
          <input 
            className='inputBox' 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <button 
            className='btn' 
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-indicator">Signing In...</span>
            ) : (
              'Sign In'
            )}
          </button>
        </FormContainer>
        
        <Footer>
          <p>Don&apos;t have an account?</p>
          <Link href='/signUp' className='link'>
            Sign Up
          </Link>
        </Footer>
      </Container>

      <style jsx>{`
        .error-message {
          color: #ff3333;
          background: #ffeeee;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 16px;
          text-align: center;
        }
        .loading-indicator {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .loading-indicator::after {
          content: "";
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </Wrapper>
  )
}

export default SignIn