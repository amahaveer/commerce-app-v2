import Checkout from '@/components/CheckoutPage/Checkout'
import React from 'react'

const page = ({slug} : any) => {
  return (
    <div className='bg-[var(--tp-common-grey-background)]'>
      <Checkout /> 
    </div>
  )
}

export default page
