const password = document.getElementById("password");
const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");
const togglePassword = document.getElementById("togglePassword");

password.addEventListener("input", () => {
    const val = password.value;
    let strength = 0;

    if (val.length >= 6) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    if (strength === 0) {
        strengthText.textContent = "Strength: -";
        strengthBar.style.background = "lightgray";
    } else if (strength === 1) {
        strengthText.textContent = "Strength: Weak";
        strengthBar.style.background = "red";
    } else if (strength === 2) {
        strengthText.textContent = "Strength: Medium";
        strengthBar.style.background = "orange";
    } else if (strength === 3) {
        strengthText.textContent = "Strength: Good";
        strengthBar.style.background = "blue";
    } else {
        strengthText.textContent = "Strength: Strong";
        strengthBar.style.background = "green";
    }
});

togglePassword.addEventListener("click", () => {
    password.type = password.type === "password" ? "text" : "password";
});
