import React from 'react'

const myLabel = (props) => {
  const { label, children } = props
  return (
    <div style={{margin:'1vh 1vw', fontSize:'20px', maxWidth:'50vw'}}>
      <div style={{display:'inline-block'}}>{label} :</div>
      <div style={{display:'inline-block', marginLeft:'1vw'}}>{children}</div>
    </div>
  )
}

export default myLabel