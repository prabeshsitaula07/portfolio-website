// Function to extract blog post ID from the current page's filename
function getBlogPostIdFromFileName() {
  const currentPageUrl = window.location.pathname;
  const match = currentPageUrl.match(/blog(\d+)\.html/);
  return match ? match[1] : null;
}

// Function to format the date as "YYYY-MM-DD HH:MM:SS"
function formatDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}\n`;
}

// Define the loadComments function
function loadComments() {
  // Retrieve blog post ID from the current page's filename
  const blogPostId = getBlogPostIdFromFileName();

  if (!blogPostId) {
    console.error('Unable to determine the blog post ID from the current page.');
    return;
  }

  // Retrieve comments from local storage
  const existingComments = JSON.parse(localStorage.getItem(`comments_${blogPostId}`)) || [];

  // Assuming there's a container div with id 'comments-container'
  const commentsContainer = document.getElementById('comments-container');

  // Clear existing comments
  commentsContainer.innerHTML = '';
  commentsContainer.style.margin = 'auto';

  // Append each comment to the container
  existingComments.forEach((comment, index) => {
    const commentElement = document.createElement('div');
    commentElement.style.marginBottom = '30px';

    commentElement.innerHTML = `<strong>${comment.name}</strong>:<br> ${comment.comment} <br>
    <small>Published on ${comment.date}</small><br>
    <button class="delete-btn" onclick="removeComment('${blogPostId}', ${index})" style="
      background: #0151CB;
      border: 1px solid black;
      color: white;
      height: 30px;
      width: 100px;
      border-radius: 10px;
    ">Delete</button>`;
    commentsContainer.appendChild(commentElement);
  });
}

// Define the removeComment function
function removeComment(blogPostId, index) {
  // Retrieve existing comments from local storage
  const existingComments = JSON.parse(localStorage.getItem(`comments_${blogPostId}`)) || [];

  // Remove the comment at the specified index
  existingComments.splice(index, 1);

  // Save the updated comments array back to local storage
  localStorage.setItem(`comments_${blogPostId}`, JSON.stringify(existingComments));

  // Reload comments after removing one
  loadComments();
}

// Define the addComment function
function addComment() {
  // Retrieve blog post ID from the current page's filename
  const blogPostId = getBlogPostIdFromFileName();

  if (!blogPostId) {
    console.error('Unable to determine the blog post ID from the current page.');
    return;
  }

  const nameElement = document.getElementById('name');
  const commentElement = document.getElementById('comment');

  const name = nameElement.value.trim();
  const commentText = commentElement.value.trim();

  // Check if both name and comment are not empty
  if (name === '' || commentText === '') {
    alert('Please enter both your name and a comment before submitting.');
    return;
  }

  // Create a new comment object with the current date
  const newComment = {
    name: name,
    comment: commentText,
    date: formatDate(),
  };

  // Retrieve existing comments from local storage
  const existingComments = JSON.parse(localStorage.getItem(`comments_${blogPostId}`)) || [];

  // Add the new comment to the array
  existingComments.push(newComment);

  // Save the updated comments array back to local storage
  localStorage.setItem(`comments_${blogPostId}`, JSON.stringify(existingComments));

  // Clear the input values
  nameElement.value = '';
  commentElement.value = '';

  // Reload comments after adding a new one
  loadComments();
}

// Call loadComments when the page loads
window.addEventListener('load', loadComments);
