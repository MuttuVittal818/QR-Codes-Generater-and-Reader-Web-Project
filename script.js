const navitems = document.querySelectorAll("nav div");
const containers = document.querySelectorAll(".container");

navitems.forEach((item) => {
  item.addEventListener("click", () => {
    navitems.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");
    containers.forEach((container) => {
      container.classList.remove("active");
    });
    document.querySelector(`#${item.id}-container`).classList.add("active");
  });
});

const customPicker = document.querySelectorAll(".custom-picker");
const colorPicker = document.querySelectorAll(".color-picker");

customPicker.forEach((item) => {
  item.addEventListener("click", () => {
    item.querySelector(".color-picker").click();
  });
});

colorPicker.forEach((item) => {
  item.addEventListener("change", (e) => {
    color = e.target.value;
    span = item.parentElement.querySelector("span");
    input = item.parentElement.querySelector("input[type=text]");
    span.style.backgroundColor = color;
    input.value = color;
  });
});

const uploadElem = document.querySelector(".upload-img");
const uploadImgInput = document.querySelector("#upload-img-input");
const clearLogo = document.getElementById("clear-logo");

uploadElem.addEventListener("click", () => {
  uploadImgInput.click();
});

uploadImgInput.addEventListener("change", (e) => {
  document.getElementById("clear-logo").classList.remove("active"); //
  const file = e.target.files[0];
  if (!file) return; //
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    //img = uploadImgInput.nextSibling.nextSibling;
    //img.src = reader.result;
    uploadImgInput.nextSibling.nextSibling.src = reader.result;
    generateQRCode();
  };
});

// not working----------------------------------------------------------------

clearLogo.addEventListener("click", () => {
  imageRadios.forEach((item) => {
    item.checked = false;
  });
  clearLogo.classList.add("active");
  generateQrCode();
});

//---------------------------------------------------------

const range = document.querySelector(".custom-slider input"),
  tooltip = document.querySelector(".custom-slider span"),
  setValue = () => {
    const newValue = Number(
        ((range.value - range.min) * 100) / (range.max - range.min)
      ),
      newPosition = 16 - newValue * 0.32;
    tooltip.innerHTML = range.value + " x " + range.value;
    tooltip.style.left = `calc(${newValue}% + (${newPosition}px))`;
  };

document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener("input", setValue);

const customDropdown = document.querySelectorAll(".custom-dropdown");

//add event listeners on all option inside customdropdown
customDropdown.forEach((item) => {
  options = item.querySelectorAll(".option");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      allOptions = option.parentElement.querySelectorAll(".option");
      allOptions.forEach((item) => {
        item.classList.remove("active");
      });
      option.classList.add("active");
      item.querySelector(".selected").innerHTML = option.innerHTML;
      generateQRCode();
    });
  });
});

const generateBtn = document.querySelector(".generate-btn");
const container = document.querySelector(".qr-code-img");


const width = document.querySelector("#size"),
 
  height = document.querySelector("#size"),
  data = document.querySelector("#text"),
  foregroundColor = document.querySelector("#fg-color"),
  backgroundColor = document.querySelector("#bg-color"),
  cornerColor = document.querySelector("#corner-color"),
  imageRadios = document.querySelectorAll("input[name='logo']"),
  dotsStyle = document.querySelector("#dots-style"),
  cornerSquaresStyle = document.querySelector("#corner-squares-style"),
  cornerDotsStyle = document.querySelector("#corner-dots-style");


// generate QR code on value change
width.addEventListener("change", generateQrCode);
height.addEventListener("change", generateQrCode);
data.addEventListener("input", generateQrCode);
foregroundColor.addEventListener("change", generateQrCode);
backgroundColor.addEventListener("change", generateQrCode);
cornerColor.addEventListener("change", generateQrCode);
generateBtn.addEventListener("click", generateQrCode);
imageRadios.forEach((item) => {
  item.addEventListener("change", generateQrCode);
  item.addEventListener("change", () => {
    clearLogo.classList.remove("active");
  });
});

