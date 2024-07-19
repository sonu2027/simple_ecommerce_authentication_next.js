export const getProducts = async () => {
    try {
        const response = await fetch("/api/getAllProducts", { method: 'GET' })
        if (!response.ok) {
            throw new Error('Failed to verify user');
        }
        const data = await response.json();
        return data
    } catch (error) {
        throw error
    }
}