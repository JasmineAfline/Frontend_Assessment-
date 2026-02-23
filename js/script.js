document.addEventListener("DOMContentLoaded", function () {
    
   
    const foundation = document.getElementById("foundation");
    if (foundation) {
        foundation.addEventListener("click", function() {
            const desc = this.querySelector(".description");
            if(desc) desc.classList.toggle("d-none");
        });
    }

    
    const economy = document.getElementById("economy");
    if (economy) {
        economy.addEventListener("click", function() {
            const desc = this.querySelector(".description");
            if(desc) desc.classList.toggle("d-none");
        });
    }

    
    const joinForm = document.getElementById("joinForm");
    if (joinForm) {
        joinForm.addEventListener("submit", function(e) {
            e.preventDefault();
            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();

            if(name === "" || email === "") {
                alert("Please fill all fields.");
            } else {
                alert("Membership submitted successfully!");
                this.reset();
            }
        });
    }
});


function toggleView(id) {
    const content = document.getElementById(id);
    if (content) {
        content.classList.toggle("d-none");
    }
}