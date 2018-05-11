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

        return passwordList;
    },

    delPassword(password) {
        let passwordListStr = localStorage.getItem('passwordList');
        let passwordList = passwordListStr ? JSON.parse(passwordListStr) : [];
        passwordList = passwordList.filter(item => password.id !== item.id);
        passwordListStr = JSON.stringify(passwordList);
        localStorage.setItem('passwordList', passwordListStr);
        return passwordList;
    },

    updatePassword(password) {
        let passwordListStr = localStorage.getItem('passwordList');
        let passwordList = passwordListStr ? JSON.parse(passwordListStr) : [];
        const time = +new Date();
        passwordList = passwordList.map(item => {
            if (item.id === password.id) {
                password.createTime = item.createTime;
                password.updateTime = time;
                return password;
            } else {
                return item;
            }
        });
        passwordListStr = JSON.stringify(passwordList);
        localStorage.setItem('passwordList', passwordListStr);
        return passwordList;
    },

    getPasswordList() {
        const passwordListStr = localStorage.getItem('passwordList');
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