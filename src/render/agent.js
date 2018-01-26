import { shell } from 'electron';

export default {
    openUrl(url) {
        shell.openExternal(url);
    }
};