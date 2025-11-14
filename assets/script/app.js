// ===========================================================
//                 ONE SINGLE FILE (index.js)
//       Contains: User Class + Subscriber Class + App Logic
// ===========================================================


// ==========================
//       USER CLASS
// ==========================

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
            username: this.#userName,
            email: this.#email
        };
    }
}


// ==========================
//     SUBSCRIBER CLASS
// ==========================

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
            monetization: this.#canMonetize
        };
    }
}



// ===========================================================
//                CREATE SUBSCRIBER (Assignment Requirement)
// ===========================================================

const myUser = new Subscriber(
    101,
    "Daljit Kaur",
    "daljit123",
    "daljit@example.com",
    ["Cooking Page", "Fitness Tips"],
    ["Web Dev Group", "Student Circle"],
    true
);


// ===========================================================
//                    DOM ELEMENTS
// ===========================================================

const form = document.getElementById("postForm");
const postContent = document.getElementById("postContent");
const postImage = document.getElementById("postImage");
const postsSection = document.querySelector(".posts");
const postTemplate = document.getElementById("post-template");

const openUserModal = document.getElementById("open-user-modal");
const modal = document.getElementById("user-modal");
const closeModal = modal.querySelector(".close");

// Modal fields
const infoId = document.getElementById("info-id");
const infoName = document.getElementById("info-name");
const infoUsername = document.getElementById("info-username");
const infoEmail = document.getElementById("info-email");
const infoPages = document.getElementById("info-pages");
const infoGroups = document.getElementById("info-groups");
const infoMonetize = document.getElementById("info-monetize");



// ===========================================================
//                 FORM SUBMISSION HANDLER
// ===========================================================

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = postContent.value.trim();
    const file = postImage.files[0];

    // REQUIRED: Cannot post empty message + no image
    if (!text && !file) {
        alert("Please write something or upload an image before posting.");
        return;
    }

    createPost(text, file);

    // reset form
    postContent.value = "";
    postImage.value = "";
});



// ===========================================================
//                     CREATE A POST
// ===========================================================

function createPost(text, file) {

    const clone = postTemplate.content.cloneNode(true);

    // Fill name + date
    clone.querySelector(".post-name").textContent = myUser.name;

    clone.querySelector(".post-date").textContent =
        new Date().toLocaleString("en-CA", {
            dateStyle: "medium",
            timeStyle: "short"
        });

    // Add text
    clone.querySelector(".post-text").textContent = text;

    // Add image if uploaded
    if (file) {
        const img = clone.querySelector(".post-image");
        img.src = URL.createObjectURL(file);
        img.style.display = "block";
    }

    postsSection.prepend(clone);
}



// ===========================================================
//                       USER MODAL
// ===========================================================

// OPEN
openUserModal.addEventListener("click", () => {
    const data = myUser.getInfo();

    infoId.textContent = `ID: ${data.id}`;
    infoName.textContent = `Name: ${data.name}`;
    infoUsername.textContent = `Username: ${data.username}`;
    infoEmail.textContent = `Email: ${data.email}`;
    infoPages.textContent = `Pages: ${data.pages.join(", ")}`;
    infoGroups.textContent = `Groups: ${data.groups.join(", ")}`;
    infoMonetize.textContent = `Monetization: ${data.monetization ? "Yes" : "No"}`;

    modal.style.display = "flex";
});

// CLOSE
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close when clicking outside modal
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});
