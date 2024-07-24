const newFormHandler = async (event) => {
  event.preventDefault();

  const blogTitle = document.querySelector("#blog-title").value.trim();
  const blogContent = document.querySelector("#blog-content").value.trim();

  if (blogTitle && blogContent) {
    try {
      const response = await fetch("/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogTitle, blogContent }),
      });

      if (response.ok) {
        document.location.replace("/blogs");
      } else {
        alert("Failed to create blog post");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the blog post");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    try {
      const response = await fetch(`/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        document.location.replace("/blogs");
      } else {
        alert("Failed to delete blog post");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the blog post");
    }
  }
};
