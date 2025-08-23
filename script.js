// script.js
// Set the path to the PDF.js worker
pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";

// Sample book data - will be loaded from localStorage if available
let books = JSON.parse(localStorage.getItem("books")) || [
  {
    id: 1,
    title: "Parents Guide",
    src: "books/book1.pdf",
    category: "education",
  },
  {
    id: 2,
    title: "Paradoxical 1",
    src: "books/book2.pdf",
    category: "education",
  },
  {
    id: 3,
    title: "Paradoxical 2",
    src: "books/book3.pdf",
    category: "education",
  },
  {
    id: 4,
    title: "Four Forgiveness",
    src: "books/book4.pdf",
    category: "education",
  },
  {
    id: 5,
    title: "The Divine Reality",
    src: "books/book5.pdf",
    category: "education",
  },
];

// User accounts and data
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let walletBalance = JSON.parse(localStorage.getItem("walletBalance")) || 5;

// PDF viewer state
let currentPDF = {
  doc: null,
  page: 1,
  scale: 1.2,
  numPages: 0,
  currentBook: null,
};

// Initialize application
document.addEventListener("DOMContentLoaded", function () {
  initApp();
  setupPDFControls();
});

function initApp() {
  // Check if user is logged in
  if (currentUser) {
    updateUserUI();
    // Load user-specific data
    cart =
      JSON.parse(localStorage.getItem(`cart_${currentUser.username}`)) || [];
    walletBalance =
      JSON.parse(localStorage.getItem(`wallet_${currentUser.username}`)) || 5;
  }

  renderBookList();
  renderCart();
  showSection("home");
}

function updateUserUI() {
  if (currentUser) {
    document.getElementById(
      "user-info"
    ).textContent = `Welcome, ${currentUser.username}`;
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "inline-block";
  } else {
    document.getElementById("user-info").textContent = "";
    document.getElementById("login-btn").style.display = "inline-block";
    document.getElementById("logout-btn").style.display = "none";
  }
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem("books", JSON.stringify(books));
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("walletBalance", JSON.stringify(walletBalance));

  // Store user-specific data
  if (currentUser) {
    localStorage.setItem(`cart_${currentUser.username}`, JSON.stringify(cart));
    localStorage.setItem(
      `wallet_${currentUser.username}`,
      JSON.stringify(walletBalance)
    );
    localStorage.setItem(
      `bookshelf_${currentUser.username}`,
      JSON.stringify(currentUser.bookshelf || [])
    );
  }
}

function showSection(id) {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  if (id === "admin") renderAdminBookList();
  if (id === "cart") renderCart();
  if (id === "bookshelf") renderBookshelf();
}

function switchAuthTab(tab) {
  if (tab === "login") {
    document.getElementById("login").classList.add("active");
    document.getElementById("register").classList.remove("active");
  } else {
    document.getElementById("register").classList.add("active");
    document.getElementById("login").classList.remove("active");
  }
}

function renderBookList(filter = "") {
  const list = document.getElementById("book-list");
  list.innerHTML = "";

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredBooks.length === 0) {
    list.innerHTML = "<li>No books found.</li>";
    return;
  }

  filteredBooks.forEach((book) => {
    const li = document.createElement("li");

    const titleSpan = document.createElement("span");
    titleSpan.textContent = book.title;
    titleSpan.style.fontWeight = "bold";
    titleSpan.style.marginBottom = "10px";

    const readBtn = document.createElement("button");
    readBtn.textContent = "Read Now";
    readBtn.onclick = () => loadBook(book.id);

    const cartBtn = document.createElement("button");
    cartBtn.textContent = "📥 Add to Cart";
    cartBtn.classList.add("add-to-cart");
    cartBtn.onclick = () => addToCart(book);

    const shelfBtn = document.createElement("button");
    shelfBtn.textContent = "📚 Add to Bookshelf";
    shelfBtn.classList.add("add-to-bookshelf");
    shelfBtn.onclick = () => addToBookshelf(book);

    li.appendChild(titleSpan);
    li.appendChild(readBtn);
    li.appendChild(cartBtn);

    if (currentUser) {
      li.appendChild(shelfBtn);
    }

    list.appendChild(li);
  });
}

