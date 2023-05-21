import { getPostById } from "./api/posts.js";
import { initNavigation } from "./navigation.js";

const params = new URLSearchParams(document.location.search);
const postId = params.get("id");

initNavigation();

const postTitle = document.querySelector("#post-title");
const postImg = document.querySelector("#post-image");
const postBody = document.querySelector("#post-body");

getPostById(postId).then((post) => {
    console.log(post);
    createPost(post);
})

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