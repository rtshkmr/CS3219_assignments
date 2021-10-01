import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import SimpleForm from "../Forms/SimpleForm";
import Note from "../Model/Note";
import fetchExistingNotes from "../../DataFetchers/NotesFetcher";
import postNote from "../../DataFetchers/NotesPoster";

function MainDisplay() {
    const [notes, setNotes] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [notesCount, setNotesCount] = useState(0)

    function addNote(note) {
        postNote(note);
        setNotesCount(notesCount + 1);
    }

    useEffect(async () => {
        console.log("trying to fetch notes!")
            const fetchedNotes = await fetchExistingNotes()
            if (!fetchedNotes.empty) {
                console.log("non-empty fetched notes!", fetchedNotes)
                setNotes(fetchedNotes)
                setNotesCount(fetchedNotes.length)
                setFetched(true)
            }
        }
        , [notesCount])


    const notesDisplay = fetched
        ? <div>
            {notesCount} notes have been fetched!
            {notes.map( (note, i) => {
                return <Note key={i}
                    title={note.title}
                    description={note.description}/>
            })}
        </div>
        : <Card>
            No notes to show.
        </Card>

    return <div>
        <Container>
            <Row>
                <Col>
                    {notesDisplay}
                </Col>
                <Col>
                    <SimpleForm addNote={addNote}/>
                </Col>
            </Row>
        </Container>
    </div>
}

export default MainDisplay;
