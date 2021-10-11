import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import SimpleForm from "../Forms/SimpleForm";
import Note from "../Model/Note";
import {deleteNote, editNote, fetchExistingNotes, postNote} from "../../Functions/NotesFunctions";

function MainDisplay() {
    const [notes, setNotes] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [notesCount, setNotesCount] = useState(0)

    function addNote(note) {
        postNote(note).then(() =>
            setNotesCount(notesCount + 1));
    }

    function destroyNote(id) {
        console.log("deleting note with id:", id)
        deleteNote(id).then(() => setNotesCount(notesCount - 1));
    }

    function modifyNote(note) {
        editNote(note).then(() => setNotesCount(notesCount + 1));
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
            {notes.map((note, i) => {
                return <Note key={i}
                             id={note._id}
                             title={note.title}
                             description={note.description}
                             deleteNote={destroyNote}
                             editNote={modifyNote}
                />
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
                    <SimpleForm submitHandler={addNote}/>
                </Col>
            </Row>
        </Container>
    </div>
}

export default MainDisplay;
