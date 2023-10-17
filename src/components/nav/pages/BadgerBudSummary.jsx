import React, { useState } from 'react';
import { Col, Carousel } from 'react-bootstrap';
import {Button} from 'antd'
import { HeartFilled  } from '@ant-design/icons';

export default function BadgerBudSummary({ bud, onSave }) {
    const [showDetails, setShowDetails] = useState(false);

    const imageURL = `https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${bud.imgIds[0]}`;

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const prettyPrintAge = (months) => {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        
        if (years && remainingMonths) {
            return `${years} year(s) and ${remainingMonths} month(s) old`;
        } else if (years) {
            return `${years} year(s) old`;
        } else {
            return `${remainingMonths} month(s) old`;
        }
    };

    
    const saveBuddy = () => {
        alert(`${bud.name} has been added to your basket!`);
        if (typeof onSave === "function") {
            onSave(bud.id);
        }
    };

    return (
        <Col xs={12} sm={6} md={4} lg={3}>
            <div style={{ margin: "1rem", border: "1px solid #ddd", padding: "1rem" }}>
            {showDetails ? (
                    <Carousel>
                        {bud.imgIds.map(imgId => (
                            <Carousel.Item key={imgId}>
                                <img 
                                    src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${imgId}`} 
                                    alt={`A picture of ${bud.name}`} 
                                    width="100%" 
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <img src={imageURL} alt={`A picture of ${bud.name}`} width="100%" />
                )}
                <h2>{bud.name}</h2>
                {showDetails && (
                    <>
                        <p>Gender: {bud.gender}</p>
                        <p>Breed: {bud.breed}</p>
                        <p>Age: {prettyPrintAge(bud.age)}</p>
                        {bud.description && <p>Description: {bud.description}</p>}
                    </>
                )}
                <Button type='primary' style={{width:'100px', paddingLeft:'15px'}} onClick={toggleDetails}>{showDetails ? 'Show less' : 'Show more'}</Button>
                <Button onClick={saveBuddy} style={{backgroundColor:'gray', color:'white', paddingLeft:'0px', marginLeft:'10px'}} > <HeartFilled style={{color:'red', top:'-3px', position:'relative'}} /> Save</Button>
            </div>
        </Col>
    );
}