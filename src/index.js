import React from 'react'
import { createRoot } from 'react-dom/client'
import Content from "./Content"
import Footer from "./Footer"

import './App.scss'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <div className="app">
            <Content />
        </div>
    </React.StrictMode>
)
