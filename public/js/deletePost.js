const deletePostHandler = async (event) => {
    event.preventDefault();
    
    const id = parseInt(document.location.href.split("/").pop());

    const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
        document.location.replace('/dashboard');
        //window.href

    } else {
        alert(res.statusText);
    }
};

    document.querySelector('.delete-post').addEventListener('submit', deletePostHandler);