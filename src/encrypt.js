import crypto from 'crypto';

export default {
    encryptMd5(str) {
        return crypto.createHash('md5').update(str).digest('hex').toLowerCase();
    },

    encrypt(str, key) {    
        const cipher = crypto.createCipher('aes-256-cbc', key);
        let encryptedPassword = cipher.update(str, 'utf8', 'base64');
        encryptedPassword = encryptedPassword + cipher.final('base64');
        return encryptedPassword;
    },

    decipher(str, key){
        const decipher = crypto.createDecipher('aes-256-cbc', key);
        let decryptedPassword = decipher.update(str, 'base64', 'utf8');
        decryptedPassword = decryptedPassword + decipher.final('utf8');
        return decryptedPassword;
    }
};