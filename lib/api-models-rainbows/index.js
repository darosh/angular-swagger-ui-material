var APIs = 'https://api.apis.guru/v2/list.json';
var COLORS = 3;
var DIR = __dirname;
var DATA = DIR + '/api-models-rainbows.json';

const fs = require('fs');
const async = require('async');
const got = require('got');
const url = require('url');
const PNG = require('pngjs').PNG;
const colorgram = require('colorgram');
const gm = require('gm');
const d3Color = require('d3-color');

module.exports.download = download;
module.exports.load = load;

if (!module.parent) {
    download();
}

function load (done) {
    try {
        done(require(DATA));
    } catch (ign) {
        download(done);
    }
}

function download (done) {
    got(APIs).then(response => {
        var apis = JSON.parse(response.body);
        var colors = {};

        async.forEachOfLimit(apis, 32, (item, key, callback) => {
            var info = item.versions[item.preferred].info;
            var logo = info['x-logo'];

            if (logo) {
                var bgColor = logo.backgroundColor;
                var ext = url.parse(logo.url).path.replace(/^.*(\.[a-z]+)$/gi, '$1');
                var name = key + ext;
                var down = got.stream(logo.url);

                if (ext.toLowerCase() !== '.png') {
                    down = gm(down, 'image.svg').stream('png');
                }

                down.pipe(new PNG())
                    .on('error', ()=> {
                        console.error('ERROR', name);
                        callback();
                    })
                    .on('parsed', function () {
                        console.log(name);
                        colors[key] = colorgram.extract({
                            data: this.data,
                            width: this.width,
                            height: this.height,
                            channels: 4
                        }, bgColor ? (COLORS - 1) : COLORS);

                        if (bgColor) {
                            var r = d3Color.rgb(bgColor);
                            colors[key].push([r.r, r.g, r.b, 1]);
                        }

                        colors[key].forEach(function (c) {
                            c.pop();

                            var n = d3Color.rgb(c[0], c[1], c[2], 1);
                            var h = d3Color.cubehelix(n);
                            h.s = Math.max(h.s, 1);
                            h.l = Math.max(h.l, 0.8);
                            h.l = Math.min(h.l, 1.2);

                            c[0] = h.h;
                            c[1] = h.s;
                            c[2] = h.l;
                        });

                        colors[key].sort((b, a) => {
                            return a[0] - b[0];
                        });

                        colors[key].forEach((c) => {
                            var r = d3Color.rgb(d3Color.cubehelix(c[0], c[1], c[2], 1).rgb().toString());

                            c[0] = r.r;
                            c[1] = r.g;
                            c[2] = r.b;
                        });

                        callback();
                    });
            } else {
                callback();
            }
        }, () => {
            fs.writeFile(DATA, JSON.stringify(colors), () => {
                console.log('DONE');

                if(done) {
                    done(colors);
                }
            });
        });
    });
}
