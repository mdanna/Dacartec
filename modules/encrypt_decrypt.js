var encrypt_decript = {
	algo: "aes",

	encryptDecryptProperties: {
		passphrasetext: ["pippopluto01"], 
		subalgo: "aes", 
		passphrasehashalgo: "md5"
	},

	prptobj:{
		padding:"pkcs5",
		mode:"cbc",
		initializationvector:"1234567890123456"
	},

	encrypt : function(inputstr){
		var encryptDecryptKey = kony.crypto.newKey("passphrase", 128, encrypt_decript.encryptDecryptProperties);
		var myEncryptedTextRaw = kony.crypto.encrypt(encrypt_decript.algo, encryptDecryptKey, inputstr, encrypt_decript.prptobj);
		var myEncryptedText  = kony.convertToBase64(myEncryptedTextRaw);
		return myEncryptedText.toString();
	},

	decrypt: function(str){
		var encryptDecryptKey = kony.crypto.newKey("passphrase", 128, encrypt_decript.encryptDecryptProperties);
		var myEncryptedTextRaw = kony.convertToRawBytes(str);
		var myClearText = kony.crypto.decrypt(encrypt_decript.algo, encryptDecryptKey, myEncryptedTextRaw, encrypt_decript.prptobj);
		return myClearText;
	}
};
