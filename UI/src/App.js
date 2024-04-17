import React, { useState } from 'react';
import { extendTheme, Tab, Tabs, TabList, TabPanel, TabPanels, Box, ChakraProvider, Divider, Grid, Input, Stack, Textarea, theme, Center } from '@chakra-ui/react';
import { RatingSubmit } from "./RatingSubmit";
import {Profile} from "./Profile"
import { Gallery } from './Gallery';

import {fetchReviews, submitReview} from './API';

function App() {
    let [height, setHeight] = useState(100);

    let ltitle = localStorage.getItem("title") ?? ""
    let ltext = localStorage.getItem("text") ?? ""
    let lemail = localStorage.getItem("email") ?? ""
    let [title, setTitle] = useState(ltitle);
    let [text, setText] = useState(ltext);
    let [email, setEmail] = useState(lemail);

    const starRegex = new RegExp('I give ' + ltitle + ', ([0|1|2|3|4|5](?:\\.5)?) stars?\\.', 'i')
    const matches = ltext.match(starRegex)

    let [stars, setStars] = useState(matches == null ? null : parseFloat(matches[1]))

    const handleEmailChange = (event) => {
        const value = event.target.value
        setEmail(value)
        localStorage.setItem("email", value)
    }

    const handleTextareaChange = (event) => {
        const value = event.target.value
        setText(value)
        setHeight(event.target.scrollHeight)
        updateStars(null, value)
        localStorage.setItem("text", value)
    }

    const handleTitleChange = (event) => {
        const value = event.target.value
        setTitle(value);
        updateStars(value, null)
        localStorage.setItem("title", value)
    }

    function updateStars(etitle, etext) {
        let atitle = etitle ?? title;
        let atext = etext ?? text;
        const starRegex = new RegExp('I give ' + atitle + ', ([0|1|2|3|4|5](?:\\.5)?) stars?\\.', 'i')
        const matches = atext.match(starRegex)
        if (matches) {
            setStars(parseFloat(matches[1]))
        } else {
            setStars(null)
        }
    }

    function handleSubmit(){ 
        submitReview(email, title, text, stars);
    }

    

    // 2. Add your color mode config
    const config = {
        initialColorMode: 'dark',
        useSystemColorMode: true,
    }

    // 3. extend the theme
    const theme = extendTheme({ config })

    return (
        <ChakraProvider theme={theme}>
            <Tabs variant='solid-rounded' colorScheme='gray' isLazy>
                <Center py={5}>
                    <TabList>
                        <Tab mx={1}>review</Tab>
                        <Tab mx={1}>gallery</Tab>
                        <Tab mx={1}>profile</Tab>
                    </TabList>
                </Center>

                <TabPanels>
                    <TabPanel>
                        <Box fontSize="xl" p={4}>
                            <Stack>
                                <Input
                                    placeholder={"What will you write about today?"}
                                    variant={'unstyled'}
                                    size={'xl'}
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                                <Divider />
                                <Textarea
                                    placeholder={"I give " + (title == "" ? "it" : title.toLowerCase()) + ", 5 stars."}
                                    variant={'unstyled'}
                                    resize={'none'}
                                    height={height}
                                    overflowY={'hidden'}
                                    onChange={handleTextareaChange}
                                    value={text}
                                />
                                <RatingSubmit stars={stars} title={title} email={email} onChange={handleEmailChange} onSubmit={handleSubmit} />
                            </Stack>
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Gallery/>
                    </TabPanel>
                    <TabPanel>
                        <Profile email={email} handleEmailChange={handleEmailChange}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </ChakraProvider>
    );
}

export default App;
