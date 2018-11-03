// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
   // Get form values
   let siteName = document.getElementById('siteName').value;
   let siteUrl = document.getElementById('siteUrl').value;

   let bookmark = {
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
      let bookmarks = [];
      // Add to array
      bookmarks.push(bookmark);
      // Set to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   } else {
      // Get bookmarks from localStorage
      let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      // Add bookmark to array
      bookmarks.push(bookmark);
      // Re-set back to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   }

   // Clear form
   document.getElementById('myForm').reset();

   // Re-fetch bookmarks
   fetchBookmarks();

   // Prevent form from submitting
   e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
   // Get bookmarks from localStorage
   let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   // Loop through bookmarks
   for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].url == url) {
         // Remove from array
         bookmarks.splice(i, 1);
      }
   }
   // Re-set back to localStorage
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

   // Re-fetch bookmarks
   fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
   // Get bookmarks from localStorage
   let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   // Get output id
   let bookmarksResults = document.getElementById('bookmarksResults');

   // Build output
   bookmarksResults.innerHTML = '';
   for (var i = 0; i < bookmarks.length; i++) {
      let name = bookmarks[i].name;
      let url = bookmarks[i].url;

      bookmarksResults.innerHTML += '<div class="list-group-item p-4">' +
         '<h4>' + name +
         ' <a class="btn btn-outline-secondary ml-2" target="_blank" href="' + url + '">Visit</a> ' +
         ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-outline-danger ml-2" href="#">Delete</a> ' +
         '</h4>' +
         '</div>';
   }
}
