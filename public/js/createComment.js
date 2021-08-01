const createCommentHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment').value.trim();
    const post_id = parseInt(document.location.href.split("/").pop());
  
    if (comment) {

      const res = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (res.ok) {
          console.log(res);
        //document.location.replace('/dashboard');
      } else {
        alert(res.statusText);
      }
    }
    document.location.reload();
};

document
.querySelector('.create-comment').addEventListener('submit', createCommentHandler);