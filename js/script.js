document.addEventListener("DOMContentLoaded", function () {
    const membershipItems = document.querySelectorAll(".membership-item");
    
    membershipItems.forEach(item => {
        const header = item.querySelector(".membership-header");
        const content = item.querySelector(".membership-content");
        
        if (header && content) {
            header.addEventListener("click", function(e) {
                e.preventDefault();
                toggleMembership(item, content);
            });
            
            item.addEventListener("click", function(e) {
                if (e.target === header || header.contains(e.target)) {
                    return;
                }
                toggleMembership(item, content);
            });
        }
    });
    
    function toggleMembership(item, contentEl) {
        const isHidden = contentEl.classList.contains("d-none");
        
        membershipItems.forEach(other => {
            if (other !== item) {
                const otherContent = other.querySelector(".membership-content");
                if (otherContent && !otherContent.classList.contains("d-none")) {
                    otherContent.classList.add("d-none");
                    other.classList.remove("active");
                }
            }
        });
        
        if (isHidden) {
            contentEl.classList.remove("d-none");
            item.classList.add("active");
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    item.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }, 100);
            }
        } else {
            contentEl.classList.add("d-none");
            item.classList.remove("active");
        }
    }


    const joinForm = document.getElementById("joinForm");
    if (joinForm) {
        joinForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                const name = document.getElementById("name").value.trim();
                const email = document.getElementById("email").value.trim();
                
                console.log("Form submitted:", { name, email });
                alert("Thank you " + name + "! Your submission was successful.");
                this.reset();
                clearFormErrors();
            }
        });
        
        const formInputs = joinForm.querySelectorAll("input[required], textarea[required], select[required]");
        formInputs.forEach(input => {
            input.addEventListener("blur", function() {
                validateField(this);
            });
            input.addEventListener("input", function() {
                if (this.classList.contains("is-invalid")) {
                    validateField(this);
                }
            });
        });
    }
    
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll("input[required], textarea[required], select[required]");
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        let isValid = true;
        const value = field.value.trim();
        let errorMsg = "";
        
        if (value === "") {
            errorMsg = "This field is required.";
            isValid = false;
        }
        else if (field.type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMsg = "Please enter a valid email address.";
                isValid = false;
            }
        }
        else if (field.type === "text" && value.length < 2) {
            errorMsg = "Please enter at least 2 characters.";
            isValid = false;
        }
        
        if (!isValid) {
            field.classList.add("is-invalid");
            showFieldError(field, errorMsg);
        } else {
            field.classList.remove("is-invalid");
            clearFieldError(field);
        }
        
        return isValid;
    }
    
    function showFieldError(field, msg) {
        clearFieldError(field);
        const errorDiv = document.createElement("small");
        errorDiv.className = "form-error text-danger d-block mt-1";
        errorDiv.textContent = msg;
        field.parentNode.appendChild(errorDiv);
        field.classList.add("is-invalid");
    }
    
    function clearFieldError(field) {
        const errorDiv = field.parentNode.querySelector(".form-error");
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    function clearFormErrors() {
        const form = document.getElementById("joinForm");
        if (form) {
            const inputs = form.querySelectorAll("input, textarea, select");
            inputs.forEach(input => {
                input.classList.remove("is-invalid");
                clearFieldError(input);
            });
        }
    }
    
    membershipItems.forEach(item => {
        const header = item.querySelector(".membership-header");
        if (header) {
            header.setAttribute("role", "button");
            header.setAttribute("tabindex", "0");
            header.addEventListener("keydown", function(e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    });
    
});