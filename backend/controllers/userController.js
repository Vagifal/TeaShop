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
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email })
            if (!user)
                return res.status(400).json({ message: "User not found" })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch)
                return res.status(400).json({ message: "Incorrect password" })

            const accessToken = createAccessToken({ id: user._id })
            const refreshToken = createRefreshToken({ id: user._id })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refreshToken',
                //maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            })

            res.json({ accessToken })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken', { path: '/user/refreshToken' })
            return res.json({ message: "Logged out" })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            if (!user)
                return res.status(400).json({ message: "User does not exist" })

            res.json(user)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

const createAccessToken = (user) => jwt.sign(user, "" + process.env.ACCESS_TOKEN, { expiresIn: '1d' })

const createRefreshToken = (user) => jwt.sign(user, "" + process.env.REFRESH_TOKEN, { expiresIn: '7d' })

module.exports = userController