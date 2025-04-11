"use client"
import styled from 'styled-components';


export const Wrapper = styled.div`
margin:2rem  1rem;
display: flex;
justify-content: space-between;

 .box{
height: 14rem;
width: 19rem;
border-radius: 1rem;
padding: .7rem;
color: #ffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

&__heading{
font-size:3rem;
// font-weight: lighter;
}

&__txt{
font-size:1.7rem;
font-weight: lighter;
}

 }
.red{
background-color:rgb(243, 234, 107);
}
.yellow{
background-color:rgba(231, 81, 81, 0.9);
}
.grey{
background-color:rgb(123, 170, 111);
}
`;