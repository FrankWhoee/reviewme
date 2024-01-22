import React, {useState} from 'react';
import {Box, ChakraProvider, Divider, Grid, Input, Stack, Textarea, theme} from '@chakra-ui/react';
import {ColorModeSwitcher} from './ColorModeSwitcher';
import {RatingSubmit} from "./RatingSubmit";

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
        fetch("http://localhost:8000/review", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                title: title,
                text: text,
                rating: stars
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
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
                        onChange={handleTitleChange}
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
                    <RatingSubmit stars={stars} title={title} email={email} onChange={handleEmailChange} onSubmit={handleSubmit}/>
                </Stack>
            </Box>
        </ChakraProvider>
    );
}

export default App;
