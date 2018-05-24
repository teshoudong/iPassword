import { shell, remote, clipboard } from 'electron';
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
    fileDialog(callback) {
        dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }, callback);
    },
    clipboard(text) {
        clipboard.writeText(text);
    }
};