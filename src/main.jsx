import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App.jsx'
import CreateAPostRoute from '/routes/CreateAPostRoute.jsx'
import SignUpRoute from '../routes/SignUpRoute.jsx'
import HomeRoute from '../routes/HomeRoute.jsx'
import EditAPostRoute from '../routes/EditAPostRoute.jsx'
import ViewSinglePostRoute from '../routes/ViewSinglePostRoute.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index={true} path="/" element={<App />} />
      <Route path="/create" element={<CreateAPostRoute />} />
      <Route path="/signUp" element={<SignUpRoute />} />
      <Route path="/home" element={<HomeRoute />} />
      <Route path="/viewPost/:postId" element={<ViewSinglePostRoute />} />
      <Route path="/editPost/:postId" element={<EditAPostRoute />} />
    </Routes>
  </BrowserRouter>
)
