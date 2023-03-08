import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeToastifyInfo } from '../../redux/actions/otherAction';

const NotifyToast = () => {
    const { toastifyInfo } = useSelector((state) => state.otherReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        if (toastifyInfo?.type === "success") {

            toast.success(toastifyInfo?.text, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                // icon: ({ theme, type }) => <img alt='token' src='/items/done.jpg' />,
            });
        } else {

            toast.error(toastifyInfo?.text, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                // icon: ({ theme, type }) => <img alt='token' src='/token.png' />,
            });
        }
        setTimeout(() => {

            dispatch(removeToastifyInfo())
        }, 6000);

    }, [])
    return (
        <>
            <ToastContainer

            />
            <ToastContainer />
        </>
    )
}

export default NotifyToast