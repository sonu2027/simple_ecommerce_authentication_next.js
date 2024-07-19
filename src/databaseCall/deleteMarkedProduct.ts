export const deleteMarkedProduct = async (userId, productId) => {
    try {
        const response = await fetch("/api/deleteMarkedProducts", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, productId })
        })

        if (!response.ok) {
            throw new Error('Failed to delete marked product');
        }
        const data = await response.json();
        return data
    } catch (error) {
        throw error
    }
}