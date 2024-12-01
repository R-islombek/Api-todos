const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
const postList = document.getElementById('post-list');

// Postlarni olish
async function getPosts() {
  try {
    const response = await fetch(apiUrl);
    const posts = await response.json();
    postList.innerHTML = ''; // Postlar ro'yxatini tozalash
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.innerHTML = `
        <h4>${post.title}</h4>
        <p>${post.body}</p>
        <button onclick="deletePost(${post.id})">O'chirish</button>
        <button onclick="editPost(${post.id})">Tahrirlash</button>
      `;
      postList.appendChild(postElement);
    });
  } catch (error) {
    console.log('Postlarni olishda xato:', error);
  }
}

// Yangi post qo'shish
document.getElementById('post-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, userId: 1 }),
    });
    const newPost = await response.json();
    console.log('Yangi post yaratildi:', newPost);
    getPosts(); // Postlarni qayta yuklash
  } catch (error) {
    console.log('Yangi postni qo\'shishda xato:', error);
  }
});

// Postni o'chirish
async function deletePost(postId) {
  try {
    await fetch(`${apiUrl}/${postId}`, {
      method: 'DELETE',
    });
    console.log('Post o\'chirildi');
    getPosts(); // Postlarni qayta yuklash
  } catch (error) {
    console.log('Postni o\'chirishda xato:', error);
  }
}

// Postni tahrirlash
async function editPost(postId) {
  const title = prompt('Yangilangan sarlavhani kiriting:');
  const body = prompt('Yangilangan matnni kiriting:');

  try {
    await fetch(`${apiUrl}/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, userId: 1 }),
    });
    console.log('Post yangilandi');
    getPosts(); // Postlarni qayta yuklash
  } catch (error) {
    console.log('Postni yangilashda xato:', error);
  }
}

// Sayt yuklanganda postlarni olish
window.onload = getPosts;
