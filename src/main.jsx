import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {ToastContainer} from "react-toastify";
import store from "./global/store.jsx";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import 'react-toastify/dist/ReactToastify.css';

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <ToastContainer />
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </StrictMode>
);
