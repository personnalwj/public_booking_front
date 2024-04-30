import api from "@/app/utils/axios";


export async function fetchUserCongregations() {
    try {
        const response = await api.get(`/users/congregations`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user congregations:', error);
        throw error;
    }
}