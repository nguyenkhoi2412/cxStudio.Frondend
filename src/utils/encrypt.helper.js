import CryptoJs from "crypto-js";
import RSAKey from "react-native-rsa";

export default {
  //#region string Base64
  base64: {
    encrypt: (stringToEncode) => btoa(stringToEncode),
    decrypt: (stringToDecode) => atob(stringToDecode),
  },
  //#endregion
  //#region cryptoJs-aes
  aes: {
    encrypt: (dataObj) => {
      return CryptoJs.AES.encrypt(JSON.stringify(dataObj), process.env.SALT_AES)
        .toString()
        .replace(/\+/g, "p1L2u3S")
        .replace(/\//g, "s1L2a3S4h")
        .replace(/=/g, "e1Q2u3A4l");
    },
    decrypt: (dataEncrypted) => {
      dataEncrypted = dataEncrypted
        .replace(/p1L2u3S/g, "+")
        .replace(/s1L2a3S4h/g, "/")
        .replace(/e1Q2u3A4l/g, "=");

      var bytes = CryptoJs.AES.decrypt(dataEncrypted, process.env.SALT_AES);
      return JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
    },
    generateKey: (length = 128, wordArray = false) => {
      let random = CryptoJs.lib.WordArray.random(length / 8);
      return wordArray ? random : random.toString();
    },
  },
  //#endregion
  //#region react-native-rsa
  rsa: {
    encrypt: (dataObj) => {
      var rsa = new RSAKey();

      // encrypt
      rsa.setPublicString(process.env.PUBLIC_KEY_RSA.replace(/\\/g, ""));
      var encrypted = rsa.encrypt(JSON.stringify(dataObj));
      return encrypted;
    },
    decrypt: (dataEncrypted) => {
      var rsa = new RSAKey();

      // decrypt
      rsa.setPrivateString(process.env.PRIVATE_KEY_RSA.replace(/\\/g, ""));
      var decrypted = rsa.decrypt(dataEncrypted); // decrypted == originText
      return JSON.parse(decrypted);
    },
    generateKey: (length = 2048) => {
      const bits = length;
      const exponent = "10001"; // must be a string. This is hex string. decimal = 65537
      var rsa = new RSAKey();
      rsa.generate(bits, exponent);
      var publicKey = rsa.getPublicString(); // return json encoded string
      var privateKey = rsa.getPrivateString(); // return json encoded string

      return {
        publicKey: publicKey,
        privateKey: privateKey,
      };
    },
  },
  //#endregion
};
