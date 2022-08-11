import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Row from 'react-bootstrap/esm/Row';
import { Context } from '..';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row className='mt-3'>
            {
                device.devices.map(item => 
                    <DeviceItem key={item.id} device={item}/>
                )
            }
        </Row>
    );
});

export default DeviceList;