import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const ErrorAlert = (props) => {
  return (
    <>
    <div className=" mt-2 p-2 rounded-sm bg-red-500 text-white flex justify-between ease-in duration-300"><span>{props.errorMsg}</span><AiOutlineClose className="mt-1 cursor-pointer" onClick={props.onAlertClose} /> </div>
    </>
  )
}

export default ErrorAlert