// function to generate QR code
function generateQrCode() {
  // console.log("generating");
  // get selected image radio
  let imageRadio = document.querySelector("input[name='logo']:checked");
  // select corresponding image
  let image = document.getElementById(imageRadio?.value) || null;

  qrCode = new QRCodeStyling({
    width: width.value,
    height: height.value,
    data: data?.value || "This Project developed by Muttu Handigund ",
    margin: 10,
    type: "canvas",
    image: image?.src || null,
    imageOptions: {
      saveAsBlob: true,
      crossOrigin: "anonymous",
      margin: 15,
    },
    dotsOptions: {
      color: foregroundColor.value,
      type: dotsStyle.innerHTML,
    },
    backgroundOptions: {
      color: backgroundColor.value,
    },
    cornersSquareOptions: {
      color: cornerColor.value,
      type: cornerSquaresStyle.innerHTML,
    },
    cornersDotOptions: {
      color: cornerColor.value,
      type: cornerDotsStyle.innerHTML,
    },
  });
  // after generating, show on DOM
  container.innerHTML = "";
  qrCode.append(container);
}
generateQrCode();

const downloadPng = document.getElementById("download-png"),
  downloadJpg = document.getElementById("download-jpg"),
  downloadSvg = document.getElementById("download-svg");

let name;

downloadPng.addEventListener("click", () => {
  qrCode.download({
    name: "open-source-coding-" + Date.now(),
    extension: "png",
  });
});

downloadJpg.addEventListener("click", () => {
  qrCode.download({
    name: "open-source-coding-" + Date.now(),
    extension: "jpg",
  });
});

downloadSvg.addEventListener("click", () => {
  qrCode.download({
    name: "open-source-coding-" + Date.now(),
    extension: "svg",
  });
});

const dropzone = document.querySelector(".dropzone");
const dropzoneInput = document.querySelector("#file");
const dropzoneText = document.querySelector(".dropzone .text");

const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const file = e.dataTransfer.files[0];
  dropzoneInput.files = e.dataTransfer.files;
  if (dropzoneInput.files.length) {
    if (!file) return;
    if (!checkFile(file)) {
      return;
    }
    let formData = new FormData();
    formData.append("file", file);
    fetchRequest(file, formData);
  }
};

const handleDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();
  dropzone.classList.add("highlight");
};

const handleDragLeave = (e) => {
  e.preventDefault();
  e.stopPropagation();
  dropzone.classList.remove("highlight");
};

dropzone.addEventListener("dragover", handleDragOver);
dropzone.addEventListener("dragleave", handleDragLeave);
dropzone.addEventListener("drop", handleDrop);

dropzoneInput.addEventListener("change", (e) => {
  if (dropzoneInput.files.length) {
    let file = e.target.files[0];
    if (!file) return;
    if (!checkFile(file)) {
      return;
    }
    let formData = new FormData();
    formData.append("file", file);
    fetchRequest(file, formData);
  }
});

function updateThumbnail(img) {
  let reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onload = () => {
    content = dropzone.querySelector(".content");
    img = dropzone.querySelector("img");
    img.src = reader.result;
    img.classList.add("show");
    content.classList.remove("show");
  };
}

//function reset
function reset() {
  content = dropzone.querySelector(".content");
  img = dropzone.querySelector("img");
  img.src = "";
  img.classList.remove("show");
  content.classList.add("show");
  resultTextarea.innerText = "";
}

function checkFile(file) {
  const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (validTypes.indexOf(file.type) === -1) {
    dropzone.querySelector(".text").innerHTML =
      "Please select an image file (jpg or png)";
    return false;
  }
  return true;
}

const resultTextarea = document.getElementById("result");
const copyBtn = document.getElementById("copy");
const openBtn = document.getElementById("open");

copyBtn.addEventListener("click", () => {
  text = resultTextarea.textContent;
  navigator.clipboard.writeText(text);
});

openBtn.addEventListener("click", () => {
  text = resultTextarea.textContent;
  window.open(text, "_blank");
});

function fetchRequest(file, formData) {
  dropzoneText.innerText = "Scanning QR Code...";
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      dropzoneText.innerText = result
        ? "Upload QR Code to Scan"
        : "Couldn't scan QR Code";
      if (!result) {
        reset();
        return;
      }
      resultTextarea.innerText = result;
      document.querySelector("#result-btns").classList.add("active");
      if (!isValidUrl(result)) {
        openBtn.style.display = "none";
      } else {
        openBtn.style.display = "block";
      }
      updateThumbnail(file);
    })
    .catch(() => {
      reset();
      dropzoneText.innerText = "Couldn't scan QR Code";
    });
}

function isValidUrl(urlString) {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
}
