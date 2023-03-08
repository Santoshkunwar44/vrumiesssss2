import { Box } from '@chakra-ui/react'
import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import { Stack, Typography } from '@mui/material';
import { PostSkeleton } from '../postSkeleton/PostSkeletion';
const SinglePostSkeleton = () => {
    return (
        <Box display={"flex"} padding={"3rem"}>
            <Box flex={8}>
                <Box >
                    <Typography variant="body2" sx={{ width: "50%", marginBottom: "2rem" }}>
                        <Skeleton className='dark_skeleton' variant='text' height={54} />
                    </Typography>
                    <Box display={"flex"} gap={"1rem"}>
                        <Skeleton sx={{ height: 100, backgroundColor: "#1d1d1d7a", width: 100 }} animation="wave" variant="rectangular" />
                        <Skeleton sx={{ height: 100, backgroundColor: "#1d1d1d7a", width: 100 }} animation="wave" variant="rectangular" />
                        <Skeleton sx={{ height: 100, backgroundColor: "#1d1d1d7a", width: 100 }} animation="wave" variant="rectangular" />
                        <Skeleton sx={{ height: 100, backgroundColor: "#1d1d1d7a", width: 100 }} animation="wave" variant="rectangular" />
                    </Box>
                </Box>
                <Box marginTop={"8rem"} display={"flex"} flexWrap={"wrap"}>
                    <PostSkeleton />
                </Box>
            </Box>
            <Box flex={4} display="flex" flexDir={"column"} gap={"1rem"}>
                <Box display={"flex"} gap={"1rem"}>
                    <Skeleton variant='circular' className='dark_skeleton' width={60} height={60} animation="wave" />
                    <Stack flex={1} >

                        <Typography variant="body2" sx={{ width: "90%" }}>
                            <Skeleton className='dark_skeleton' variant='text' height={30} />
                        </Typography>
                        <Typography variant="body2" sx={{ width: "90%" }}>
                            <Skeleton className='dark_skeleton' variant='text' height={30} />
                        </Typography>
                    </Stack>
                </Box>
                <Box>
                    <Skeleton className='dark_skeleton' variant='rectangular' height={300} animation="wave" width={"100%"} />
                </Box>
                <Box display={"flex"} flexDirection={"row"} alignItems="center" width={"100%"}>
                    <Stack sx={{ width: "100%" }}>
                        <Typography variant="body2" sx={{ width: "90%" }}>
                            <Skeleton className='dark_skeleton' variant='text' height={44} />
                        </Typography>
                        <Typography variant="body2" sx={{ width: "90%" }}>
                            <Skeleton className='dark_skeleton' variant='text' height={44} />
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default SinglePostSkeleton