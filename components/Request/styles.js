"use client"
import styled from 'styled-components';

export const Wrapper = styled.div `
margin: 1.3rem  1rem;
width: "100%";
height: "100%";
display: flex;
gap: .7rem;
flex-direction: column;
 font-family: monospace;


.head{
color:rgb(80, 80, 80);
font-size: 1.1rem;
font-weight: 600;
 font-family: monospace;
// align-self: center;

}

.form{
border: 1px solid #cecece;
width: 80%;
height: 27rem;
border-radius: 1rem;
padding: 1.2rem ;
color: #000;
display: flex;
flex-direction: column;
gap: 1.3rem;
// align-self: center;

&__btn{

display: flex;
align-items: center;
justify-content: center;

button{
padding: .5rem 2rem;
background-color:rgb(97, 201, 0);
border-radius: .7rem;
font-weight: 600;
font-size: 1rem;
cursor: pointer;

}
}

&__label{
color:rgb(44, 15, 15);
font-weight: 600;
font-size: .9rem;
margin-bottom: .2rem

}

&__input{
width: 100%;
border: 1px solid rgb(163, 163, 163);
padding: .5rem .7rem;
border-radius: .6rem;
outline: none;
font-size: .9rem;
color:rgb(0, 0, 0);
}

&__Date{
display: flex;
gap:3rem;
justify-content: space-between;


&_one{
width: 50%;
}
&_two{
width: 50%;
}
}

}
`