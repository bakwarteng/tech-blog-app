const newFormHandler = async (event) => {
  event.preventDefault();

  const blogTitle = document.querySelector("#blog-title").value.trim();
  const blogContent = document.querySelector("#blog-content").value.trim();
  //   const description = document.querySelector("#project-desc").value.trim();

  if (blogTitle && blogContent) {
    const response = await fetch(`/blogs`, {
      method: "POST",
      body: JSON.stringify({ blogTitle, blogContent }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/blogs");
    } else {
      alert("Failed to create blog post");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/blogs/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/blogProfile");
    } else {
      alert("Failed to delete blog post");
    }
  }
};

document
  .querySelector(".new-blog-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".blog-list")
  .addEventListener("click", delButtonHandler);
