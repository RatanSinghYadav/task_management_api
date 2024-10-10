const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validation
        if (!email || !password) {
            res.status(422).json({ success: false, message: "Something is missing in email/password" });
            return;
        }

        const userlogin = await User.findOne({ email: email });

        // console.log(userlogin);

        if (!userlogin) {
            return res.status(401).json({ message: 'You are not registered. Please register first.' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, userlogin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }


        // Return token for future authentication
        const token = jwt.sign({ userId: userlogin._id }, process.env.JWT_SECRET);

        res.cookie("user_data", token, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
        })

        res.status(200).json({ success: true, message: 'User successfully logged in', userlogin, token });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: "Login failed!" });

    }


}

module.exports = userLogin;
