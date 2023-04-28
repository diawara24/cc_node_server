const CryptoJS = require("crypto-js");

const key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
const iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");

async function encrypt(value) {
    return CryptoJS.AES.encrypt(
        value,
        key,
        { iv: iv }
    )
        .toString();
}

async function decrypt(value) {
    const bytes = CryptoJS.AES.decrypt(value, key, { iv: iv });
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
    encrypt,
    decrypt
}