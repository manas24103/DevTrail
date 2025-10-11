import User from "../models/User.models";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
    try {
        console.log('Login request received:', {
            body: req.body,
            headers: req.headers,
            ip: req.ip,
            method: req.method,
            url: req.url,
        });
        
        const { email, password } = req.body;

        // validate user input
        if (!email || !password) {
            console.warn('Missing email or password');
            return res.status(400).json({
                success: false,
                message: 'Missing email or password',
                timestamp: new Date().toISOString()
            });
        }

        console.log(`Attempting to login user with email: ${email}`);
        // find user by email
        const user = await User.findOne({ email }).select('+password').exec();

        if (!user) {
            console.warn(`Login failed: No user found with email ${email}`);
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
                timestamp: new Date().toISOString()
            });
        }

        // check if password is correct
        console.log('Comparing passwords');
        const isMatch = await user.comparePassword(password);
        console.log(`Password comparison result: ${isMatch}`);

        if (!isMatch) {
            console.warn(`Login failed: Invalid password for user ${email}`);
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
                timestamp: new Date().toISOString()
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1d' }
        );

        // convert to plain object and remove sensitive fields
        const userObject = user.toObject();
        const { password: pwd, __v, ...userData } = userObject;

        // prepare response 
        const response = {
            success: true,
            token,
            data: {
                _id: userData._id,
                name: userData.name,
                email: userData.email,
                createdAt: userData.createdAt,
                updatedAt: userData.updatedAt,
            },
            expiresIn: '1d',
            timestamp: new Date().toISOString()
        };

        console.log('Login successful', response.data.email);
        console.log('Login response data:', response);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Login Failed', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            timestamp: new Date().toISOString()
        });
    }
};

export const getUserProfile = async (req, res, next) => {
    try {
    // the authenticate middleware should have already attached the user to the request
    if(!req.user){
        return res.status(401).json({
            success: false,
            message: 'Not authenticated'
        });
    }

    const user = await User.findById(req.user.id)
    .select('-password -__v')
    .lean()
    .exec();

    if(!user){
        return res.status(404).json({
            success: false,
            error: 'Doctor not found'
        });
    }

    return res.status(200).json({
        success:true,
        data:user
    });
}
catch(error){
    console.error('get user deatils error',error);
    return res.status(500).json({
        success:false,
        error:'An error occurred while fetching doctor details'
    });
}
};