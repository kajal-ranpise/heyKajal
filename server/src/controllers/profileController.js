const Profile = require('../models/profileModel');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Public
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Create or update user profile
// @route   POST /api/profile
// @access  Private
exports.createProfile = async (req, res) => {
    const { bio, website, location } = req.body;

    const profileFields = {
        user: req.user.id,
        bio,
        website,
        location,
    };

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }

        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!profile) return res.status(404).json({ msg: 'Profile not found' });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Delete user profile
// @route   DELETE /api/profile
// @access  Private
exports.deleteProfile = async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id });
        res.json({ msg: 'Profile removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};