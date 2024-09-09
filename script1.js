let booklist = [] // Stores the fetched book data
let currentPage = 1 // Tracks the current page in pagination
let itemsPerPage = 5 // Number of items per page

// References to DOM elements for fetching, displaying books, search, sorting, and pagination
const fetchbookss = document.querySelector('#fetchbooks')
let mainContainer = document.querySelector('#books-container')
let paginationcontainer = document.querySelector('#pagination-container')
let searchingInput = document.querySelector('#search')
let sortingItem = document.querySelector('#sorting')

/**
 * Fetches books from the NYT API when the 'fetch books' button is clicked.
 * It updates the `booklist` with the results and displays them using the `displayBooks` function.
 */
fetchbookss.addEventListener('click', async () => {
    await fetch('https://api.nytimes.com/svc/books/v3/lists/2019-01-20/hardcover-fiction.json?api-key=dRtGPG2ZtDJAXGCAUZGAXA1bU6zXVZjA')
        .then((response) => response.json()) // Convert response to JSON
        .then((data) => booklist = data.results.books) // Store the fetched book data in booklist
        .catch((error) => console.error(error)) // Log any errors
    displayBooks() // Display the fetched books
})

/**
 * Displays books in the DOM based on the current page, search input, and sorting option.
 * It filters the books by the search query, sorts them, paginates the result,
 * and renders the filtered books in the mainContainer.
 */
function displayBooks() {
    mainContainer.innerHTML = "" // Clear the book container

    // Filter books by search input
    let filteredBooks = booklist.filter(book => book.title.toLowerCase().includes(searchingInput.value.toLowerCase()))

    // Sort books based on the selected sorting option (asc or desc)
    if (sortingItem.value == 'asc') {
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title)) // Sort alphabetically (ascending)
    } else {
        filteredBooks.sort((a, b) => b.title.localeCompare(a.title)) // Sort alphabetically (descending)
    }

    // Paginate the books based on the current page
    let paginatedBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, (currentPage * itemsPerPage))

    // Loop through paginated books and create elements for each book
    for (let i = 0; i < paginatedBooks.length; i++) {
        let container = document.createElement('div')
        container.classList.add('book') // Add the .book class

        let bookimg = document.createElement('img')
        bookimg.src = paginatedBooks[i].book_image // Set the book image
        bookimg.height = 100
        bookimg.width = 100

        let title = document.createElement('div')
        title.textContent = paginatedBooks[i].title // Set the book title

        let description = document.createElement('div')
        description.textContent = paginatedBooks[i].description // Set the book description

        // Append image, title, and description to the container
        container.appendChild(bookimg)
        container.appendChild(title)
        container.appendChild(description)
        mainContainer.appendChild(container) // Append the container to the main container
    }

    displayPagination(filteredBooks.length) // Update pagination controls
}

/**
 * Event listener for the search input.
 * Resets the current page to 1 and updates the displayed books whenever the search query changes.
 */
searchingInput.addEventListener('input', () => {
    currentPage = 1 // Reset to the first page on search
    displayBooks() // Update displayed books
})

/**
 * Event listener for the sorting dropdown.
 * Updates the displayed books when the sorting option changes.
 */
sortingItem.addEventListener('change', () => {
    displayBooks() // Update displayed books based on sorting option
})

/**
 * Creates pagination buttons and updates the displayed books based on the current page.
 * It calculates the total number of pages based on the total items and items per page,
 * and adds event listeners to the pagination buttons to change pages when clicked.
 * 
 * @param {number} totalItems - The total number of books (after filtering by search).
 */
function displayPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage) // Calculate total pages
    paginationcontainer.innerHTML = "" // Clear the pagination container

    // Create pagination buttons for each page
    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button')
        pageButton.textContent = i // Set the page number

        // Event listener for page button clicks
        pageButton.addEventListener('click', () => {
            currentPage = i // Set the current page
            displayBooks() // Display books for the selected page
        })

        paginationcontainer.appendChild(pageButton) // Add the button to the pagination container
    }
}

/**
 * Event listener for the navigation toggle button.
 * Toggles the visibility of the navigation links when the button is clicked.
 */
const navToggle = document.querySelector('.nav-toggle')
const navLinks = document.querySelector('.nav-links')

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active') // Toggle the active class on the toggle button
    navLinks.classList.toggle('active') // Toggle the active class on the nav links
})
