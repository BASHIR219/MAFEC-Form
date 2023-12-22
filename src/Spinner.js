import React from 'react'
import { RingLoader } from 'react-spinners';

export default function Spinner() {
  return (
    <div className="spinner">
      <RingLoader size={150} color={'#4900FF'} loading={true} />
    </div>
  )
}
