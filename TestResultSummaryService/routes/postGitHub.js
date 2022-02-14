const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');


module.exports = async (req, res) => {
    const doFetch = async (...args) => {
        return (await fetch(...args)).json();
    };

    const file = fs.readFileSync("./README.md");
    const form1 = new FormData();
    form1.append("content_type", "image/jpeg");
    form1.append("authenticity_token", "__");
    form1.append("size", file.length);
    form1.append("name", "README.md");

    const { upload_url, asset, form } = await doFetch(
        "https://github.com/upload/policies/assets", {
            headers: {
                accept: "application/json",
                ...form1.getHeaders(),
                cookie: "user_session=<cookie>; __Host-user_session_same_site=<cookie>;"
            },
            body: form1.getBuffer(),
            method: "POST",
        }
    );
    console.log(upload_url, asset, form);

    res.send( asset, form );
};
