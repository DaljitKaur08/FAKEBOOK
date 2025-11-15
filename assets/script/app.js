"use strict";

import Subscriber from "./Subscriber.js";

/* Helper Functions */
function select(selector) {
    return document.querySelector(selector);
}

function listen(eventType, element, handler) {
    element.addEventListener(eventType, handler);
}

/*  DOM Elements */
const postForm = select("#postForm");
const postContent = select("#postContent");
const postImage = select("#postImage");
const posts = select(".posts");

const avatarBtn = select("#avatar-btn");
const modal = select("#user-modal");
const closeBtn = select(".close");

/* Show file name text */
const fileText = document.createElement("p");
fileText.classList.add("file-detail");
postImage.insertAdjacentElement("afterend", fileText);

/*  Modal Output Fields */
const infoId = select("#info-id");
const infoName = select("#info-name");
const infoUsername = select("#info-username");
const infoEmail = select("#info-email");
const infoPages = select("#info-pages");
const infoGroups = select("#info-groups");
const infoMonetize = select("#info-monetize");

/*  Subscriber Object  */
const user = new Subscriber(
    192354,
    "Daljit Kaur",
    "djsaini26",
    "saini26daljit@gmail.com",
    ["10"],
    ["Women in Tech"],
    true
);

/*  Functions  */

/* Show uploaded file name */
function showFileName() {
    if (postImage.files.length > 0) {
        fileText.textContent = postImage.files[0].name;
    } else {
        fileText.textContent = "";
    }
}

/* Fill modal with subscriber info */
function fillModal() {
    infoId.textContent = "ID: " + user.id;
    infoName.textContent = "Name: " + user.name;
    infoUsername.textContent = "Username: " + user.userName;
    infoEmail.textContent = "Email: " + user.email;
    infoPages.textContent = "Pages: " + user.pages.join(", ");
    infoGroups.textContent = "Groups: " + user.groups.join(", ");
    infoMonetize.textContent = "Can Monetize: " + (user.canMonetize ? "Yes" : "No");
}

/* Open modal */
function openModal() {
    fillModal();
    modal.style.display = "flex";
}

/* Close modal */
function closeModal() {
    modal.style.display = "none";
}

/* Clear input fields */
function clearInputs() {
    postContent.value = "";
    postImage.value = "";
    fileText.textContent = "";
}

/* Create new post */
function createPost() {
    const text = postContent.value.trim();
    const file = postImage.files[0];

    if (!text && !file) {
        return;
    }

    const card = document.createElement("div");
    card.classList.add("post-card");

    const today = new Date().toLocaleDateString("en-CA", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    card.innerHTML = `
        <div class="post-header">
            <img src="./assets/images/profile.png" class="post-user-img">
            <div>
                <p class="post-name">${user.name}</p>
                <p class="post-date">${today}</p>
            </div>
        </div>
    `;

    if (text) {
        const textBox = document.createElement("p");
        textBox.classList.add("post-text");
        textBox.textContent = text;
        card.appendChild(textBox);
    }

    if (file) {
        const imgBox = document.createElement("img");
        imgBox.classList.add("post-image");
        imgBox.src = URL.createObjectURL(file);
        card.appendChild(imgBox);
    }

    posts.prepend(card);
    clearInputs();
}

/* Event Listeners */
listen("change", postImage, showFileName);
listen("click", avatarBtn, openModal);
listen("click", closeBtn, closeModal);

listen("click", window, function (clicked) {
    if (clicked.target === modal) {
        closeModal();
    }
});

listen("submit", postForm, function (formEvent) {
    formEvent.preventDefault();
    createPost();
});