function addToBookshelf(book) {
  if (!currentUser) {
    alert("Please log in to use the bookshelf feature.");
    showSection("login");
    return;
  }

  if (!currentUser.bookshelf) {
    currentUser.bookshelf = [];
  }

  if (!currentUser.bookshelf.find((b) => b.id === book.id)) {
    currentUser.bookshelf.push(book);
    updateLocalStorage();
    alert(`"${book.title}" added to your bookshelf.`);
  } else {
    alert("Book is already in your bookshelf.");
  }
}

function renderBookshelf() {
  const list = document.getElementById("bookshelf-list");
  list.innerHTML = "";

  if (
    !currentUser ||
    !currentUser.bookshelf ||
    currentUser.bookshelf.length === 0
  ) {
    list.innerHTML = "<li>Your bookshelf is empty.</li>";
    return;
  }

  currentUser.bookshelf.forEach((book) => {
    const li = document.createElement("li");

    const titleSpan = document.createElement("span");
    titleSpan.textContent = book.title;
    titleSpan.style.fontWeight = "bold";
    titleSpan.style.marginBottom = "10px";

    const readBtn = document.createElement("button");
    readBtn.textContent = "Read Now";
    readBtn.onclick = () => loadBook(book.id);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove from Bookshelf";
    removeBtn.onclick = () => removeFromBookshelf(book.id);

    li.appendChild(titleSpan);
    li.appendChild(readBtn);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

function removeFromBookshelf(bookId) {
  currentUser.bookshelf = currentUser.bookshelf.filter(
    (book) => book.id !== bookId
  );
  updateLocalStorage();
  renderBookshelf();
}

function loadBook(bookId) {
  showSection("reader");

  const book = books.find((b) => b.id === bookId);
  const titleEl = document.getElementById("book-title");

  if (book) {
    titleEl.textContent = book.title;
    loadPDF(book);
  } else {
    titleEl.textContent = "Book Not Found";
    showPDFError();
  }
}

function loadPDF(book) {
  // Show loading indicator
  document.getElementById("pdf-loading").style.display = "flex";
  document.getElementById("pdf-error").style.display = "none";
  document.getElementById("pdf-canvas").style.display = "none";

  // Reset PDF state
  currentPDF = {
    doc: null,
    page: 1,
    scale: 1.2,
    numPages: 0,
    currentBook: book,
  };

  // Load PDF using PDF.js
  const loadingTask = pdfjsLib.getDocument(book.src);

  loadingTask.promise
    .then(function (pdf) {
      currentPDF.doc = pdf;
      currentPDF.numPages = pdf.numPages;

      // Hide loading indicator
      document.getElementById("pdf-loading").style.display = "none";
      document.getElementById("pdf-canvas").style.display = "block";

      renderPage();
      updatePageInfo();
    })
    .catch(function (error) {
      console.error("Error loading PDF:", error);
      showPDFError();
    });
}

function renderPage() {
  if (!currentPDF.doc) return;

  currentPDF.doc.getPage(currentPDF.page).then(function (page) {
    const canvas = document.getElementById("pdf-canvas");
    const ctx = canvas.getContext("2d");

    const viewport = page.getViewport({ scale: currentPDF.scale });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };

    page.render(renderContext);
  });
}

function setupPDFControls() {
  document.getElementById("prev-page").addEventListener("click", function () {
    if (currentPDF.page > 1) {
      currentPDF.page--;
      renderPage();
      updatePageInfo();
    }
  });

  document.getElementById("next-page").addEventListener("click", function () {
    if (currentPDF.page < currentPDF.numPages) {
      currentPDF.page++;
      renderPage();
      updatePageInfo();
    }
  });

  document.getElementById("zoom-in").addEventListener("click", function () {
    currentPDF.scale += 0.2;
    renderPage();
  });

  document.getElementById("zoom-out").addEventListener("click", function () {
    if (currentPDF.scale > 0.5) {
      currentPDF.scale -= 0.2;
      renderPage();
    }
  });

  document.getElementById("fit-width").addEventListener("click", function () {
    // This would need the container width to calculate proper scale
    // For now, just reset to default
    currentPDF.scale = 1.2;
    renderPage();
  });
}

function updatePageInfo() {
  document.getElementById("current-page").textContent = currentPDF.page;
  document.getElementById("total-pages").textContent = currentPDF.numPages;
}

function showPDFError() {
  document.getElementById("pdf-loading").style.display = "none";
  document.getElementById("pdf-canvas").style.display = "none";
  document.getElementById("pdf-error").style.display = "block";
}

function retryLoadingPDF() {
  if (currentPDF.currentBook) {
    loadPDF(currentPDF.currentBook);
  }
}

function filterBooks() {
  const input = document.getElementById("search-input");
  renderBookList(input.value);
}

function renderAdminBookList() {
  const list = document.getElementById("admin-book-list");
  list.innerHTML = "";

  books.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = book.title;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌ Remove";
    removeBtn.onclick = () => removeBook(book.id);

    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

function removeBook(bookId) {
  const index = books.findIndex((b) => b.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    updateLocalStorage();
    renderBookList();
    renderAdminBookList();
  }
}

document
  .getElementById("add-book-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("new-title").value;
    const src = document.getElementById("new-src").value;
    const newBook = {
      id: Date.now(),
      title,
      src,
    };
    books.push(newBook);
    updateLocalStorage();
    renderBookList();
    renderAdminBookList();
    this.reset();
  });

function addToCart(book) {
  if (!cart.find((b) => b.id === book.id)) {
    cart.push(book);
    updateLocalStorage();
    alert(`"${book.title}" added to cart.`);
    renderCart();
  } else {
    alert("Book is already in cart.");
  }
}

function renderCart() {
  const list = document.getElementById("cart-list");
  const balanceDisplay = document.getElementById("wallet-balance");
  list.innerHTML = "";

  balanceDisplay.textContent = walletBalance;

  if (cart.length === 0) {
    list.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  cart.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = book.title;

    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "⬇️ Download";
    downloadBtn.onclick = () => downloadBook(book);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove from Cart";
    removeBtn.onclick = () => removeFromCart(book.id);

    li.appendChild(downloadBtn);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

function removeFromCart(bookId) {
  cart = cart.filter((book) => book.id !== bookId);
  updateLocalStorage();
  renderCart();
}

function downloadBook(book) {
  if (walletBalance <= 0) {
    alert("Insufficient wallet balance to download.");
    return;
  }

  walletBalance--;
  updateLocalStorage();
  document.getElementById("wallet-balance").textContent = walletBalance;

  const link = document.createElement("a");
  link.href = book.src;
  link.download = book.title + ".pdf";
  link.click();
}

// User authentication
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const status = document.getElementById("login-status");

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    currentUser = user;
    // Load user-specific data
    cart =
      JSON.parse(localStorage.getItem(`cart_${currentUser.username}`)) || [];
    walletBalance =
      JSON.parse(localStorage.getItem(`wallet_${currentUser.username}`)) || 5;

    status.style.color = "green";
    status.textContent = "Login Successful!";
    updateUserUI();
    setTimeout(() => showSection("home"), 1000);
  } else {
    status.style.color = "red";
    status.textContent = "Invalid username or password!";
  }
});

document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("new-username").value.trim();
    const password = document.getElementById("new-password").value.trim();
    const email = document.getElementById("email").value.trim();
    const status = document.getElementById("register-status");

    if (users.find((u) => u.username === username)) {
      status.style.color = "red";
      status.textContent = "Username already exists!";
      return;
    }

    const newUser = {
      username,
      password,
      email,
      bookshelf: [],
    };

    users.push(newUser);
    currentUser = newUser;
    updateLocalStorage();
    updateUserUI();

    status.style.color = "green";
    status.textContent = "Account created successfully!";

    setTimeout(() => showSection("home"), 1000);
  });

function logout() {
  currentUser = null;
  cart = [];
  walletBalance = 5;
  updateUserUI();
  showSection("home");
}
