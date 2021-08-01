const createPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
  
    if (title && content) {

      const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (res.ok) {
          console.log(res);
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
};

document
.getElementById('#create-post').addEventListener('submit', createPostHandler);