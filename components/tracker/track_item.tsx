import React from 'react'

function TrackItem( { item }:any ) {
  return (
    <div className='p-3 my-2 bg-lime-100 rounded-md' >
      <p>{item.name}</p>
      <p>Calories: {item.calories}</p>
    </div>
  )
}

export default TrackItem