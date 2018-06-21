import CryptoJS from 'crypto-js';

export default {
    encryptSHA256(str) {
        // return crypto.createHash('sha256').update(str).digest('hex');
        return CryptoJS.SHA256(str).toString();
    },

    encrypt(str, key) {    
        // const cipher = crypto.createCipher('aes-256-cbc', key);
        // let encryptedPassword = cipher.update(str, 'utf8', 'base64');
        // encryptedPassword = encryptedPassword + cipher.final('base64');
        const encryptedPassword = CryptoJS.AES.encrypt(str, key).toString();
        return encryptedPassword;
    },

    decipher(str, key){
        // const decipher = crypto.createDecipher('aes-256-cbc', key);
        // let decryptedPassword = decipher.update(str, 'base64', 'utf8');
        // decryptedPassword = decryptedPassword + decipher.final('utf8');
        const decryptedPassword = CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8);
        return decryptedPassword;
    }
};