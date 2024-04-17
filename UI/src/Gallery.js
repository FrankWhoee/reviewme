import { Wrap, WrapItem, Center, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { ReviewCard } from './ReviewCard'
import { fetchReviews } from './API'
import { useEffect, useState } from 'react'


export const Gallery = props => {
    const [reviews, setReviews] = useState([]);

    const renderDependencies = props.email == null ? [] : [props.email];

    useEffect(() => {
        fetchReviews(props.email)
            .then(res => setReviews(res))
            .catch(error => setReviews(null))
    }, renderDependencies);


    return (
        <GalleryCards reviews={reviews} />
    )
}

function ErrorAlert() {
    return (
        <Center>
            <Alert
                status='error'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='200px'
                background={'#00000000'}
            >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                    Error fetching reviews.
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                    Ruh roh.
                </AlertDescription>
            </Alert>
        </Center>
    )
}

function LoadingAlert() {
    return (
        <Center>
            <Alert
                status='loading'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='200px'
                background={'#00000000'}
            >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                    Loading reviews...
                </AlertTitle>
            </Alert>
        </Center>
    )
}

const GalleryCards = props => {
    let reviews = props.reviews

    if (reviews == null) return <ErrorAlert />

    if (reviews.length == 0) return <LoadingAlert />


    let reviewCards = [];
    for (let i = 0; i < reviews.length; i++) {
        let element = reviews[i];
        reviewCards.push(
            <WrapItem key={i}>
                <ReviewCard email={element.Email} text={element.Text} title={element.Title} rating={element.Rating} />
            </WrapItem>
        )
    }
    return (
        <div>
            <Wrap spacing='30px'>
                {reviewCards}
            </Wrap>
        </div>
    )
}


