
import { createRoot } from 'react-dom/client'
import router from "./router/router.tsx";
import {RouterProvider} from "react-router-dom";
import {ToastProvider} from "./component/provider/ToastContext.tsx";
import {UserProvider} from "./component/provider/UserProvider.tsx";

createRoot(document.getElementById('root')!).render(
      <ToastProvider>
          <UserProvider>
            <RouterProvider router={router}></RouterProvider>
          </UserProvider>
      </ToastProvider>
)
