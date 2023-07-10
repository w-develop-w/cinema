import { Route, Routes } from "react-router-dom"
import Main from "./components/Main/Main"
import Film from "./components/Film/Film"
import Places from "./components/Places/Places"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/film" element={<Film />} />
                <Route path="/film/choicePlaces" element={<Places />} />
            </Routes>
        </div>
    )
}

export default App
