import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile, fetchProfileStart } from '../features/profileSlice';
import Hero from "./hero";
const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(fetchProfileStart());
    }, [dispatch]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedProfile = {
            name: formData.get('name'),
            email: formData.get('email'),
        };
        dispatch(updateProfile(updatedProfile));
    };
    
    return (
        <>
            <Hero />
        </>
    );
};

export default Profile;