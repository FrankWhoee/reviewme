import React, {useState} from 'react';
import {
    Box,
    ChakraProvider,
    Divider,
    Input,
    Stack,
    Textarea,
    theme,
    Grid,
    IconButton,
    HStack,
    VStack,
    Button
} from '@chakra-ui/react';
import {StarIcon} from '@chakra-ui/icons'

export const RatingSubmit = props => {
    let rating = props.stars;
    let starIcons = []
    for(let i = 0; i < 5; i++){
        if (i < rating) {
            starIcons.push(<StarIcon key={i} color={'yellow.500'}/>)
        } else {
            starIcons.push(<StarIcon key={i} />)
        }
    }
    return (
        <Box {...props}>
                <HStack>
                    {starIcons}
                    <Button ml={5}>Submit</Button>
                </HStack>

        </Box>
    );
}