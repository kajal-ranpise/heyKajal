import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProfileStart } from '../features/profileSlice';
import Hero from "./hero";
const Profile = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfileStart());
    }, [dispatch]);
    
    return (
        <>
            <Hero />
        </>
    );
};

export default Profile;