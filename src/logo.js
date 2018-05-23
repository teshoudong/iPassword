import request from 'request';
import cheerio from 'cheerio';
import path from 'path';

export default {
    getLogoByName(name) {
        return new Promise((resolve, reject) => {
            request(`http://android.myapp.com/myapp/getSearchSuggest.htm?kw=${encodeURIComponent(name)}`, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const data = JSON.parse(body);
                    if (data && data.obj && data.obj.obj && data.obj.obj.length > 0) {
                        resolve(data.obj.obj[0].iconUrl);
                    } else {
                        resolve(null);
                    }
                } else {
                    resolve(null);
                }
            });
        });
    },
    getLogoByWebsite(website) {
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
                    if (logo && !logo.startsWith('data:image') && !logo.startsWith('http')) {
                        if (logo.startsWith('//')) {
                            logo = `http:${logo}`;
                        } else {
                            logo = path.join(`http://${response.request.host}`, logo);
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
    },
    getLogo({website, name}) {
        return new Promise((resolve, reject) => {
            if (website) {
                this.getLogoByWebsite(website).then(logo => {
                    if (logo) {
                        resolve(logo);
                    } else {
                        this.getLogoByName(name).then(logo => {
                            if (logo) {
                                resolve(logo);
                            } else {
                                resolve(null);
                            }
                        });
                    }
                })
            } else {
                this.getLogoByName(name).then(logo => {
                    if (logo) {
                        resolve(logo);
                    } else {
                        resolve(null);
                    }
                });
            }
        });
        
    }
};