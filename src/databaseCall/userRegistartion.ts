export async function userRegistartion(username, useremail, userpassword) {
    try {
        const response = await fetch('/api/registerUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, useremail, userpassword }),
        });
        if (!response.ok) {
            throw new Error('Failed to create post');
        }
        const data = await response.json();
        console.log('Post created:', data);
    } catch (error) {
        console.error('Error creating post:', error);
    }
}