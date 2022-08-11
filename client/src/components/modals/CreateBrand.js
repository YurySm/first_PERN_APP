import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {createBrand} from "../../http/deviceAPI";

const CreateBrand = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const addBrand = () => {
        createBrand({name: value}).then(() => {
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
                        Добвать бренд
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                placeholder="Введите название бренда"
                                value={value}
                                onChange={event => setValue(event.target.value)}
                                />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={onHide}>Закрыть</Button>
                    <Button variant="primary" onClick={() => addBrand()}>Добавить</Button>
                </Modal.Footer>
            </Modal>
    );
};

export default CreateBrand;