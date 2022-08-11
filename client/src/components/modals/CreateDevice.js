import React, {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { Context } from '../../';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import {createDevice, fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)

    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices().then(data => device.setDevices(data.rows))
    }, [])

    const addInfo = () => {
        setInfo([
            ...info,
            {
                title:'',
                description: '',
                number: Date.now()
            }
        ])
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        let formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
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
                    <Dropdown className='mb-3'>
                        <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                device.types.map(type =>
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedType(type)}
                                        key={type.id}>
                                        {type.name}
                                    </Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className='mb-3'>
                        <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                device.brands.map(brand => 
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedBrand(brand)}
                                        key={brand.id}>
                                        {brand.name}
                                    </Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>

                    
                    <Form.Group className='mb-3'>
                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text"
                            placeholder="Введите название устройства" />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Control
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            type="text"
                            placeholder="Введите стоимось устройства" />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            onChange={selectFile}
                            type="file" />
                    </Form.Group>

                    <hr/>

                    <Button
                        onClick={() => addInfo()}
                        >
                        Добавить новое свойство
                    </Button>
                        {
                            info.map(i =>
                                <Row className="mt-2" key={i.number}>
                                    <Col md={4}>
                                        <Form.Control
                                            value={i.title}
                                            onChange={event => changeInfo('title', event.target.value, i.number)}
                                            type="text"
                                            placeholder="Введите название свойства" />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control
                                            value={i.description}
                                            onChange={event => changeInfo('description', event.target.value, i.number)}
                                            type="text"
                                            placeholder="Введите описание свойства" />
                                    </Col>
                                    <Col md={4}>
                                        <Button variant="danger" onClick={() => removeInfo(i.number)}>Удалить</Button>
                                    </Col>
                                </Row>
                            )
                        }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>Закрыть</Button>
                <Button variant="primary" onClick={addDevice} >Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreateDevice;