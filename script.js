function encryptDocument() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var plaintext = event.target.result;
            var password = prompt("Masukkan password untuk enkripsi:");
            if (password) {
                var encrypted = CryptoJS.AES.encrypt(plaintext, password).toString();
                var blob = new Blob([encrypted], {type: "application/octet-stream"});
                var filename = file.name + ".enc";
                saveAs(blob, filename);
                document.getElementById("message").innerText = "Dokumen telah terenkripsi " + filename;
            }
        };
        reader.readAsBinaryString(file);
    }
}

function decryptDocument() {
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".enc";
    fileInput.addEventListener("change", function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(event) {
                var ciphertext = event.target.result;
                var password = prompt("Masukkan password untuk dekripsi:");
                if (password) {
                    try {
                        var decrypted = CryptoJS.AES.decrypt(ciphertext, password).toString(CryptoJS.enc.Utf8);
                        // Periksa apakah dekripsi berhasil dengan memeriksa hasilnya
                        if (decrypted) {
                            var filename = file.name.replace(".enc", "");
                            var blob = new Blob([decrypted], {type: "application/octet-stream"});
                            saveAs(blob, filename);
                            document.getElementById("message").innerText = "Dokumen telah terdekripsi " + filename;
                        } else {
                            alert("Error: Password salah!");
                        }
                    } catch (error) {
                        alert("Error: Password salah!");
                    }
                }
            };
            reader.readAsBinaryString(file);
        }
    });
    fileInput.click();
}


var saveAs = function(blob, filename) {
    var link = document.createElement("a");
    if (typeof link.download === "string") {
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(blob);
    }
};
