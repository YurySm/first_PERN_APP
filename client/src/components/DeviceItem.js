import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/esm/Image';
import {useNavigate} from 'react-router-dom';

import star from '../assets/img/star.png';
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = ({device}) => {
    const history = useNavigate();
    return (
        <Col md={3} className={'mt-3'}>
            <Card
                border={'light'}
                style={{width: 150, cursor:'pointer'}}
                onClick={() => history(`${DEVICE_ROUTE}/${device.id}`)}
                >
                    <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                    <div className='d-flex justify-content-between text-black-50'>
                        <div>samsung</div>
                        <div className='d-flex justify-content-start align-items-center mt-1'>
                            <div className=''>{device.rating}</div>
                            <Image src={star}/>
                        </div>
                    </div>     
                    <div className="mt-1">
                        {device.name}
                    </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
