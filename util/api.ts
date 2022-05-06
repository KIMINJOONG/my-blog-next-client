import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const axiosConfigSetting = () => {
    axios.defaults.baseURL =
        // "http://localhost:4000/";
        "https://api.kohubi.xyz/";

    axios.interceptors.request.use(
        async (config: AxiosRequestConfig<any>) => {
            try {
                const token = Cookies.get("token");

                if (token) {
                    config.headers!["Authorization"] = token;
                }
            } catch (e) {
                // saving error
            }
            config.headers!["Content-Type"] = "application/json";

            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error: any) => {
            const {
                config,
                response: { status },
            } = error;
            if (status === 403) {
            }
            return Promise.reject(error);
        }
    );
};
