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