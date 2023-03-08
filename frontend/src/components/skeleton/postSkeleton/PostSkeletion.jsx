import { Box, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import "./postSkeletion.css"
export const PostSkeleton = () => {
    const postSkeletionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    return (
        <>

            {
                postSkeletionsArr.map((e) => {
                    return (<Stack sx={{ width: "250px", margin: "20px 5px" }} direction={"column"} gap={2.3} >
                        <Box>
                            <Skeleton className='dark_skeleton' variant='rectangular' height={160} width={"100%"} />
                        </Box>
                        <Box display={"flex"} flexDirection={"row"} alignItems="center" width={"100%"}>
                            <Stack sx={{ width: "100%" }}>
                                <Typography variant="body2" sx={{ width: "90%" }}>
                                    <Skeleton className='dark_skeleton' variant='text' height={34} />
                                </Typography>
                                <Typography variant="body2" sx={{ width: "90%" }}>
                                    <Skeleton className='dark_skeleton' variant='text' height={34} />
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                    )
                })
            }


        </>

    )
}






