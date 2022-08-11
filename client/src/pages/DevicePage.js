import React, {useEffect, useState} from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/esm/Image';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';


import bigStar from '../assets/img/big-star.png'
import Button from 'react-bootstrap/esm/Button';
import {fetchOneDevice} from "../http/deviceAPI";
import {useParams} from "react-router-dom";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams();

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice((data)))
    }, [])

    return (
        <Container>
            <Row className='mt-5'>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <div style={{height: '100%'}}>
                        <h2>
                            {device.name}
                        </h2>
                        <div className=' d-flex justify-content-center align-items-center' style={{fontSize: 48, background: `url(${bigStar}) center center/contain no-repeat`, width: '240px', height: '240px'}}>
                            {device.rating}
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <Card
                        className='flex-column align-items-center justify-content-around'
                        style={{width: 300, height: 300, border: '3px solid royalblue'}}
                        >
                        <h3 style={{fontSize: 36}}>
                             От: {device.price} руб.
                        </h3>
                        <Button variant={"outline-primary"}>
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className='m-3'>
                <h2>
                    Характеристики
                </h2>
                {
                    device.info.map((item, i) =>
                        <Row key={item.id} style={{background: i % 2 === 0 ? 'rgba(13,110,253,0.2)' : 'transparent'}}>
                            {item.title}: {item.description}
                        </Row>
                    )
                }
            </Row>
        </Container>
    );
};

export default DevicePage;