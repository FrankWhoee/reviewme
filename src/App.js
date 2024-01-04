import React, {useState} from 'react';
import {Box, ChakraProvider, Divider, Input, Stack, Textarea, theme, Grid} from '@chakra-ui/react';
import {ColorModeSwitcher} from './ColorModeSwitcher';
import {RatingSubmit} from "./RatingSubmit";

function App() {
    let [height, setHeight] = useState(100);
    let [title, setTitle] = useState("");
    let [text, setText] = useState("");
    let [stars, setStars] = useState(null)

    const handleTextareaChange = (event) => {
        setText(event.target.value)
        setHeight(event.target.scrollHeight)
        updateStars(null, event.target.value)
    }

    function updateStars(etitle, etext) {
        let atitle = etitle ?? title;
        let atext = etext ?? text;
        const starRegex = new RegExp('I give '+atitle+', ([0|1|2|3|4|5](?:\\.5)?) stars?\\.', 'i')
        const matches = atext.match(starRegex)
        if (matches){
            setStars(parseFloat(matches[1]))
        } else {
            setStars(null)
        }
    }

    return (
        <ChakraProvider theme={theme}>
            <Box fontSize="xl" p={4}>
                <Grid>
                    <ColorModeSwitcher justifySelf="flex-end"/>
                </Grid>
                <Stack>
                    <Input
                        placeholder={"What will you write about today?"}
                        variant={'unstyled'}
                        size={'xl'}
                        value={title}
                        onChange={(e) => {setTitle(e.target.value); updateStars(e.target.value, null)}}
                    />
                    <Divider/>
                    <Textarea
                        placeholder={"I give " + (title == "" ? "it" : title.toLowerCase()) + ", 5 stars."}
                        variant={'unstyled'}
                        resize={'none'}
                        height={height}
                        overflowY={'hidden'}
                        onChange={handleTextareaChange}
                        value={text}
                    />
                    <RatingSubmit stars={stars} title={title}/>
                </Stack>
            </Box>
        </ChakraProvider>
    );
}

export default App;
