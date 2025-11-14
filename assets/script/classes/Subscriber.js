"use strict";
@import "./reset.css";
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
        const baseInfo = super.getInfo();

        return `${baseInfo}
Pages: ${this.#pages.join(", ")}
Groups: ${this.#groups.join(", ")}
Monetization: ${this.#canMonetize}`;
    }
}

export default Subscriber;
