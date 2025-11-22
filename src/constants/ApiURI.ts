const API_BASE = import.meta.env.VITE_API_BASE
export const ApiURL = {
    GET_S3_SIGNED_URL:`${API_BASE}/userUpload`,
    GET_TEXTRACT_DATA :`${API_BASE}/processFile`,
    SAVE_USER:`${API_BASE}/user`

} as const