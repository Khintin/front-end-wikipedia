import { isLoggedIn } from "./api/auth.js";
import { deletePostById, getPostById } from "./api/posts.js";
import { initNavigation } from "./navigation.js";
import { createAlert } from "./utils.js";

const params = new URLSearchParams(document.location.search);
const postId = params.get("id");

const actionsList = document.querySelector("#actions-list");

initNavigation();

const postTitle = document.querySelector("#post-title");
const postImg = document.querySelector("#post-image");
const postBody = document.querySelector("#post-body");

getPostById(postId).then((post) => {

    if (post) {
        createPost(post);
    }
    else {
        const container = document.querySelector("main");
        createAlert("error", "Something went wrong. Please return to the homepage or try again later", container, true);
    }
});

function createPost(post) {
    postTitle.innerText = post.title.rendered;

    try {
        let imageUrl = post._embedded['wp:featuredmedia'][0].source_url;

        if (imageUrl) {
            postImg.src = imageUrl;
            postImg.alt = post.title.rendered;
        }
    } catch (error) {
        console.log("Post has no image, using fallback");
    }

    postBody.innerHTML = post.content.rendered;
}

function createActionButtons() {
    actionsList.innerHTML += `<li>
    <svg
        class="w-5 text-green-600 inline-block"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
    </svg>
    <a id="edit-button" href="./edit.html?id=${postId}">Edit</a>
</li>
<li>
    <svg
        class="w-5 text-green-600 inline-block"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
    </svg>

    <a href="#" id="delete-button">Delete</a>
</li>`;

    const deleteButton = document.querySelector("#delete-button");

    deleteButton.addEventListener("click", (event) => {
        deletePostById(postId).then((success) => {
            if (success) {
                window.location.href = "./index.html?action=deleted";
            }
            else {
                // Show some type of error message here
                console.log("Unable to delete the post");
            }
        })
    });

}

if (isLoggedIn()) {
    createActionButtons();
}