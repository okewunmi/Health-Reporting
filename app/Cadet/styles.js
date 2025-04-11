"use client"
import styled from 'styled-components';

export const Body = styled.div `
display: flex;
align-items: center;
justify-content: center;
background-color: #ffff;
height: 100vh;
width: 100vw;
`

export const Wrapper = styled.div `
border: 1px solid rgb(189, 189, 189);
  display: flex;
  gap:10px;
  align-items: center;
  width: 98vw;
  height: 96vh;
  margin:10px;
  border-radius: 11px;


`
export const MainPage = styled.div `
width: 80%;
padding: 20px;
background-color:rgb(239, 252, 239);
height: 100%;
display: flex;
flex-direction: column;
border-top-right-radius:13px;
border-bottom-right-radius:13px;

.heading{
border-bottom: 2px solid #cecece;
padding-bottom: 15px;

&__great{
padding-left:20px;
font-size:25px;
font-weight:light;
 font-family: monospace;
 color: #000
}
 &__p{
padding-left:20px;
font-size:14px;
font-weight:light;
 font-family: monospace;
 color:rgb(102, 102, 102)
}
}

`