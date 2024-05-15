const newFormHandler = async (event) => {
  event.preventDefault();

  const blog_title = document.querySelector("#blog-title").value.trim();
  const blog_content = document.querySelector("#blog-content").value.trim();
  //   const description = document.querySelector("#project-desc").value.trim();
  console.log(blog_title);
  console.log(blog_content);
  if (blog_title && blog_content) {
    const response = await fetch(`/api/blogs`, {
      method: "POST",
      body: JSON.stringify({ blog_title, blog_content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/blogProfile");
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
