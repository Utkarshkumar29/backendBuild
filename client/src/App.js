import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import HomePage from './components/homePage';
import Register from './components/register';
import Login from './components/login';
import Admin from './components/admin';
import AdminDasboard from './components/adminDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/home' element={<HomePage/>}/>
                <Route path='/updateUSer/:id' element={<Register/>}/>
                <Route path='/admin' element={<Admin/>}/>
                <Route path='/adminDashboard' element={<AdminDasboard/>}/>
            </Routes>
        </Router>
    )
}

export default App;
