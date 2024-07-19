export async function createMarkProduct(userId, productId) {
    try {
        const response = await fetch('/api/markProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, productId }),
        });
        if (!response.ok) {
            throw new Error('Failed to marked product for user');
        }
        const data = await response.json();
        return data
    } catch (error) {
        throw error
    }
}