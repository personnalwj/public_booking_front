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

export async function fetchSpots() {
    try {
        const response = await api.get(`/congregation/spots`);
        return response.data;
    } catch (error) {
        console.error('Error fetching spots:', error);
        throw error;
    }
}

export async function fetchTimeSlots() {
    try {
        const response = await api.get(`/time-slots`);
        return response.data;
    } catch (error) {
        console.error('Error fetching time slots:', error);
        throw error;
    }
}