// "use client"
// import React from 'react'
// import { Wrapper, Container, LogoContainer, FormContainer,  Footer } from './styled'
// import Link from 'next/link'
// import Image from "next/image";

// const SignUp = () => {
//   return (
//     <Wrapper>


//       <Container >
//         <LogoContainer>
//           <Image

//             src="/logo.jpeg"
//             alt="Next.js logo"
//             width={90}
//             height={50}
//             priority
//           />
//           <h1 className='title'>Signup</h1>
//           <p className='Subtitle'>Create a new account</p>
//         </LogoContainer>
//         <form >
//           <FormContainer>

//             <div className='level'>
//               <input className='inputBox level1' type="text" placeholder="Surname" required />
//               <input className='inputBox level2' type="text" placeholder="Other Names" required />
//             </div>
//             <input className='inputBox' type="email" placeholder="Email" required />
//             <div className='level pic'>
//               <input className='inputBox' type="file" placeholder="Profile Picture" required />
//               <p className='level2 '> add picture </p>
//             </div>

//             <div className='level '>
//               <input className='inputBox level1' type="text" placeholder="PhoneNumber" required />
//               <input className='inputBox level2' type="text" placeholder="NDA Number" required />
//             </div>
//             <input className='inputBox' type="text" placeholder="Department" required />
//             <div className='level'>
//               <input className='inputBox level1' type="text" placeholder="Course" required />
//               <input className='inputBox level2' type="text" placeholder="Level" required />
//             </div>
//             <input className='inputBox' type="password" placeholder="Create Password" required />

//             {/* <ButtonContainer>
//             <button onClick={console.log('press')}> submit</button>
//           </ButtonContainer> */}
//             <input className='btn' type="submit" placeholder="Create Password" required />

//           </FormContainer>
//           <Footer>
//             <p>Already have an account?</p>
//             <Link href='/signIn' className='link'>Sign In</Link>
//           </Footer>
//         </form>
//       </Container >

//     </Wrapper>
//   )
// }

// export default SignUp

"use client"
import React, { useState, useRef } from 'react'
import { Wrapper, Container, LogoContainer, FormContainer, Footer } from './styled'
import Link from 'next/link'
import Image from "next/image";
import { createUserAccount } from '../../lib/appwrite';


const SignUp = () => {
    const [formData, setFormData] = useState({
        surname: '',
        otherNames: '',
        email: '',
        phoneNumber: '',
        ndaNumber: '',
        department: '',
        course: '',
        level: '',
        password: ''
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createUserAccount(formData, profilePicture);
            // Redirect to dashboard after successful signup
            window.location.href = '/Cadet/';
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <Container>
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
                <form onSubmit={handleSubmit}>
                    <FormContainer>
                        {error && <p className="error">{error}</p>}

                        <div className='level'>
                            <input
                                className='inputBox level1'
                                type="text"
                                name="surname"
                                placeholder="Surname"
                                value={formData.surname}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className='inputBox level2'
                                type="text"
                                name="otherNames"
                                placeholder="Other Names"
                                value={formData.otherNames}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <input
                            className='inputBox'
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <div className='level pic'>
                            <input
                                ref={fileInputRef}
                                className='inputBox'
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <button
                                type="button"
                                className='level2'
                                onClick={() => fileInputRef.current.click()}
                            >
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Profile preview"
                                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                    />
                                ) : (
                                    'Add Picture'
                                )}
                            </button>
                        </div>
                        <div className='level'>
                            <input
                                className='inputBox level1'
                                type="text"
                                name="phoneNumber"
                                placeholder="PhoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className='inputBox level2'
                                type="text"
                                name="ndaNumber"
                                placeholder="NDA Number"
                                value={formData.ndaNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <input
                            className='inputBox'
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        />
                        <div className='level'>
                            <input
                                className='inputBox level1'
                                type="text"
                                name="course"
                                placeholder="Course"
                                value={formData.course}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className='inputBox level2'
                                type="text"
                                name="level"
                                placeholder="Level"
                                value={formData.level}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <input
                            className='inputBox'
                            type="password"
                            name="password"
                            placeholder="Create Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className='btn'
                            type="submit"
                            value={loading ? "Creating account..." : "Sign Up"}
                            disabled={loading}
                        />
                    </FormContainer>
                    <Footer>
                        <p>Already have an account?</p>
                        <Link href='/signIn' className='link'>Sign In</Link>
                    </Footer>
                </form>
            </Container>
        </Wrapper>
    )
}

export default SignUp;