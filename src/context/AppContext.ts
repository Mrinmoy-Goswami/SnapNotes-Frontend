// import { createFastContext } from "react-fast-context";

// interface NotesByFile {
//   [fileId: string]: {
//     summary?: string;
//     bullet?: string;
//     long?: string;
//   };
// }

// interface AppState {
//   theme: "light" | "dark";
//   userName: string;
//   notes: NotesByFile;
// }

// const initialState: AppState = {
//   theme: "light",
//   userName: "",
//   notes: {},
// };

// // Create the context with proper typing
// export const { Provider: AppProvider, useStore: useAppStore } = createFastContext(initialState);

// // Custom hooks for easier usage
// export const useAppState = () => useAppStore((state) => state);

// export const useTheme = () => useAppStore((state) => state.theme);

// export const useUserName = () => useAppStore((state) => state.userName);

// export const useNotes = () => useAppStore((state) => state.notes);

// export const useNotesByFileId = (fileId: string) => 
//   useAppStore((state) => state.notes[fileId]);

// // Action creators
// export const appActions = {
//   setTheme: (theme: "light" | "dark") => ({ theme }),
  
//   setUserName: (userName: string) => ({ userName }),
  
//   setNoteForFile: (fileId: string, noteType: "summary" | "bullet" | "long", content: string) => 
//     (state: AppState) => ({
//       notes: {
//         ...state.notes,
//         [fileId]: {
//           ...state.notes[fileId],
//           [noteType]: content,
//         },
//       },
//     }),
  
//   clearNotesForFile: (fileId: string) => (state: AppState) => {
//     const { [fileId]: _, ...remainingNotes } = state.notes;
//     return { notes: remainingNotes };
//   },
  
//   clearAllNotes: () => ({ notes: {} }),
// };