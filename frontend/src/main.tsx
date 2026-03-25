import { createRoot } from 'react-dom/client'
import './index.css'
import {Login} from './Login.tsx'

const root = createRoot(document.getElementById('root')!)
root.render(
    <>
    <Login />
    </>
)
