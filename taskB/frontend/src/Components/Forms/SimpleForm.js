import React from 'react';
import {Form, Container, Button} from "react-bootstrap";


function SimpleForm () {
    return (
        <Container>
            <Form>
                <Form.Group controlId="formName">
                    <Form.Label>ur name pls</Form.Label>
                    <Form.Control type="text" placeholder="name plz" />
                </Form.Group>
                <Form.Group controlId="formNote">
                    <Form.Control type="text" placeholder="your note plz" />
                </Form.Group>
                <Button variant="outline-danger" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );

}

export default SimpleForm;