import React, { useContext, useState, useEffect } from 'react';
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext"
import BadgerBudSummary from './BadgerBudSummary';
import { Container, Row, Col } from 'react-bootstrap';


export default function BadgerBudsAdoptable(props) {

    const { buds, saveBuddy } = useContext(BadgerBudsDataContext);
    
    const [savedBuddiesIds, setSavedBuddiesIds] = useState(JSON.parse(sessionStorage.getItem('savedCatIds') || '[]'));

    const adoptedBuddiesIds = JSON.parse(sessionStorage.getItem('adoptedCatIds') || '[]');
    const availableBuds = buds.filter(bud => !savedBuddiesIds.includes(bud.id) && !adoptedBuddiesIds.includes(bud.id));
    useEffect(() => {
        const handleStorageChange = () => {
            setSavedBuddiesIds(JSON.parse(sessionStorage.getItem('savedCatIds') || '[]'));
        };
    
        window.addEventListener('storage', handleStorageChange);
    
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const saveBuddys = (id) => {
        const savedBuddies = JSON.parse(sessionStorage.getItem('savedCatIds') || '[]');
        savedBuddies.push(id);
        sessionStorage.setItem('savedCatIds', JSON.stringify(savedBuddies));
        setSavedBuddiesIds(savedBuddies);  // Update the local state to trigger a re-render
    };

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        {availableBuds.length===0?<p>No buds are available for adoption!</p>:<Row>
            {availableBuds.map(bud => <BadgerBudSummary key={bud.id} bud={bud} onSave={saveBuddys} />)}
        </Row>}
        

    </div>
}