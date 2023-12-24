import React from 'react'
import { createRoot } from 'react-dom/client'
import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <Header />
        <Content />
        <Footer />
    </React.StrictMode>
)
