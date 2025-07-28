import { useState, useEffect, useCallback } from 'react';
import { loadBusinessPlan, saveBusinessPlan } from '../api/firebaseServices';
// import { generateContent as generateContentAPI } from '../api/aiServices';

export const useBusinessPlan = (userId) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState('');

    // Cargar datos cuando el userId esté disponible
    useEffect(() => {
        if (userId) {
            setLoading(true);
            loadBusinessPlan(userId)
                .then(setData)
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [userId]);

    // Guardar el plan
    const savePlan = useCallback(async () => {
        if (!userId) return;
        setSaving(true);
        setError('');
        try {
            await saveBusinessPlan(userId, data);
        } catch (err) {
            setError(`Error al guardar: ${err.message}`);
        } finally {
            setSaving(false);
        }
    }, [userId, data]);

    // Generar contenido
    const generateContent = useCallback(async (section, subsection, userInput) => {
        if (!userInput.trim()) {
            setError('Por favor, introduce algo de texto.');
            return;
        }
        setGenerating(true);
        setError('');
        try {
            const currentKey = subsection?.id || section.id;
            // La llamada a la API ahora está encapsulada
            // const newContent = await generateContentAPI(section, subsection, userInput);

            const updatedData = { ...data, [currentKey]: newContent };
            setData(updatedData);
            // Guardar automáticamente después de generar
            await saveBusinessPlan(userId, updatedData);

        } catch (err) {
            setError(`Error al generar contenido: ${err.message}`);
        } finally {
            setGenerating(false);
        }
    }, [userId, data]);


    return { data, loading, saving, generating, error, savePlan, generateContent };
};