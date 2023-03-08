import React from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
} from '@chakra-ui/react'
import { FacebookShareButton, FacebookIcon, FacebookMessengerShareButton, FacebookMessengerIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from "react-share"
const SharePost = ({ url, children, title }) => {
    return (
        <Popover placement={"right-start"}>
            <PopoverTrigger>
                <span>{children}</span>
            </PopoverTrigger>
            <PopoverContent className='postsharePopover' borderRadius={"10"} minWidth={"200px"} textAlign={"center"} p={"10"} bg={"#000000"}>
                <PopoverArrow />
                <PopoverHeader padding={"10"}>Share Post !</PopoverHeader>
                <PopoverBody display={"flex"} justifyContent={"center"} gap={"10"}>

                    <FacebookShareButton media url={url}
                        quote={title}
                        hashtag='#post item'
                    >
                        <FacebookIcon size={"35"} logoFillColor={"white"} round={true} />
                    </FacebookShareButton>
                    <FacebookMessengerShareButton media url={url}
                        quote={title}
                        hashtag='#post item'
                    >
                        <FacebookMessengerIcon size={"35"} logoFillColor={"white"} round={true} />
                    </FacebookMessengerShareButton>
                    <WhatsappShareButton media url={url}
                        quote={title}
                        hashtag='#post item'
                    >
                        <WhatsappIcon size={"35"} logoFillColor={"white"} round={true} />
                    </WhatsappShareButton>
                    <TwitterShareButton media url={url}
                        quote={title}
                        hashtag='#post item'
                    >
                        <TwitterIcon size={"35"} logoFillColor={"white"} round={true} />
                    </TwitterShareButton>
                    <LinkedinShareButton media url={url}
                        quote={title}
                        hashtag='#post item'
                    >
                        <LinkedinIcon size={"35"} logoFillColor={"white"} round={true} />
                    </LinkedinShareButton>


                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default SharePost