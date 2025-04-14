// import React from 'react'
// import { Wrapper } from './styles'

// const page = () => {
//     return (
//         <Wrapper>
//             <h1 className='head'>Request Form</h1>
//             <div className='form'>
//                 <div>
//                     <p className='form__label'>Reason for Leave:</p>
//                     <input className='form__input' type="text" placeholder="Brief description of the reason for the health leave (e.g., illness, injury, medical appointment )" required />
//                 </div>

//                 <div className='form__Date'>
//                     <div className='form__Date_one'>
//                         <p className='form__label'>Starting date of Leave:</p>
//                         <input type='datetime-local' className='form__input' />
//                     </div>

//                     <div className='form__Date_two'>
//                         <p className='form__label'>Ending date of Leave:</p>
//                         <input type='datetime-local' className='form__input' />
//                     </div>

//                 </div>
//                 <div className='form__Date'>
//                     <div className='form__Date_one'>
//                         <p className='form__label'>Number of Days:</p>
//                         <input type='text' className='form__input' />
//                     </div>

//                     <div className='form__Date_two'>
//                         <p className='form__label'>Types of  Leave:</p>
//                         <input type='text' className='form__input' />
//                     </div>

//                 </div>
//                 <div>
//                 <p className='form__label'>Attach Medical Document:</p>
//                 <input type='file' className='form__input' />
//                 </div>

//                 <div className='form__btn'>
//                 <button >Submit a request</button>
//                 </div>
               
//             </div>

//         </Wrapper>
//     )
// }

// export default page

"use client"
import React, { useState } from 'react'
import { Wrapper } from './styles'
import { submitLeaveRequest } from '@/lib/appwrite'
import { useRequests } from '../../Context/RequestContexts'

const RequestForm = () => {
    
  const [formData, setFormData] = useState({
    reason: '',
    startDate: '',
    endDate: '',
    days: '',
    type: ''
  })
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { incrementCount } = useRequests()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await submitLeaveRequest(formData, document)
      alert('Request submitted successfully!')
      incrementCount('total') // Increment the total count
      // Reset form
      setFormData({
        reason: '',
        startDate: '',
        endDate: '',
        days: '',
        type: ''
      })
      setDocument(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Wrapper>
      <h1 className='head'>Request Form</h1>
      <form className='form' onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        
        <div>
          <p className='form__label'>Reason for Leave:</p>
          <input 
            className='form__input' 
            type="text" 
            name="reason"
            placeholder="Brief description of the reason for the health leave" 
            value={formData.reason}
            onChange={handleChange}
            required 
          />
        </div>

        <div className='form__Date'>
          <div className='form__Date_one'>
            <p className='form__label'>Starting date of Leave:</p>
            <input 
              type='datetime-local' 
              className='form__input' 
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form__Date_two'>
            <p className='form__label'>Ending date of Leave:</p>
            <input 
              type='datetime-local' 
              className='form__input' 
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className='form__Date'>
          <div className='form__Date_one'>
            <p className='form__label'>Number of Days:</p>
            <input 
              type='text' 
              className='form__input' 
              name="days"
              value={formData.days}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form__Date_two'>
            <p className='form__label'>Types of Leave:</p>
            <input 
              type='text' 
              className='form__input' 
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <p className='form__label'>Attach Medical Document:</p>
          <input 
            type='file' 
            className='form__input' 
            onChange={(e) => setDocument(e.target.files[0])}
          />
        </div>

        <div className='form__btn'>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default RequestForm