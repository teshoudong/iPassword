import csv from 'node-csv';

export default {
    getCSVData(path) {
        return new Promise((resolve, reject) => {
            csv.createParser().mapFile(path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        
    }
};