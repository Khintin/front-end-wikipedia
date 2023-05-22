export function createAlert(type, message, parent, doClear) {
    let className = "block border rounded-sm shadow-md p-6 font-bold";

    if (type == "error") {
        className += " bg-red-100 border-red-600 text-red-600"
    }
    else if (type == "success") {
        className += " bg-green-100 border-green-600 text-green-600"
    }

    if (doClear) {
        parent.innerHTML = "";
    }

    const wrapper = document.createElement("div");
    wrapper.className = className;
    wrapper.innerHTML = `<p>${message}</p>`;

    parent.prepend(wrapper);
}