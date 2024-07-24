const signupEventHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password) {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        const errorData = await response.json();
        alert(`Failed to sign up: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while signing up. Please try again later.");
    }
  } else {
    alert("Please enter both a username and password.");
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupEventHandler);
