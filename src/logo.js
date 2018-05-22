const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const url = require('url');

export default {
    getLogo(website) {
        return new Promise((resolve, reject) => {
            request({
                url: website,
                headers: {
                    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
                }
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(body);
                    let logo = $('link[rel=apple-touch-icon-precomposed]').attr('href') || $('link[rel=apple-touch-icon]').attr('href');
                    if (!logo.startsWith('http')) {
                        if (logo.startsWith('//')) {
                            logo = `http:${logo}`;
                        } else {
                            logo = path.join(`http://${url.parse(website).host}`, logo);
                        }
                    }

                    if (logo) {
                        resolve(logo);
                    } else {
                        resolve(null);
                    }
                } else {
                    resolve(null);
                }
            })
        });
    }
};