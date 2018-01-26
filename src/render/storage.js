export default {
    savePassword(password) {
        let passwordListStr = localStorage.getItem('passwordList');
        const passwordList = passwordListStr ? JSON.parse(passwordListStr) : [];
        const time = +new Date();
        password.id = +new Date();
        password.createTime = time;
        password.updateTime = time;
        passwordList.push(password);
        passwordListStr = JSON.stringify(passwordList);
        localStorage.setItem('passwordList', passwordListStr);
    },

    getPasswordList() {
        let passwordListStr = localStorage.getItem('passwordList');
        return passwordListStr ? JSON.parse(passwordListStr) : [];
    },

    saveKeyPassword(password) {
        localStorage.setItem('keypassword', password);
    },

    getKeyPassword() {
        return localStorage.getItem('keypassword') || '';
    },

    saveSessionPassword(password) {
        return sessionStorage.setItem('keypassword', password);
    },

    getSessionPassword() {
        return sessionStorage.getItem('keypassword') || '';
    }
};