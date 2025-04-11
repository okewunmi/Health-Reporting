import React from 'react'
import { Wrapper } from './styles'

const page = () => {
    return (
        <Wrapper>
            <h1 className='head'>Request Form</h1>
            <div className='form'>
                <div>
                    <p className='form__label'>Reason for Leave:</p>
                    <input className='form__input' type="text" placeholder="Brief description of the reason for the health leave (e.g., illness, injury, medical appointment )" required />
                </div>

                <div className='form__Date'>
                    <div className='form__Date_one'>
                        <p className='form__label'>Starting date of Leave:</p>
                        <input type='datetime-local' className='form__input' />
                    </div>

                    <div className='form__Date_two'>
                        <p className='form__label'>Ending date of Leave:</p>
                        <input type='datetime-local' className='form__input' />
                    </div>

                </div>
                <div className='form__Date'>
                    <div className='form__Date_one'>
                        <p className='form__label'>Number of Days:</p>
                        <input type='text' className='form__input' />
                    </div>

                    <div className='form__Date_two'>
                        <p className='form__label'>Types of  Leave:</p>
                        <input type='text' className='form__input' />
                    </div>

                </div>
                <div>
                <p className='form__label'>Attach Medical Document:</p>
                <input type='file' className='form__input' />
                </div>

                <div className='form__btn'>
                <button >Submit a request</button>
                </div>
               
            </div>

        </Wrapper>
    )
}

export default page