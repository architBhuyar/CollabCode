import './App.css';
import {browserRouter,Routes,Route, BrowserRouter} from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import Home from "./pages/Home";
import EditorPages from "./pages/EditorPage";

function App() {
  return (
    <>
      <div>
        <Toaster
          position = "top-right"
          toastOptions={{
              success:{
                theme:{
                    primary:rgb(155, 10, 239),
                },
              },
          }}>
        </Toaster>
      </div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/editor/:roomId" element={<EditorPages/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
