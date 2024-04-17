import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Box
} from '@chakra-ui/react'
import { Rating } from './RatingSubmit';
import { TextWithBreaks } from './TextWithBreaks';

export const ReviewPage = props => {
    let isOpen = props.isOpen;
    let onClose = props.onClose;

    let text = props.text;
    let title = props.title;
    let rating = props.rating;
    let email = props.email;

    console.log(text);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TextWithBreaks text={text}/>
                    <Box my={4}>
                        <Rating stars={rating} />
                        <Text color={"gray.500"}>{email}</Text>
                    </Box>
                </ModalBody>

            </ModalContent>
        </Modal>
    )
} 