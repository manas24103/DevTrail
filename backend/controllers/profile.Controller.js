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
            error: 'User not found'
        });
    }

    return res.status(200).json({
        success:true,
        data:user
    });
}
catch(error){
    console.error('get user details error',error);
    return res.status(500).json({
        success:false,
        error:'An error occurred while fetching user details'
    });
}
};

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});