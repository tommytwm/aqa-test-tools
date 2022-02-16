const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');


module.exports = async (req, res) => {
    const doFetch = async (...args) => {
        return (await fetch(...args));
    };

    const file = fs.readFileSync("../<file_in_root>");
    const form1 = new FormData();
    form1.append("content_type", "multipart/form-data");
    form1.append("authenticity_token", "<token>");
    form1.append("repository_id", "<id>");
    form1.append("size", file.length);
    form1.append("name", "<file_name>");

    const { upload_url, asset, form } = await doFetch(
        "https://github.com/upload/policies/assets", {
            headers: {
                accept: "application/json",
                ...form1.getHeaders(),
                cookie: "<cookie>"
            },
            body: form1.getBuffer(),
            method: "POST",
            'User-Agent': '*'
        }
    );

    console.log(upload_url, asset, form);

    // res.send( asset, form );
};
