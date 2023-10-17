import React, { useContext, useState, useEffect } from 'react';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';
import { Row, Col } from 'react-bootstrap';
import {Button} from 'antd'
import { HeartFilled  } from '@ant-design/icons';

export default function BadgerBudsBasket() {
    const { buds } = useContext(BadgerBudsDataContext);

    const [savedBuddiesIds, setSavedBuddiesIds] = useState(JSON.parse(sessionStorage.getItem('savedCatIds') || '[]'));
    const savedBuds = buds.filter(bud => savedBuddiesIds.includes(bud.id));

    useEffect(() => {
        setSavedBuddiesIds(JSON.parse(sessionStorage.getItem('savedCatIds') || '[]'));
    }, [buds]);

    const unselectBuddy = (id) => {
        const updatedSavedBuddies = savedBuddiesIds.filter(savedId => savedId !== id);
        sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedBuddies));
        alert(`${buds.find(bud => bud.id === id).name} has been removed from your basket!`);
        setSavedBuddiesIds(updatedSavedBuddies);  // Update the local state to trigger a re-render
    };

    const adoptBuddy = (id) => {
        const adoptedBuddies = JSON.parse(sessionStorage.getItem('adoptedCatIds') || '[]');
        adoptedBuddies.push(id);
        sessionStorage.setItem('adoptedCatIds', JSON.stringify(adoptedBuddies));
        
        const updatedSavedBuddies = savedBuddiesIds.filter(savedId => savedId !== id);
        sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedBuddies));
        setSavedBuddiesIds(updatedSavedBuddies);
    
        alert(`${buds.find(bud => bud.id === id).name} has been adopted!`);
    };

    return (
        <div>
            <h1>Badger Buds Basket</h1>
            <p>These cute cats could be all yours!</p>
            {savedBuds.length === 0 ? 
            <p>You have no buds in your basket!</p>
            :
            <Row>
                {savedBuds.map(bud => (
                    <Col key={bud.id} xs={12} sm={6} md={4} lg={3}>
                        <div style={{ margin: "1rem", border: "1px solid #ddd", padding: "1rem" }}>
                            <img 
                                src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${bud.imgIds[0]}`} 
                                alt={`A picture of ${bud.name}`} 
                                width="100%" 
                            />
                            <h2>{bud.name}</h2>
                            <Button  style={{backgroundColor:'gray', color:'white', marginLeft:'10px'}} onClick={() => unselectBuddy(bud.id)}>Unselect</Button>
                            <Button style={{width:'80px', paddingLeft:'10px', marginLeft:'5px', backgroundColor:'green', color:'white'}} onClick={() => adoptBuddy(bud.id)}><HeartFilled style={{color:'red', top:'-3px', position:'relative'}}/>Adopt</Button>
                        </div>
                    </Col>
                ))}
            </Row>
            }
            
        </div>
    );
}