export const TextWithBreaks = props => {
    let text = props.text;

    let output = []
    
    text.split("\n").forEach(element => {
        output.push(<>{element}<br/></>)
    });
    
    return (
        <>
            {output}
        </>
    )
}