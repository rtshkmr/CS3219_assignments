import React, {useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import SimpleForm from "../Forms/SimpleForm";
import Note from "../Model/Note";

function MainDisplay() {
    const [notes, setNotes] = useState([]);
    const [fetched, setFetched] = useState(true);
    let notes_ = [{
        name:"Ritesh",
        description:"MyDesc"}, {
        name:"Ritesh2",
        description:"MyDesc2"}]


    const notesDisplay = fetched
        ? <div>
            notes have been fetched!
            {notes_.map(note => {
                return <Note
                    name={note.name}
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
