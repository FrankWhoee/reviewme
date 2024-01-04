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
    let title = props.title;

    if (!rating || !title){
        return null;
    }

    let starIcons = []
    for(let i = 0; i < 5; i++){
        if (i < rating) {
            starIcons.push(<StarIcon key={i} color={'yellow.500'}/>)
        } else {
            starIcons.push(<StarIcon key={i} color={'gray.600'} />)
        }
    }
    return (
        <Box {...props}>
                <HStack>
                    {starIcons}
                    <Button ml={5}>Review {title}</Button>
                </HStack>

        </Box>
    );
}