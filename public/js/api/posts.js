import { baseUrl, postsEndpoint } from "./constants.js";

export async function getPosts() {
    const posts = await fetch(baseUrl + postsEndpoint + "?_embed");
    const postsData = await posts.json();

    return postsData;
}

export async function getPostById(id) {
    const post = await fetch(baseUrl + postsEndpoint + `/${id}?_embed`);
    const postData = await post.json();

    return postData;
}

