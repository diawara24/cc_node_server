const CryptoJS = require("crypto-js");

// const key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
// const iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");

async function encrypt(string) {
    return CryptoJS.AES.encrypt(
      string,
      CryptoJS.enc.Base64.parse(process.env.CRYPTO_KEY),
      {
        iv: CryptoJS.enc.Base64.parse(process.env.CRYPTO_IV),
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString();
  }
  
  async function decrypt(string) {
    var bytes = CryptoJS.AES.decrypt(
      string,
      CryptoJS.enc.Base64.parse(process.env.CRYPTO_KEY),
      {
        iv: CryptoJS.enc.Base64.parse(process.env.CRYPTO_IV),
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  
  module.exports = {
    encrypt,
    decrypt,
  };