document.addEventListener("DOMContentLoaded", () => {
    const addUserBtn = document.getElementById("addUserBtn");
    if (addUserBtn) {
        addUserBtn.addEventListener("click", () => {
            localStorage.removeItem("editUserIndex");
            localStorage.removeItem("editUserData");
            window.location.href = "add-user.html";
        });
    }

    const userTableBody = document.querySelector("tbody");
    if (userTableBody) {
        loadAndDisplayUsers();
    }
});

function loadAndDisplayUsers() {
    const userTableBody = document.querySelector("tbody");
    userTableBody.innerHTML = "";

    let users = JSON.parse(localStorage.getItem("dashboardUsers")) || [];

    if (users.length > 0) {
        users.forEach((user, index) => {
            const row = document.createElement("tr");
            
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.role}</td>
                <td>${user.email}</td>
                <td>${user.salary}</td>
                <td>
                    <button class="edit-btn" onclick="editUser(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
                </td>
            `;
            
            userTableBody.appendChild(row);
        });
    }
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("dashboardUsers")) || [];
    users.splice(index, 1);
    localStorage.setItem("dashboardUsers", JSON.stringify(users));
    loadAndDisplayUsers();
}

function editUser(index) {
    let users = JSON.parse(localStorage.getItem("dashboardUsers")) || [];
    let user = users[index];

    localStorage.setItem("editUserIndex", index);
    localStorage.setItem("editUserData", JSON.stringify(user));

    window.location.href = "add-user.html";
}
document.addEventListener("DOMContentLoaded", () => {
    const addUserForm = document.getElementById("addUserForm");
    const cancelBtn = document.getElementById("cancelBtn");

    const editIndex = localStorage.getItem("editUserIndex");
    
    if (editIndex !== null) {
        const editData = JSON.parse(localStorage.getItem("editUserData"));
        if (editData) {
            document.getElementById("fullName").value = editData.name || "";
            document.getElementById("userRole").value = editData.role || "";
            document.getElementById("userSalary").value = editData.salary || "";
            document.getElementById("userEmail").value = editData.email || "";
        }
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            localStorage.removeItem("editUserIndex");
            localStorage.removeItem("editUserData");
            window.location.href = "index.html";
        });
    }

    if (addUserForm) {
        addUserForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("fullName").value;
            const role = document.getElementById("userRole").value;
            const salary = document.getElementById("userSalary").value;
            const email = document.getElementById("userEmail").value;

            const userData = { name, role, salary, email };
            let users = JSON.parse(localStorage.getItem("dashboardUsers")) || [];

            const currentEditIndex = localStorage.getItem("editUserIndex");

            if (currentEditIndex !== null) {
                users[currentEditIndex] = userData;
                localStorage.removeItem("editUserIndex");
                localStorage.removeItem("editUserData");
            } else {
                users.push(userData);
            }

            localStorage.setItem("dashboardUsers", JSON.stringify(users));
            window.location.href = "index.html";
        });
    }
});