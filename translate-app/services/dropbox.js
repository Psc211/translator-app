const axios = require("axios");

const upload = async (filename, content) => {
  const response = await axios.post("https://content.dropboxapi.com/2/files/upload", content, {
    headers: {
      Authorization: `Bearer ${process.env.DROPBOX_TOKEN}`,
      "Dropbox-API-Arg": JSON.stringify({
        path: `/${filename}`,
        mode: "overwrite",
        autorename: false,
        mute: false,
      }),
      "Content-Type": "application/octet-stream",
    },
  });

  return `https://www.dropbox.com/home${response.data.path_display}`;
};

module.exports = upload;
