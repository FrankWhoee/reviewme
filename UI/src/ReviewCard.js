import { Heading, Text, Box, Stack, StackDivider, Card, CardHeader, CardBody, CardFooter, useDisclosure } from '@chakra-ui/react'

import { Rating } from './RatingSubmit'
import { ReviewPage } from './ReviewPage';
import { TextWithBreaks } from './TextWithBreaks';

export const ReviewCard = props => {
    let text = props.text;
    let title = props.title;
    let rating = props.rating;
    let email = props.email;
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <ReviewPage isOpen={isOpen} onClose={onClose} {...props} />
            <Card onClick={onOpen}>
                <CardBody>
                    <Stack>
                        <Box width={400}>
                            <Text pt='2' fontSize='sm' bgGradient='linear(to-b, white, #00000000)' bgClip="text" noOfLines={6}>
                                <TextWithBreaks text={text} />
                            </Text>
                            <Heading size='lg'>
                                {title}
                            </Heading>
                            <Text pt='2' fontSize='sm' color={'gray.400'}>
                                {email}
                            </Text>
                            <Rating stars={rating} />
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}