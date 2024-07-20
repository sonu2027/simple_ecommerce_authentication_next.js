interface products {
    id: number;
    name: string;
    createdAt: string;
}

export const getProducts = async (): Promise<products[]> => {
    try {
        const response = await fetch("/api/getAllProducts", { method: 'GET' })
        if (!response.ok) {
            throw new Error('Failed to verify user');
        }
        const data = await response.json() as products[];
        return data
    } catch (error) {
        throw error
    }
}