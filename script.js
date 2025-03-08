async function uploadImage() {
    let input = document.getElementById("imageInput");
    let file = input.files[0];
    if (!file) {
        alert("Pilih gambar terlebih dahulu!");
        return;
    }

    let formData = new FormData();
    formData.append("file", file);

    try {
        let response = await fetch("http://detectorfruitfarmil.azurewebsites.net/predict/", {  // <-- Ubah URL backend ke Azure
            method: "POST",
            body: formData
        });

        let result = await response.json();
        console.log("Response dari backend:", result);  // Debugging

        if (result.predictions && result.predictions.length > 0) {
            console.log("Prediksi diterima, menampilkan gambar...");
            displayImage(file, result.predictions);
        } else {
            console.warn("Prediksi kosong! Tidak ada objek yang terdeteksi.");
        }
    } catch (error) {
        console.error("Error saat mengirim gambar:", error);
    }
}



function displayImage(file, predictions) {
    console.log("Menampilkan gambar...");
    let img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function () {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        console.log("Jumlah prediksi:", predictions.length);
        predictions.forEach(pred => {
            console.log("Bounding Box:", pred.bbox);  // Debugging
            ctx.strokeStyle = "red";
            ctx.lineWidth = 3;
            ctx.strokeRect(pred.bbox.left, pred.bbox.top, pred.bbox.width, pred.bbox.height);
            ctx.fillStyle = "red";
            ctx.font = "20px Arial";
            ctx.fillText(`${pred.tag} (${(pred.probability * 100).toFixed(2)}%)`, pred.bbox.left, pred.bbox.top - 5);
        });
    };
}


function displayImage(file, predictions) {
    let img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function () {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        console.log("Jumlah prediksi:", predictions.length);
        predictions.forEach(pred => {
            console.log("Bounding Box:", pred.bbox);  // Debugging
            ctx.strokeStyle = "red";
            ctx.lineWidth = 3;
            ctx.strokeRect(pred.bbox.left, pred.bbox.top, pred.bbox.width, pred.bbox.height);
            ctx.fillStyle = "red";
            ctx.font = "20px Arial";
            ctx.fillText(`${pred.tag} (${(pred.probability * 100).toFixed(2)}%)`, pred.bbox.left, pred.bbox.top - 5);
        });
    };
}

