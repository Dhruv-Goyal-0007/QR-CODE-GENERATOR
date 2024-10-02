const wrapper = document.querySelector(".wrapper"),
      qrInput = wrapper.querySelector(".form input"),
      generateBtn = wrapper.querySelector(".form button"),
      qrImg = wrapper.querySelector(".qr-code img"),
      progressBar = document.getElementById('progressBar'),
      progressContainer = document.querySelector('.progress-container');

let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if (!qrValue || preValue === qrValue) return;
    
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    
    // Show the progress bar
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';
    
    // Simulate progress
    let progress = 0;
    let interval = setInterval(() => {
        if (progress < 100) {
            progress += 10;
            progressBar.style.width = progress + '%';
        } else {
            clearInterval(interval);
        }
    }, 300); // Adjust time to make it smoother

    // Generate the QR code
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
        
        // Hide progress bar after QR code is generated
        setTimeout(() => {
            progressContainer.style.display = 'none';
        }, 500); // Delay before hiding the progress bar
    });
});

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
    }
});
