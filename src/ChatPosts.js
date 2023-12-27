import React, { useState, useEffect, useRef } from 'react'

const ChatPosts = ({ numberOfPosts = 20 }) => {
    const [posts, setPosts] = useState([])
    const [newestPostId, setNewestPostId] = useState(null)
    const chatEndRef = useRef(null)
    const API_URL = '/wp-json'

    const currentUser = window.wpApiSettings ? window.wpApiSettings.currentUser : ''

    const fetchPosts = async (initialLoad = false) => {
        try {
            let url = `${API_URL}/wp/v2/posts?order=desc`
            if (initialLoad) {
                url += `&per_page=${numberOfPosts}`
            } else if (newestPostId) {
                url += `&after=${newestPostId}`
            }

            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Erro ao buscar posts')
            }
            const newPosts = await response.json()

            if (newPosts.length > 0) {
                if (initialLoad) {
                    setPosts(newPosts)
                } else {
                    setPosts(prevPosts => {
                        const filteredNewPosts = newPosts.filter(newPost =>
                            !prevPosts.some(post => post.id === newPost.id))
                        return [...filteredNewPosts, ...prevPosts]
                    });
                }
                setNewestPostId(newPosts[0].id)
            }
        } catch (error) {
            console.error(error)
        }
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    };

    useEffect(() => {
        fetchPosts(true);
        const interval = setInterval(() => fetchPosts(false), 2000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (posts.length > 0) {
            scrollToBottom()
        }
    }, [posts])

    return (
        <div className="messages">
            {[...posts].reverse().map(post => (
                <div className={(post.author == currentUser) ? "message me" : "message"} key={post.id}>
                    <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                    <p className="date">{formatDateTime(post.date)}</p>
                </div>
            ))}
            <div ref={chatEndRef} />
        </div>
    )
}

export default ChatPosts

function formatDateTime(isoDateTimeString) {
    const date = new Date(isoDateTimeString)
    date.setHours(date.getHours() - 3)

    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(date)
}
