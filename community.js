const postBtn = document.getElementById("postbtn");
const mainContainer = document.getElementById("main-container");
const inviteBtn = document.getElementById("invitebtn"); // Updated ID

// Retrieve saved posts from local storage
const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

// Function to create a post card from saved data
function createPostCard(imageData, text, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardImage = document.createElement("img");
  cardImage.src = imageData;
  card.appendChild(cardImage);

  const cardText = document.createElement("p");
  cardText.textContent = text;
  card.appendChild(cardText);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => deletePost(index));

  card.appendChild(deleteBtn);

  mainContainer.appendChild(card);
}

function deletePost(index) {
  // Remove the post from the savedPosts array
  savedPosts.splice(index, 1);
  // Update the local storage
  localStorage.setItem("posts", JSON.stringify(savedPosts));
  // Remove the post card from the main container
  mainContainer.innerHTML = "";
  savedPosts.forEach((post, index) => createPostCard(post.image, post.text, index));
}

// Load saved posts into the main container
savedPosts.forEach(post => createPostCard(post.image, post.text));

postBtn.addEventListener("click", () => {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.accept = "image/*";
  imageInput.classList.add("image-input");

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.placeholder = "Enter your text here";
  textInput.classList.add("text-input");

  const postInfoBtn = document.createElement("button");
  postInfoBtn.textContent = "Post Information";
  postInfoBtn.classList.add("post-info-btn");

  inputContainer.appendChild(imageInput);
  inputContainer.appendChild(textInput);
  inputContainer.appendChild(postInfoBtn);

  mainContainer.appendChild(inputContainer);

  postInfoBtn.addEventListener("click", () => {
    const imageFile = imageInput.files[0];
    const text = textInput.value;

    // Check if either text or image field is filled
    if (text.trim() !== '' || imageFile) {
      // Handle cases with or without an image
      if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
          const imageData = reader.result;
          const post = { image: imageData, text: text };
          savedPosts.push(post);
          localStorage.setItem("posts", JSON.stringify(savedPosts));
          createPostCard(imageData, text);
          inputContainer.remove();
        };
      } else {
        const post = { image: "", text: text };
        savedPosts.push(post);
        localStorage.setItem("posts", JSON.stringify(savedPosts));
        createPostCard("", text);
        inputContainer.remove();
      }
    } else {
      alert("Please fill in at least one field (text or image).");
    }
  });
});

// Event listener for "Invite" button
inviteBtn.addEventListener("click", () => {
  // Construct the registration page link dynamically based on the current page URL
  const registrationLink = "https://sreejakanaparthi.github.io/frost_hacks/ ";

  // Create a temporary input element to copy the link
  const tempInput = document.createElement("input");
  tempInput.value = registrationLink;

  // Append the input element to the body (it needs to be in the DOM for the select and execCommand to work)
  document.body.appendChild(tempInput);

  // Select the text inside the input
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices

  // Execute the copy command
  document.execCommand("copy");

  // Remove the temporary input element
  document.body.removeChild(tempInput);

  // Provide feedback to the user (you can use a tooltip, alert, or any other method)
  alert("Registration link copied!");
});
