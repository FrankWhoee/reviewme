import { Wrap, WrapItem, Center, Input, Box } from '@chakra-ui/react'
import { ReviewCard } from './ReviewCard'
import { Gallery } from './Gallery'


export const Profile = props => {
    let email = props.email;
    let emailRaw = props.emailRaw;

    function handleEmailChange(event) {
        props.handleEmailChange(event);
        
    }

    return (
        <>
            <Center>
                <Box mb={5}>
                    <Input placeholder={"Your email address"} maxWidth={300} value={emailRaw} onChange={handleEmailChange} />
                </Box>
            </Center>

            <Gallery email={email} />
        </>

    )
}
