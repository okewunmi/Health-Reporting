"use client"
import styled from 'styled-components';

export const Wrapper = styled.div`
width: 20%;
background-color: #5F8D4E;
border-top-left-radius: 10px;
border-bottom-left-radius: 10px;
height: 100%;
font-family: monospace;
`

export const Content = styled.div`
margin-left: 10px;
border-right: 1px solid #ececec;
height: 100%;

display: flex;
flex-direction: column;

.imageBox{
padding: 20px 0 ;
align-items: center;
justify-self: center;
display: flex;
flex-direction: column;
gap: 6px;
background-color: #ffff;
height: 35%;
border-bottom-left-radius: 30px;


&__title{
  font-size: 18px;
  font-weight: 600;
  color: grey
  
  }
}

.image{
border-radius: 100%;
width: 150px;
height: 150px;
border: 3px solid #cecece;
display: flex;
padding: 3px;


&_img{
width: 100%;
height: 100%;
object-fit: fit;
border-radius: 100%;
}
}

`
export const Nav = styled.div`
border-top-left-radius: 30px;
height: 100%;
width: 100%;
background-color: #ffff;
display: flex;
flex-direction: column;
align-items: start;



.btn{
display: flex;
padding: 10px 25px;
align-self: start;
width: 85%;
background-color: #ffff;
border-radius: 40px;
color:rgb(101, 106, 119);
font-weight: 600;
align-items: center;
gap: 8px;
font-size: 17px;
border: none;
cursor: pointer; 
transition: all 0.3s ease; 
// margin-left: -.2rem;

&.active { 
      background-color: #5F8D4E;
      color: white;
      border-bottom-left-radius: 0px;
      border-top-left-radius: 0px;
      // transform: translateX(5px);
      box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
    }

}


`
export const Footer = styled.div`
display: flex;
background-color: #ffff;
padding:20px 35px ;
color: #000;
border-top: 1px solid #ececec; 


  .btn-LogOut{
   display: flex;
   align-items: center;
   color:rgb(0, 0, 0);
   font-weight: 600;
   gap:.5rem;
   font-size: 16px;
    border: none; 
    cursor: pointer; 
    transition: all 0.3s ease; 

    &:hover {
     transform: scale(1.1);
      color:rgb(101, 106, 119);
    }
  }

`