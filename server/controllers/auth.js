const authModel = require('../models/auth')
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')

const register = async (req, res)=>{
    try {
        const {firstName, LastName, Email, Password} = req.body ;
          const hashedPassword = await bcrypt.hash(Password, 10)
          const existedUser = await authModel.findOne({Email})
          if (existedUser) {
            return res.status(409).json({
            success:false,
            msg:"Email already Exist,please use another email"
            })
          }
          const register = await authModel.create({
            firstName:firstName,
            LastName:LastName,
            Email:Email,
            Password:hashedPassword
          }) 
          const token = Jwt.sign({
            Email : register.Email,
            id: register._id
          }, process.env.JWT_SECRET)
        res.status(201).json({
            success:true,
            register,token
        })
         
    } catch (error) {
        res.status(500).json({
            success:false,
            error
        })
    }  
}
const login = async (req, res)=>{
    try {
        const {Email, Password} = req.body;
        const hashedPassword = await bcrypt.hash(Password, 10)
        const existedUser = await authModel.findOne({Email})
        if (!existedUser) {
            return res.status(409).json({
                success:false,
                msg:"Email already Exist,please use another email"
            })
        }
    const comparePassword = await bcrypt.compare(Password, existedUser.Password)
    if (!comparePassword) {
        return res.status(400).json({
            success:false,
            msg:"invalid Credentials"
        })   
    }
    const token = Jwt.sign({
        Email : existedUser.Email,
        id: existedUser._id
      }, process.env.JWT_SECRET)
    res.status(200).json({
        success:true,
        msg:"User logged in",
        token
    })
} catch (error) {
    res.status(500).json({
        success:false,
        error
    })
}  
}

module.exports = {register,login}

// const sendResetEmail = async (req, res) => {
//     try {
//       const { email } = req.body; 
  
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.SMTP_EMAIL, 
//           pass: process.env.SMTP_PASSWORD, 
//         },
//       });
  
     
//       const info = await transporter.sendMail({
//         from: '"Maria ch" <chmaria912@gmail.com>', 
//         to: email, 
//         subject: 'Password Reset Request', 
//         text: 'Hello, please click the link below to reset your password.', 
//         html: `<b>Click <a href="https://yourdomain.com/reset-password">here</a> to reset your password</b>`, 
//       });
  
      
//       console.log('Email sent: %s', info.messageId);
  
  
//       res.status(200).json({
//         success: true,
//         msg: 'Check your email to reset your password.',
//         info,
//       });
//     } catch (error) {
//       console.error('Error sending email:', error); 
//       res.status(500).json({
//         success: false,
//         msg: 'Failed to send email. Please try again later.',
//         error,
//       });
//     }
//   };