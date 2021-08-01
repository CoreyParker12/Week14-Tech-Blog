const updatePostHandler = async (event) => {
    event.preventDefault();


    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const post_id = parseInt(document.location.href.split("/").pop());

  
    if (title && content) {

      const res = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (res.ok) {
          console.log(res);
          document.location.replace(`/posts/${post_id}`)
      } else {
        alert('BAD');
      }
    }
    //document.location.reload();
};

document
.querySelector('.update-post').addEventListener('submit', updatePostHandler);