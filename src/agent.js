import { shell, remote } from 'electron';
import csv from 'node-csv';
const { Menu, MenuItem, dialog } = remote;

export default {
    showMenu(template) {
        const menu = new Menu();
        template.forEach(item => {
            menu.append(new MenuItem(item));
        });

        menu.popup();
    },
    openUrl(url) {
        shell.openExternal(url);
    },
    confirmDialog(params = {}) {
        params = Object.assign({
            content: '',
            onOk: () => {},
            onCancel: () => {}
        }, params);

        dialog.showMessageBox({
            type: 'question',
            buttons: ['确定', '取消'],
            title: '',
            message: params.content
        }, response => {
            response === 0 ? params.onOk() : params.onCancel();
        })
    },
    errorDialog(content) {
        dialog.showErrorBox('', content);
    },
    successDialog(content) {
        dialog.showMessageBox({
            type: 'info',
            buttons: ['确定'],
            title: '',
            message: content
        })
    },
    getCSVData(file) {
        return new Promise((resolve, reject) => {
            csv.createParser().mapFile(file.path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        
    }
};