import React, { useState } from 'react';

const PostForm = () => {
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const API_URL = '/wp-json';

    const nonce = window.wpApiSettings ? window.wpApiSettings.nonce : '';

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_URL}/wp/v2/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': nonce
                },
                credentials: 'include',
                body: JSON.stringify({ content, status: 'publish' })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro HTTP: ${response.status}, Mensagem: ${errorData.message}`);
            }

            const post = await response.json();
            setMessage(`Post criado com sucesso! ID: ${post.id}`);
            setContent('');

            setTimeout(() => {
                setMessage('');
            }, 1000);

        } catch (error) {
            setMessage(`Falha ao criar post: ${error.message}`);

            setTimeout(() => {
                setMessage('');
            }, 1000);
        }
    };

    return (
        <div className="send-message">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Mensagem</label>
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Mensagem"
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
            {message && (
                <div className="alert-message">
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default PostForm;
