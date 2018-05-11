import { shell, remote } from 'electron';
const { Menu, MenuItem } = remote;



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
    }
};