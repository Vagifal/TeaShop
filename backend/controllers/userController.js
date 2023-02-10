const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const user = await Users.findOne({ email })
            if (user)
                return res.status(400).json({ message: "The email already exists" })

            if (password.length < 6)
                return res.status(400).json({ message: "Password is at least 6 characters long" })

            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })

            await newUser.save()

            const accessToken = createAccessToken({ id: newUser._id })
            const refreshToken = createRefreshToken({ id: newUser._id })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refreshToken',
            })

            res.json({ accessToken })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken)
                return res.status(400).json({ message: "Please Login or Register" })

            jwt.verify(refreshToken, "" + process.env.REFRESH_TOKEN, (error, user) => {
                if (error)
                    return res.status(400).json({ msg: "Please Login or Register" })

                const accessToken = createAccessToken({ id: user.id })

                res.json({ accessToken })
            })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
}

const createAccessToken = (user) => jwt.sign(user, "" + process.env.ACCESS_TOKEN, { expiresIn: '1d' })

const createRefreshToken = (user) => jwt.sign(user, "" + process.env.REFRESH_TOKEN, { expiresIn: '7d' })

module.exports = userController