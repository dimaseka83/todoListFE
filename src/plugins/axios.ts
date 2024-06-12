import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

const _get = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(error);
    }
}

const _post = async (url: string, body: any) => {
    try {
        const { data } = await axios.post(url, body);
        return data;
    } catch (error) {
        console.error(error);
    }
}

const _delete = async (url: string) => {
    try {
        const { data } = await axios.delete(url);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export { _get, _post, _delete };

