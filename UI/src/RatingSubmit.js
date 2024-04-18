import React, { useState } from 'react';
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
import { StarIcon } from '@chakra-ui/icons'

export const Rating = props => {
    let rating = props.stars;

    let starIcons = []
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            starIcons.push(<StarIcon key={i} color={'yellow.500'} />)
        } else {
            starIcons.push(<StarIcon key={i} color={'gray.600'} />)
        }
    }

    return (
        <div>
            {starIcons}
        </div>
    );
}

export const RatingSubmit = props => {
    let rating = props.stars;
    let title = props.title;
    
    let email = props.email;
    let emailRaw = props.emailRaw;

    let onChange = props.onChange;
    let onSubmit = props.onSubmit;

    if (!rating || !title) {
        return null;
    }

    return (
        <Box {...props}>
            <HStack>
                <Rating stars={rating} />
                <Input ml={5} placeholder={"Your email address"} maxWidth={200} value={emailRaw} onChange={onChange} />
                <Button ml={5} onClick={onSubmit}>Review {title} as {emailRaw}</Button>
            </HStack>

        </Box>
    );
}