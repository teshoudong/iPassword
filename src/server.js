import os from 'os';
import http from 'http';
import httpShutdown from 'http-shutdown';
import storage from './storage';

export default {
    getLocalIP() {
        const interfaces = os.networkInterfaces();
        const addresses = [];
        for (let k in interfaces) {
            for (let k2 in interfaces[k]) {
                const address = interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    addresses.push(address.address);
                }
            }
        }

        return addresses.length > 0 ? addresses[0] : null;
    },

    createHttpServerForApp(callback) {
        const server = httpShutdown(http.createServer((req, res) => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                keypassword: storage.getKeyPassword(),
                passwordList: storage.getPasswordList()
            }));
        }));

        server.listen(0);
        server.on('listening', () => {
            const port = server.address().port;
            callback(port);
        });

        return server;
    }
};