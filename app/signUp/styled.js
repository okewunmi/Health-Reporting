"use client"
import styled from 'styled-components';


export const Wrapper = styled.div`
  display: flex;
  padding: 2rem;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  color: black;
  
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 24rem; /* Equivalent to max-w-sm */
  gap: 2rem;
  padding: 2rem 1.5rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  .title {
   font-size: 1.5rem;
  font-weight: 600;
  color: black;
  }

  .Subtitle {
  font-size: 0.875rem;
  color: var(--color-muted-foreground, #6b7280);
  }

`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: var(--color-muted-foreground, #6b7280);
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;

.inputBox{
border: 1px solid #cccc;
outline: none;
width: 100%;
border-radius:7px;
padding: 0.3rem;
font-size:13px;
font-weight: 350;


&:focus{
border: 1px solid red
}
  }

  .level{
  display :flex;
  gap: 1rem;
  width: 100%;
  align-items: center;
color: grey;
  }
  .level1{
  width: 50%;
  }
.level2{
  width: 50%;
  }
  .pic {
  font-size: 14px;
  }

  .btn{
  width: 100%;
  color: white;
  background-color: rgba(0,0,0);
  border-radius:.5rem;
  height: 2.3rem;
  cursor: pointer;
  
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: white;
  background-color: rgba(0,0,0);
  border-radius:.5rem;
  height: 2rem;
  cursor: pointer;
`;

export const Footer = styled.div`
  display: flex;
  margin-top:30px;
  justify-content: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--color-muted-foreground, #6b7280);

  .link{
  color: black
  }
`;