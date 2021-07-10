
import fs from 'fs';
import path from 'path';
//import FormData from 'form-data';
import axios from 'axios';
////const concat = require("concat-stream")
//import concat from 'concat-stream';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
//import fetch from 'node-fetch';
//import http from 'https';

import request from 'request';
//import multiparty from 'multiparty';


//const __dirname = path.dirname(fileURLToPath(import.meta.url));
//require('dotenv').config();
dotenv.config();

const root_folder = path.dirname(__dirname);
const data_folder = path.join(root_folder, 'data');




const api = axios.create({
    //baseURL: process.env.CMS_ENDPOINT,
    baseURL: process.env.CMS_ENDPOINT,
    //baseURL: 'https://rocca.dias.poa.br/api',
    params: {
        key: process.env.CMS_KEY
    }
});


const uploadFiles = () => {
    return fs.promises.readdir(data_folder)
        .then(async files => {
            for (let file of files) {

                let formData = {
                    file: {
                        value: fs.createReadStream(`${data_folder}/${file}`),
                        options: {
                            filename: file
                        }
                    }
                };

                request.post({
                    url: `${process.env.CMS_ENDPOINT}upload?key=${process.env.CMS_KEY}`,
                    formData,
                    gzip: true
                }, (err, response, body) => {
                    if (err) {
                        return console.error(`${file} not uploaded ${error.message}`)
                    }
                    console.log(`${file} uploaded`);
                })
                
                //let fd = new FormData();
                //let arquivo = fs.readFileSync(`${data_folder}/${file}`);
                //console.log(arquivo);
                //fd.append('file', arquivo);
                //fd.append('teste','ts')
                
                
                /*
                await fd.pipe(concat( async data => {
                    await api.post('upload',fd.getBuffer(), {headers: fd.getHeaders()})
                        .then(() => console.log(`${file} uploaded`))
                        .catch((error) => {
                            if (error.response) {
                               
                                //console.log(error.response.config);
                                let stats = fs.statSync(`${data_folder}/${file}`)
                                console.log({ size: stats.size }, file);
                                console.log('data',error.response.data);
                                fs.writeFile(`${root_folder}/teste/out-${Date.now()}.html`, JSON.stringify(error.response.data), function() {});
                            } else if (error.request) {
                                console.error(error.request.data);
                            } else {
                                console.error(error.message);
                            }
                            console.error(`${file} not uploaded ${error.message}`)
                        });
                    
                }));
                */
                

            }
        });
}

( async () => {
    await uploadFiles();
})();