import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UploadFileForm from "./pages/UploadNotes/UploadFileForm";
import Homepage from "./pages/Homepage";


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
            {path:'/home',element: <Homepage/>},
            {path:'/defaultTest',element: <GenericRoute routeName="Default"/>},
            {path:'/upload',element: <UploadFileForm/>}
            
        ]
    }
])