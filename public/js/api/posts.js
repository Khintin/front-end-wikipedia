import { getAuth } from "./auth.js";
import { baseUrl, postsEndpoint } from "./constants.js";

export async function getPosts() {
    const posts = await fetch(baseUrl + postsEndpoint + "?_embed");
    const postsData = await posts.json();

    return postsData;
}

export async function getPostById(id) {
    const post = await fetch(baseUrl + postsEndpoint + `/${id}?_embed`);

    if (post.ok) {
        const postData = await post.json();
        console.log(postData);
        return postData;
    }

    return null;
}

export async function deletePostById(id) {
    const auth = getAuth();

    if (!auth)
        return;

    const response = await fetch(baseUrl + postsEndpoint + `/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.token}`
        }
    });

    if (response && response.ok) {
        return true;
    }
    else {
        return false;
    }
}

export async function editPostById(id, postTitle, postBody) {
    const auth = getAuth();

    if (!auth)
        return false;

    const response = await fetch(baseUrl + postsEndpoint + `/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.token}`
        },
        body: JSON.stringify({
            title: postTitle,
            content: postBody
        })
    });

    if (response && response.ok) {
        return true;
    }
    else {
        return false;
    }
}

export async function createPost(postTitle, postBody) {
    const auth = getAuth();

    if (!auth)
        return false;

    const response = await fetch(baseUrl + postsEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.token}`
        },
        body: JSON.stringify({
            title: postTitle,
            content: postBody,
            status: "publish"
        })
    });

    if (response && response.ok) {
        const json = await response.json();
        return { success: true, id: json.id };
    }
    else {
        return { success: false };
    }
}