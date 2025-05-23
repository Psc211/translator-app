const axios = require("axios");

const translate = async (text, lang) => {
  const response = await axios.post("https://api-free.deepl.com/v2/translate", null, {
    params: {
      auth_key: process.env.DEEPL_API_KEY,
      text,
      target_lang: lang.toUpperCase(),
    },
  });

  return response.data.translations[0].text;
};

module.exports = translate;
