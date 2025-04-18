import jwt from 'jsonwebtoken'

export const tokenGenerator = (userId , res) => {
    const token = jwt.sign({userId} ,process.env.jwt_secret,{
        expiresIn:"7d"
    })

    res.cookie('jwt',token,{
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
        sameSite:"strict",
        secure:'development'
    })
    
    return token
}