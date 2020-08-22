import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-5 p-5 text-center">
            &copy; {new Date().getFullYear()} DevLink
        </footer>
    )
}
