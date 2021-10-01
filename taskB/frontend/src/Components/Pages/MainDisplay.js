import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import SimpleForm from "../Forms/SimpleForm";
import Note from "../Model/Note";
import fetchExistingNotes from "../../DataFetchers/NotesFetcher";

function MainDisplay() {
    const [notes, setNotes] = useState([]);
    const [fetched, setFetched] = useState(false);
    let notes_ = [{
        name: "Ritesh",
        description: "MyDesc"
    }, {
        name: "Ritesh2",
        description: "MyDesc2"
    }]


    useEffect(async () => {
        console.log("trying to fetch notes!")
            const fetchedNotes = await fetchExistingNotes()
            if (!fetchedNotes.empty) {
                console.log("non-empty fetched notes!", fetchedNotes)
                setNotes(fetchedNotes)
                setFetched(true)
            }
        }
        , [])


    const notesDisplay = fetched
        ? <div>
            notes have been fetched!
            {notes.map( (note, i) => {
                return <Note key={i}
                    title={note.title}
                    description={note.description}/>
            })}
        </div>
        : <Card>
            Notes not fetched yet
        </Card>

    return <div>
        <Container>
            <Row>
                <Col>
                    {notesDisplay}
                </Col>
                <Col>
                    <SimpleForm/>
                </Col>
            </Row>
        </Container>
    </div>
}

export default MainDisplay;
