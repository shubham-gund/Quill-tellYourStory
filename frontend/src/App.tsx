
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Blogs } from './pages/Blogs'
import { Blog } from './pages/Blog'
import { RecoilRoot } from 'recoil'
import { Publish } from './pages/Publish'
import { Stories } from './pages/Stories'
import { Landing } from './pages/Landing'
import { ProfileEdit } from './pages/ProfileEdit'
function App() {

  return (
    <>
     <RecoilRoot>
     <Router>
        <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/publish' element={<Publish/>} />
            <Route path='/stories' element={<Stories/>} />
            <Route path='/blog/:id' element={<Blog/>} />
            <Route path='/blogs' element={<Blogs/>} />
            <Route path='/profile' element={<ProfileEdit/>} />
        </Routes>
      </Router>
     </RecoilRoot>
    </>
  )
}

export default App
