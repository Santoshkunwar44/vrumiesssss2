import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'


import React from 'react'
import { useDispatch } from 'react-redux'
import { setToastifyInfo } from '../../../redux/actions/otherAction'
import { logoutUser } from '../../../redux/actions/userAction'
import { logoutApi } from '../../../utils/apis/user/userApi'

const LogoutPop = ({ children }) => {
    const disptach = useDispatch()

    const handleLogout = async () => {
        try {
            await logoutApi()
            disptach(logoutUser());
            disptach(setToastifyInfo({
                text: "Logged out successfully",
                type: "success"
            }))
        } catch (error) {
            console.log(error)
            disptach(setToastifyInfo({
                text: "Failded to logout",
                type: "error"
            }))
        }



    }
    return (
        <Popover autoFocus={false} >
            <PopoverTrigger>
                <span style={{ cursor: "pointer" }}>{children}</span>
            </PopoverTrigger>
            <PopoverContent >
                <PopoverArrow />
                <PopoverBody onClick={handleLogout} border={"3px solid #37E710"} borderRadius={"8"} p={"8"} py={'5'} display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"10px"} width={"200px"} cursor={"pointer"} bgColor={"#000000"} color="white">
                    <img src="/items/signout.png" alt="logoutImg" />
                    <span style={{ fontFamily: "poppins", fontWeight: "bold" }}>Sign Out</span>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default LogoutPop