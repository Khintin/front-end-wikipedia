import { getPosts } from "./api/posts.js";
import { initNavigation } from "./navigation.js";
import { createAlert } from "./utils.js";

const params = new URLSearchParams(document.location.search);
const action = params.get("action");

const searchBox = document.querySelector("#search-box");
const btnSearch = document.querySelector("#btn-search");
const postGrid = document.querySelector("#post-grid");
const posts = [];

initNavigation();

btnSearch.addEventListener("click", (event) => {
    event.preventDefault();

    if (searchBox.value.length < 1) {
        postGrid.innerHTML = "";
        posts.forEach(post => {
            createPost(post);
        });
        return;
    }

    search(searchBox.value);
});

if (action && action == "deleted") {
    const container = document.querySelector("main");
    createAlert("success", "The post was deleted", container, false);
}

getPosts().then(allPosts => {
    posts.push(...allPosts);

    allPosts.forEach(post => {
        createPost(post);
    });
});

function createPost(post) {
    let imageUrl = "/public/images/javascript.png";

    try {
        imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
    }
    catch (error) {
        // No image on this post
        console.log("Post didn't have an image, using fallback");
    }

    postGrid.innerHTML += `<a href="./onepost.html?id=${post.id}" class="rounded shadow-md text-center bg-white">
        <img
            src="${imageUrl}"
            alt="js"
            class="w-full h-full object-contain hover:opacity-75"
        />
        <p class="font-medium text-lg">${post.title.rendered}</p>
    </a>`
}

function search(query) {
    // Clear grid before we replace items
    postGrid.innerHTML = "";
    //Filter the posts by their title
    const filteredPosts = posts.filter(post => post.title.rendered.toLowerCase().indexOf(query.toLowerCase()) > -1);
    // Re-populate grid with filtered posts
    filteredPosts.forEach(post => {
        createPost(post);
    });
}