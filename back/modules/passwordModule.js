const crypto = require('crypto');
const passConfig = require('../config/passwordConfig.json');
const { setMaxListeners } = require('../models/admin');

const passwordModule ={
    createSalt : (req, res)=>{crypto.randomBytes(64, (err, buf)=>{
            if(err) res(err)
            req(buf,toString('base64'))
        })
    },

    createHashedPassword : createHashedPassword = (plainPassword) =>{
        const info = (async(req, res)=>{
            const salt = await this.createSalt();
            console.log(salt)
            crypto.pbkdf2(plainPassword, salt, passConfig.secretPasswrodKey,64,'sha512',(err,key)=>{
                if(err) res(err)
                req({password:key.toString('base64'), salt})
            })
        })
        return info
    }
}

module.exports = passwordModule