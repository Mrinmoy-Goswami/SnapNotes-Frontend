import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UploadFileForm from "./pages/UploadNotes/UploadFileForm";


// eslint-disable-next-line react-refresh/only-export-components
const GenericRoute = ({routeName}:{routeName:string})=>{
    return (
        <div className="w-screen flex justify-center">
            <h3>{routeName}</h3>
        </div>
    )
}
export const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {path:'/defaultTest',element: <GenericRoute routeName="Default"/>},
            {path:'/upload',element: <UploadFileForm/>}
        ]
    }
])