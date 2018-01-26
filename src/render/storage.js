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
    }
};