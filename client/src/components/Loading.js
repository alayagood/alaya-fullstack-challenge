import React from 'react'
import ReactLoading from 'react-loading'

const Loading = ({ type, color }) => {
  return (
    <div className="loading">
      <ReactLoading type="spin" color="#61dafb" height={165} width={93} />
    </div>
  )
}

export default Loading