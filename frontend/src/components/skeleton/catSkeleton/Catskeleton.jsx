import { Box, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import "./catSkeleton.css"

const Catskeleton = ({ currentFocus }) => {


    return (


        <Stack justifyContent={"center"} className={`${currentFocus ? "focusCat" : "notFocus"}`} sx={{ width: "100%" }} direction={"column"} gap={2.3} >
            <Skeleton className='dark_skeleton' variant='rectangular' borderRadius={20} height={160} width={"100%"} />
            {/* <Box display={"flex"} flexDirection={"row"} alignItems="center" width={"100%"}>
                <Stack sx={{ width: "100%" }} display="flex" alignItems={"center"} >
                    <Typography variant="body2" sx={{ width: "90%" }}>
                        <Skeleton className='dark_skeleton' variant='text' height={34} />
                    </Typography>

                </Stack>
            </Box> */}


        </Stack>

    )
}

export default Catskeleton