"use strict";

/* =========================================================
   USER CLASS (PARENT)
   ========================================================= */
class User {
    #id;
    #name;
    #userName;
    #email;

    constructor(id, name, userName, email) {
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get userName() { return this.#userName; }
    get email() { return this.#email; }

    getInfo() {
        return {
            id: this.#id,
            name: this.#name,
            userName: this.#userName,
            email: this.#email
        };
    }
}

/* =========================================================
   SUBSCRIBER CLASS (CHILD)
   Inherits User
   ========================================================= */
class Subscriber extends User {

    #pages;
    #groups;
    #canMonetize;

    constructor(id, name, userName, email, pages, groups, canMonetize) {
        super(id, name, userName, email);

        this.#pages = pages;
        this.#groups = groups;
        this.#canMonetize = canMonetize;
    }

    get pages() { return this.#pages; }
    get groups() { return this.#groups; }
    get canMonetize() { return this.#canMonetize; }

    getInfo() {
        return {
            ...super.getInfo(),
            pages: this.#pages,
            groups: this.#groups,
            canMonetize: this.#canMonetize
        };
    }
}

/* =========================================================
   CREATE ONE SUBSCRIBER OBJECT (MANUAL DATA)
   ========================================================= */
const currentUser = new Subscriber(
    101,
    "Daljit Kaur",
    "daljit_kaur",
    "daljit@example.com",
    ["TravelPage", "FoodiesClub"],
    ["WomenInTech", "Developers Group"],
    true
);

/* =========================================================
   DOM ELEMENTS
   ========================================================= */
const postForm = document.querySelector("#postForm");
const postContent = document.querySelector("#postContent");
const postImageInput = document.querySelector("#postImage");
const postsContainer = document.querySelector(".posts");
const template = document.querySelector("#post-template");

/* Modal */
const modal = document.querySelector("#user-modal");
const openModalBtn = document.querySelector("#open-user-modal");
const closeModalBtn = document.querySelector(".close");

/* =========================================================
   SHOW USER INFO IN MODAL
   ========================================================= */
openModalBtn.addEventListener("click", () => {
    const info = currentUser.getInfo();

    document.querySelector("#info-id").textContent = `ID: ${info.id}`;
    document.querySelector("#info-name").textContent = `Name: ${info.name}`;
    document.querySelector("#info-username").textContent = `Username: ${info.userName}`;
    document.querySelector("#info-email").textContent = `Email: ${info.email}`;
    document.querySelector("#info-pages").textContent = `Pages: ${info.pages.join(", ")}`;
    document.querySelector("#info-groups").textContent = `Groups: ${info.groups.join(", ")}`;
    document.querySelector("#info-monetize").textContent = `Can Monetize: ${info.canMonetize}`;

    modal.style.display = "flex";
});

/* Close Modal */
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

/* Clicking outside closes modal */
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

/* =========================================================
   POST SUBMISSION
   ========================================================= */
postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = postContent.value.trim();
    const imageFile = postImageInput.files[0];

    if (!text && !imageFile) {
        alert("Please write something or select an image!");
        return;
    }

    const clone = template.content.cloneNode(true);

    /* User information */
    clone.querySelector(".post-name").textContent = currentUser.name;

    /* Date */
    const date = new Date();
    clone.querySelector(".post-date").textContent =
        date.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

    /* Post text */
    clone.querySelector(".post-text").textContent = text;

    /* Image handling */
    if (imageFile) {
        const imgTag = clone.querySelector(".post-image");
        imgTag.style.display = "block";

        const reader = new FileReader();
        reader.onload = () => {
            imgTag.src = reader.result;
        };
        reader.readAsDataURL(imageFile);
    }

    /* Add the post */
    postsContainer.prepend(clone);

    /* Reset form */
    postContent.value = "";
    postImageInput.value = "";
});
