import React from 'react'
import { Wrapper } from './styles'

const page = () => {
  return (
    <Wrapper>
       <div className='box red'>
        <h1 className='box__heading'>0</h1>
        <p className='box__txt'>Request</p>
      
       </div>
       <div className='box yellow'>
        <h1 className='box__heading'>0</h1>
        <p className='box__txt'>Rejected</p>
       </div>
       <div className='box grey'>
        <h1 className='box__heading'>0</h1>
        <p className='box__txt'>Approved</p>
       </div>
       
      
    </Wrapper>
  )
}

export default page
