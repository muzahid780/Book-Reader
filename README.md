PROJECT REPORT: BOOK READER WEB APPLICATION 
Prepaired By: 
Muzahidur Rahman 
ID: 11220120780 (6F) 
Dept: Computer Science & Engineering 
Northern University of  Business & Technology, Khulna. 
CONTENTS: 
1. Introduction 
2. Objectives  
3. Technologies Used 
4. System Design 
o 4.1 System Architecture (overall flow) 
o 4.2 Database Design (Conceptual Tables)  
5. Some screenshots 
6. HTML Key Sections 
7. CSS Styling Highlights 
8. JavaScript Functionalities 
9. Key Features 
10.  Scope 
11.  Future Improvements 
12.  Conclusion 
13.  References

    << Book Reader Web Application >> 
1.Introduction 
This application is a browser-based digital library enabling users to read,  manage, 
and download PDF books. The web app emphasizes responsive design, dynamic 
DOM interactions, and interactive UI for an engaging user experience. 
2. Project Objectives 
*Develop a Browser-Based Digital Library: 
Create a lightweight, web-based application that allows users to read, manage,    
and download PDF books without the need for backend servers. 
*Implement Interactive PDF Reader: 
Use PDF.js to render PDF files in the browser with features like page navigation, 
zoom, and error handling. 
*Enhance User Experience with DOM Manipulation: 
Apply JavaScript to dynamically update content such as book lists, cart items, user 
info, and bookshelf. 
*Ensure Responsive Design: 
Design layouts with CSS media queries so the application works smoothly on 
desktops, tablets, and smartphones. 
*Enable User Account Features: 
Provide login, registration, and personalized bookshelf functionality using 
LocalStorage for persistent data. 
*Integrate Cart & Wallet System: 
Allow users to add books to a cart and simulate a wallet balance system for 
controlled downloads. 
*Provide Admin Controls: 
Allow admin users to add or remove books dynamically, making the library easy 
to update. 
*Highlight Scalability & Future Scope: 
Build the project in a modular way so that future improvements (cloud storage, 
reviews, payments) can be integrated easily. 
3. Technologies Used 
VS Code:  For  compilation of code 
HTML5: Semantic elements for structure 
CSS3: Layout, banners, navigation, responsive style 
JavaScript: DOM manipulation, dynamic content,  
PDF rendering, user authentication   
PDF.js: PDF rendering in the browser 
LocalStorage: Persistent client-side data 
>> Reason for Use 
*These technologies allow fast 
*Client-side operations without the need for a backend server 
*Ideal for a lightweight academic project 
4. System Design 
System Design explains how different components of the Book Reader Project 
interact with each other. It ensures smooth functionality, scalability, and 
maintainability of the application. The system has been designed to be modular, 
interactive, and responsive for end-users. 
4.1 System Architecture (Overall Flow) 
The project follows a three-layer architecture for simplicity: 
1. Presentation Layer (Frontend) 
o Built with HTML, CSS, and JavaScript. 
o Provides user interface components such as banner, navigation, book 
reader, bookshelf, cart, and wallet. 
o Ensures responsive design for both desktop and mobile. 
2. Application Layer (Logic) 
o JavaScript controls dynamic behavior. 
o Handles DOM manipulation, PDF rendering (via PDF.js), cart 
operations, user authentication, and search/filter features. 
o LocalStorage acts as a lightweight storage layer to simulate backend 
functionality. 
3. Data Layer (Conceptual Database / LocalStorage) 
o Uses LocalStorage for client-side persistence (bookshelf, user info, 
cart items). 
o A conceptual relational database design has also been defined for 
possible backend expansion, including Users, Books, Cart, and Wallet 
tables. 
*System Flow (Step by Step): 
1. User logs in or registers (data stored in LocalStorage / Users Table). 
2. Homepage displays available books (Books Table). 
3. User can: 
o Read books → via PDF.js in the reader section. 
o Add books to bookshelf → stored in LocalStorage. 
o Add books to cart → items linked to Cart Table. 
o Check wallet balance → controlled via Wallet Table. 
4. Admin can add/remove books dynamically. 
5. Responsive design ensures smooth interaction across devices. 
4.2 Database Design (Conceptual Tables) 
Although the project runs without a backend, a conceptual database has been 
designed to demonstrate how it can be extended into a full-stack system. 
Users Table 
Field Name 
user_id 
Data Type 
INT (PK) 
Description 
Unique ID for each user 
username VARCHAR(50) Name of the user 
password VARCHAR(100) User password 
email 
VARCHAR(100) Email address 
bookshelf TEXT 
List of saved book IDs (JSON) 
Books Table 
Field Name 
book_id 
title 
author 
src 
category 
Cart Table 
Data Type 
INT (PK) 
Description 
Unique ID for each book 
VARCHAR(100) Title of the book 
VARCHAR(100) Author name 
VARCHAR(200) File path/URL of book PDF 
VARCHAR(50) Book genre/category 
Field Name Data Type 
cart_id 
user_id 
book_id 
price 
INT (PK) 
INT (FK) 
INT (FK) 
Description 
Unique cart item ID 
References the user 
References the book 
DECIMAL(6,2) Book price 
Wallet Table 
Field Name Data Type 
wallet_id INT (PK) 
user_id 
balance 
INT (FK) 
Description 
Unique wallet ID 
References the user 
DECIMAL(8,2) Walletbalance 
*The System Architecture ensures separation of concerns between frontend, logic, and data. 
*The Database Design ensures scalability and professional structure for future backend integration. 
*Together, these design elements make the Book Reader Project flexible, maintainable.

