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

// Modal info elements
const infoId = document.getElementById("info-id");
const infoName = document.getElementById("info-name");
const infoUsername = document.getElementById("info-username");
const infoEmail = document.getElementById("info-email");
const infoPages = document.getElementById("info-pages");
const infoGroups = document.getElementById("info-groups");
const infoMonetize = document.getElementById("info-monetize");

// Create Subscriber
const subscriber = new Subscriber(
    1001,
    "Daljit Kaur",
    "daljit_kaur",
    "daljit@gmail.com",
    ["Cooking", "Tech News"],
    ["Web Dev Group", "MITT Coding"],
    true
);

// --------------------------
// SHOW USER MODAL
// --------------------------
function openModal() {
    const data = subscriber.getInfo();

    infoId.textContent = `ID: ${data.id}`;
    infoName.textContent = `Name: ${data.name}`;
    infoUsername.textContent = `Username: ${data.userName}`;
    infoEmail.textContent = `Email: ${data.email}`;
    infoPages.textContent = `Pages: ${data.pages.join(", ")}`;
    infoGroups.textContent = `Groups: ${data.groups.join(", ")}`;
    infoMonetize.textContent = `Can Monetize: ${data.canMonetize ? "Yes" : "No"}`;

    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

// Event Listeners
avatarBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

// --------------------------
// CREATE POST
// --------------------------
postForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const text = postContent.value.trim();
    const file = postImage.files[0];

    // prevent empty posts
    if (!text && !file) return;

    const card = document.createElement("div");
    card.classList.add("post-card");

    // Date formatting
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    // post header
    card.innerHTML = `
        <div class="post-header">
            <img src="./assets/images/profile.png" class="post-user-img">
            <div>
                <p class="post-name">${subscriber.name}</p>
                <p class="post-date">${dateStr}</p>
            </div>
        </div>
    `;

    // Text
    if (text) {
        const textP = document.createElement("p");
        textP.classList.add("post-text");
        textP.textContent = text;
        card.appendChild(textP);
    }

    // Image
    if (file) {
        const img = document.createElement("img");
        img.classList.add("post-image");
        img.src = URL.createObjectURL(file);
        card.appendChild(img);
    }

    postsContainer.prepend(card);

    postContent.value = "";
    postImage.value = "";
});
