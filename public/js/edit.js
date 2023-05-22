import { createPost, editPostById, getPostById } from "./api/posts.js";
import { initNavigation } from "./navigation.js";
import { createAlert } from "./utils.js";

initNavigation();

const params = new URLSearchParams(document.location.search);
const postId = params.get("id");
const action = params.get("action");

const container = document.querySelector("main");
const postTitle = document.querySelector("#post-title");
const postBody = document.querySelector("#post-body");
const postImg = document.querySelector("#post-image");
const btnSubmit = document.querySelector("#submit-button");

if (postId) {
    getPostById(postId).then((post) => {
        if (!post) {
            createAlert("error", "We couldn't find the post you're looking for", container, true);
        }
        else {
            populatePost(post);
            btnSubmit.addEventListener("click", (event) => {
                event.preventDefault();

                editPostById(postId, postTitle.value, postBody.value).then((success) => {
                    if (success) {
                        createAlert("success", "The post was successfully updated", container, false);
                    }
                    else {
                        createAlert("error", "Unable to update the post", container, false);
                    }
                })
            });
        }
    });
}
else if (action && action == "new") {
    btnSubmit.addEventListener("click", (event) => {
        event.preventDefault();

        createPost(postTitle.value, postBody.value).then((result) => {
            if (result.success) {
                window.location.href = `./onepost.html?id=${result.id}`;
            }
            else {
                createAlert("error", "Unable to create post", container, false);
            }
        });
    });
}

function populatePost(post) {
    postTitle.value = post.title.rendered;
    postBody.value = post.content.rendered;

    try {
        postImg.src = post._embedded["wp:featuredmedia"][0].source_url;
    }
    catch (error) {
        console.log("No image, using fallback");
        postImg.remove();
    }
}