import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {createType} from "../../http/deviceAPI";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addType = () => {
        createType({name: value}).then(() => {
            setValue('')
            onHide()
        })
    }
    return (
            <Modal
                  show={show}
                  onHide={onHide}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Добвать тип
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                placeholder="Введите название типа"
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                />
                        </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={onHide}>Закрыть</Button>
                    <Button variant="primary" onClick={() => addType()}>Добавить</Button>
                  </Modal.Footer>
                </Modal>
    );
};

export default CreateType;