5. Some Screenshots:

 
 

                                                                Figure1: Homepage
Header & Navigation Bar:
Banner: “Welcome to the Enhanced Book Reader!” with a tagline: Discover, read, and manage your favorite books online.
Navbar links: Home, About, Contact, Read Book, My Bookshelf, Admin, Cart.
Search bar: Allows searching books.
User section: Shows Login and  Logout button.
Available Books Section:
Each book card has three buttons:
Read Now → Opens the book immediately.
Add to Cart → Puts the book in the shopping cart for purchase.
Add to Bookshelf → Saves the book in the user’s personal bookshelf.


                                    

                                                                        Figure2: Admin Panel
Manage Books:
*Add new books (title, author, cover image, PDF link).
*Edit existing books (update details).
*Delete books from the system.
               
                    
                                         Figure3: User Authentication


Registration (Sign Up):
*New users create an account with details like:
*Username / Email
*Password
*Password is usually encrypted before saving in the database for security.
Login:
*Existing users enter username/email + password.
*System checks:
If username exists.
If password matches the stored (encrypted) one.
If correct → grant access.
If wrong → show error.


 

                                                      Figure4: Read Book
.
How it Works:
*When a user clicks “Read Now” on a book:
*The system loads the book’s PDF file (stored in project folder or online).
*Opens it in a reader page or a popup window.
 

                                                           Figure5:  Bookshelf
How it Works:
*When a user clicks “Add to Bookshelf” on a book:
*The book is stored in their personal account (via database or LocalStorage).
*Later, they can go to My Personal  Bookshelf menu to see all saved books.

Features:
*Quick actions for each book:
Read Now → Open the book.
Remove → Delete from bookshelf.
Bookshelf is user-specific (each logged-in user has their own list).



    

                                                          Figure6: Add-to-Cart
How it Works:
*Users can add books they want to buy/download before checkout.
*When user clicks “Add to Cart” on a book;
*That book is stored in their cart (in database or LocalStorage).
*The Cart page shows a list of all added books.
*View book details (title, cover, price).
 *Remove  a book from cart.





6. HTML – Key Sections:

6.1 Banner

 
Highlights: Semantic <section>, heading <h1>, paragraph <p>.
6.2 Navigation 
 
JavaScript DOM interaction: showSection(id) toggles active class for sections. Responsive: Menu adjusts layout on mobile.
6.3 Admin Panel
 

Explanation: 
*Admin can add new books dynamically. 
*Uses form inputs with event handling in JavaScript.
6.4 Cart Section
 

Explanation:
*Shows the user’s selected books and wallet balance. 
*JavaScript dynamically updates the cart list and download count.
7. CSS – Key Styling Snippets:
7.1 Banner & Navigation
 
 
Highlights: Creates visually appealing layout and proper spacing.



7.2 Responsive Design
 
Highlights: Adjusts layout for tablets and mobile devices.
7.3 PDF viewer
 

 
Explanation:
Buttons: Styled with gradient colors, hover effect for interactivity.
PDF Controls: Flex layout aligns zoom and navigation buttons.
PDF Canvas: Displays PDF pages with border and responsive width.


8. JavaScript – Key Functionalities:
8.1 Initialization
 
8.2 DOM Manipulation
 
Explanation: Dynamically shows/hides sections on user click.
8.3 Section Navigation	
 
Explanation: Dynamically updates DOM to show the selected section
8.4 User Authentication & Cart
 
Explanation: Updates DOM elements for user info, cart items, and bookshelf dynamically.

8.5 Search & Filter (Responsive Interaction)
 
Dynamic DOM update: Filters books as user types
8.6 Add Book to Cart
 

Explanation:
*Adds a selected book to the cart array.
*Immediately updates the cart UI via renderCart().
9. Key Features
•	PDF reading with navigation, zoom, and error handling.
•	Dynamic DOM manipulation for book lists, cart, and bookshelf.
•	User authentication and personal bookshelf.
•	Admin panel for adding/removing books.
•	Responsive design for desktop and mobile.
10. Scope
•	Digital library solution for schools, colleges, small libraries.
•	Personalized collections and downloads.
•	Lightweight, browser-based system with LocalStorage.
11. Future Improvements
•	Cloud storage integration.
•	Advanced search by category/author.
•	Reviews and ratings.
•	Payment integration for premium content.
•	Offline PDF reading and annotations.
12. Conclusion
The project demonstrates a fully functional, interactive web-based library system with HTML, CSS, JavaScript, PDF.js, and LocalStorage.
 DOM manipulation and responsive design are key highlights. With future improvements, it can become a professional-grade e-library.
13. References
1.	MDN Web Docs – HTML, CSS, JavaScript. https://developer.mozilla.org/
2.	Mozilla PDF.js Documentation. https://mozilla.github.io/pdf.js/
3.	W3Schools – Responsive Web Design & DOM. https://www.w3schools.com/

