import React from 'react'
import { Puff } from 'react-loader-spinner';


export default function Loader() {

  return <Puff
    height="80"
    width="80"
    radius={1}
    color="lightblue"
    ariaLabel="puff-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
}