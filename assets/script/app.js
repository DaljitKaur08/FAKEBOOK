"use strict";

import Subscriber from "./Subscriber.js";

// Selectors
const postForm = document.getElementById("postForm");
const postContent = document.getElementById("postContent");
const postImage = document.getElementById("postImage");
const postsContainer = document.querySelector(".posts");

const modal = document.getElementById("user-modal");
const closeBtn = document.querySelector(".close");
const avatarBtn = document.getElementById("avatar-btn");


const fileNameText = document.createElement("p");
fileNameText.classList.add("file-detail");
postImage.parentElement.insertAdjacentElement("afterend", fileNameText);


const infoId = document.getElementById("info-id");
const infoName = document.getElementById("info-name");
const infoUsername = document.getElementById("info-username");
const infoEmail = document.getElementById("info-email");
const infoPages = document.getElementById("info-pages");
const infoGroups = document.getElementById("info-groups");
const infoMonetize = document.getElementById("info-monetize");


const subscriber = new Subscriber(
    192354,
    "Daljit Kaur",
    "djsaini26",
    "saini26daljit@gmail.com",
    ["10"],
    ["Women in Tech"],
    true
);


postImage.addEventListener("change", () => {
    if (postImage.files.length > 0) {
        fileNameText.textContent = postImage.files[0].name;
    } else {
        fileNameText.textContent = "";
    }
});


function openModal() {
    infoId.textContent = `ID: ${subscriber.id}`;
    infoName.textContent = `Name: ${subscriber.name}`;
    infoUsername.textContent = `Username: ${subscriber.userName}`;
    infoEmail.textContent = `Email: ${subscriber.email}`;
    infoPages.textContent = `Pages: ${subscriber.pages.join(", ")}`;
    infoGroups.textContent = `Groups: ${subscriber.groups.join(", ")}`;
    infoMonetize.textContent = `Can Monetize: ${subscriber.canMonetize ? "Yes" : "No"}`;

    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

avatarBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});


postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = postContent.value.trim();
    const file = postImage.files[0];

    if (!text && !file) return;

    const card = document.createElement("div");
    card.classList.add("post-card");

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    card.innerHTML = `
        <div class="post-header">
            <img src="./assets/images/profile.png" class="post-user-img">
            <div>
                <p class="post-name">${subscriber.name}</p>
                <p class="post-date">${dateStr}</p>
            </div>
        </div>
    `;

    if (text) {
        const p = document.createElement("p");
        p.classList.add("post-text");
        p.textContent = text;
        card.appendChild(p);
    }

    if (file) {
        const img = document.createElement("img");
        img.classList.add("post-image");
        img.src = URL.createObjectURL(file);
        card.appendChild(img);
    }

    postsContainer.prepend(card);

    // Clear inputs
    postContent.value = "";
    postImage.value = "";
    fileNameText.textContent = "";
});
