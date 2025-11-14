'use strict'
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
        const base = super.getInfo();
        return {
            ...base,
            pages: this.#pages,
            groups: this.#groups,
            canMonetize: this.#canMonetize
        };
    }
}
const currentUser = new Subscriber(
    101,
    "Daljit Kaur",
    "daljit_kaur",
    "saini26daljit@gmail.com",
    ["Food Lovers", "Winnipeg News"],
    ["MITT Students", "Developers Group"],
    true
);
const postForm = document.getElementById("postForm");
const postContent = document.getElementById("postContent");
const postImage = document.getElementById("postImage");
const postsSection = document.querySelector(".posts");
const template = document.getElementById("post-template");