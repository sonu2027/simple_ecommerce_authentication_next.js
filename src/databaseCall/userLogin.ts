export async function userLogin(useremail, userpassword) {
    try {
        const response = await fetch('/api/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ useremail, userpassword }),
        });
        if (!response.ok) {
            throw new Error('Failed to login user');
        }
        const data = await response.json();
        console.log('User login:', data);
        return data
    } catch (error) {
        console.error('Error login user:', error);
    }
}