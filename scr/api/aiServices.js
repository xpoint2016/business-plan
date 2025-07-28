// Este archivo solo contiene funciones de AI, no hooks de autenticación

// Función para conectar con ChatGPT
export const generateContentWithChatGPT = async (prompt, sectionTitle = '') => {
    try {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        
        if (!apiKey) {
            throw new Error('API key de OpenAI no configurada');
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `Eres un experto en planes de negocios. Genera contenido profesional y detallado para la sección "${sectionTitle}". Responde en español de manera clara y estructurada.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`Error de OpenAI: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error al generar contenido con ChatGPT:', error);
        throw error;
    }
};