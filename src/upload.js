
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import axios from 'axios';
const concat = require("concat-stream")

require('dotenv').config();

const root_folder = path.dirname(__dirname);
const data_folder = path.join(root_folder, 'data');




const api = axios.create({
    baseURL: process.env.CMS_ENDPOINT,
    params: {
        key: process.env.CMS_KEY
    }
});


const uploadFiles = () => {
    return fs.promises.readdir(data_folder)
        .then(async files => {
            for (let file of files) {
                let fd = new FormData();
                fd.append('file', fs.createReadStream(`${data_folder}/${file}`));

                await fd.pipe(concat( async data => {
                    await api.post('upload', data, {
                        headers: {
                            ...fd.getHeaders()
                        }
                    })
                        .then(() => console.log(`${file} uploaded`))
                        .catch((error) => {
                            if (error.response) {
                                /*
                                console.error(error.response.data);
                                console.error(error.response.status);
                                console.error(error.response.headers);
                                */
                                console.log(error.response.config);
                                fs.writeFile(`${root_folder}/teste/out-${Date.now()}.html`, error.response.data, function() {});
                            } else if (error.request) {
                                console.error(error.request);
                            } else {
                                console.error(error.message);
                            }
                            console.error(`${file} not uploaded ${error.message}`)
                        });
                }));

            }
        });
}

( async () => {
    await uploadFiles();
})();