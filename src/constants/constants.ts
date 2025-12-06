export const prompts = {SHORT_NOTES: "shortNotes",DEEP_NOTES:"deepNotes",QUIZ:"quiz"}
export const styles = {
loaderSize : 5
}

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
export const ALLOWED_EXTENSIONS = ["pdf", "png", "jpg", "jpeg"];
// const ALLOWED_MIME_TYPES = [
//   "application/pdf",
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp"
// ];

export function validateFile(file: File) {
  const ALLOWED_MIME_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
  ];

  const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { valid: false, error: "Unsupported file type." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "File too large. Max allowed: 15MB." };
  }

  return { valid: true, error: null };
}

