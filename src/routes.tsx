import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UploadFileForm from "./pages/UploadNotes/UploadFileForm";
import LandingPage from "./pages/Landing Page/LandingPage";
import ComingSoon from "./pages/ComingSoon";


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
            {path:"/",element:<LandingPage/>},
            {path:'/defaultTest',element: <GenericRoute routeName="Default"/>},
            {path:'/upload',element: <UploadFileForm/>},
            {path:'/notes/saved',element: <ComingSoon featureName="Saved Notes"/>},
            {path:'/notes/history',element: <ComingSoon featureName="Upload History"/>}
        ]
    }
])