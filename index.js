const fetchHook = "http://localhost:3002/users/";
// Populate users
document.addEventListener("DOMContentLoaded", function () {
  fetch(fetchHook)
    .then((response) => response.json())
    .then((users) => {
      displayUsers(users);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
});

// Display users and html for new ones
function displayUsers(users) {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.innerHTML = `
        <p><strong>${user.firstName} ${user.lastName}</strong></p>
        <p>Email: ${user.email}</p>
        <p>Age: ${user.age}</p>
        <button onclick="deleteUser('${user._id}')">Delete</button>
        <button onclick="editUser('${user._id}')">Edit</button>
      `;
    userList.appendChild(userDiv);
  });
}
// Delete the users using their Id
function deleteUser(userId) {
  const isConfirmed = confirm("Are you sure you want to delete this user?");

  if (isConfirmed) {
    fetch(fetchHook + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("User Deleted");

          return fetch(fetchHook);
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .then((response) => response.json())
      .then((users) => {
        displayUsers(users);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error: Error deleting user");
      });
  }
}
//Edit the user with their unique Id
function editUser(userId) {
  console.log("Editing user with ID:", userId);

  fetch(fetchHook + userId)
    .then((response) => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    })
    .then((user) => {
      document.getElementById("firstName").value = user.firstName;
      document.getElementById("lastName").value = user.lastName;
      document.getElementById("email").value = user.email;
      document.getElementById("age").value = user.age;

      document.getElementById("userForm").dataset.editing = user._id;

      document.getElementById("userForm").onsubmit = function (event) {
        event.preventDefault();
        updateUser(user._id);
      };
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      alert("Error: " + error.message);
    });
}
// Update the user with their unique Id
function updateUser(userId) {
  const updatedUserData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    age: parseInt(document.getElementById("age").value),
  };

  fetch(fetchHook + userId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUserData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      return response.json();
    })
    .then((updatedUser) => {
      console.log("Updated User:", updatedUser);
      fetch(fetchHook)
        .then((response) => response.json())
        .then((users) => {
          displayUsers(users);
        });

      document.getElementById("userForm").reset();
      delete document.getElementById("userForm").dataset.editing;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error updating user: " + error.message);
    });
}
// Add new user
document.getElementById("userForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = document.getElementById("userForm");
  const isEditing = form.dataset.editing;

  const newUser = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    age: parseInt(document.getElementById("age").value),
  };

  if (isEditing) {
    updateUser(isEditing);
  } else {
    fetch(fetchHook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New user added:", data);
        alert("New user added: " + data.firstName + " " + data.lastName);
        document.getElementById("userForm").reset();
        fetch(fetchHook)
          .then((response) => response.json())
          .then((users) => {
            displayUsers(users);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error: " + error);
      });
  }
});
