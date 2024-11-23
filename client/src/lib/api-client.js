import axios from "axios";
import { HOST } from "@/utils/constants";

// All library functions.
export const apiClient = axios.create({
    baseURL: HOST,
});
