import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Card from 'react-bootstrap/esm/Card';
import CardImg from 'react-bootstrap/esm/CardImg';
import Row from 'react-bootstrap/esm/Row';
import { Context } from '..';


const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row className='mt-5'>
            {
                device.brands.map(brand => 
                    <Card
                        style={{cursor: 'pointer'}}
                        onClick={() => device.setSelectedBrand(brand)}
                        className='w-auto me-3 pe-3 ps-3'
                        border={brand.id === device.selectedBrand.id ? 'primary' : 'light'}                        
                        key={brand.id}
                        >
                        {brand.name}
                    </Card>
                )
            }

        </Row>
    );
});

export default BrandBar;