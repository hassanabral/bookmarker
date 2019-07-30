// Save Bookmark
const saveBookmark = e => {
  // Get form values
  const siteName = document.getElementById('siteName').value;
  const siteUrl = document.getElementById('siteUrl').value;

  const newBookmark = {
    name: siteName,
    url: siteUrl
  };

  /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // Test if bookmarks is null
  if (localStorage.getItem('bookmarks') === null) {
    // Init array
    const bookmarks = [];
    // Add to array
    bookmarks.push(newBookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(newBookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();
  // Re-fetch bookmarks
  fetchBookmarks();
  // Prevent form from submitting
  e.preventDefault();
};

// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Delete bookmark
const removeBookmark = url => {
  // Get bookmarks from localStorage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Filter bookmarks array
  const updatedBookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  // Re-fetch bookmarks
  fetchBookmarks();
};

// Fetch bookmarks
const fetchBookmarks = () => {
  // Get bookmarks from localStorage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  const bookmarksResults = document.getElementById('bookmarksResults');
  // Build output
  bookmarksResults.innerHTML = '';
  bookmarks && bookmarks.forEach(bookmark => {
    const { name, url } = bookmark;
    bookmarksResults.innerHTML += `
      <div class="list-group-item p-4">
        <h4>${name}
          <a class="btn btn-outline-secondary ml-2" target="_blank" href="//${url}">Visit</a>
          <a onclick="removeBookmark(\'${url}\')" class="btn btn-outline-danger ml-2" href="#">Remove</a>
        </h4>
      </div>`;
  })
};
