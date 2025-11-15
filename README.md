# Assignment 3 – Fakebook  
**Student:** Daljit Kaur  

This project is my Assignment 3 submission. It is a simple Fakebook-style posting system that uses JavaScript classes, objects, inheritance, template literals, functions, conditional statements, and the Date object .

---

##  Project Overview  
This web page simulates a small version of a social network.  
Users can:

- Post text, images, or both  
- View their posts immediately on the screen  
- Open a modal pop-up showing their account information  
- View post headers containing:
  - Profile image
  - Full name
  - Current date



---

##  Features Implemented 

###  Header  
Contains 3 sections:
1. Fakebook logo  
2. Navigation links  
3. User profile picture  

---

###  Post Form  
Includes:
- Textarea (cannot post empty text + empty image)  
- Image upload button  
- Post button  

---

###  Post Output  
Each post stays on the screen and displays:

- User profile picture  
- User full name  
- Today's date  
- Posted text  
- 



---

###  User Class (Parent)  
Contains private properties:
- id  
- name  
- userName  
- email  

Includes:
- constructor  
- getters  
- `getInfo()` method  

---

###  Subscriber Class (Child)  
Extends **User** and adds:
- pages (array)  
- groups (array)  
- canMonetize (boolean)

Includes:
- constructor  
- getters  
- overridden `getInfo()` using template literals  

---

### ✔️ Modal Pop-Up  
Uses `getInfo()` from the Subscriber class to fill user details.

Opens when clicking **Account**.

---

### ✔️ Folder Structure (Clean as per class notes)

