const apiUrl = 'https://book-crud-service-6dmqxfovfq-et.a.run.app/api/books';

async function fetchBooks() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer 486|CO1jlj37t0RzeqnbGhCSlXsMgdpKvG9aFsF8eTbE'
      },
    });

    console.log('Response Status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

module.exports = {
  fetchBooks,
};
