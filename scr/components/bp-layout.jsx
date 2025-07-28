import React, { useState } from 'react';
import { generateContentWithChatGPT } from '../api/aiServices';

const BusinessPlanLayout = ({ section, subsection, content, onSave, isLoading, isSaving, error }) => {
  const [userInput, setUserInput] = useState('');
  const [generatedContent, setGeneratedContent] = useState(content?.text || '');
  const [generating, setGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      setGenerationError('Por favor, introduce algo de texto para generar contenido.');
      return;
    }

    setGenerating(true);
    setGenerationError('');

    try {
      const sectionTitle = subsection?.title || section?.title || 'Plan de Negocios';
      const prompt = `Genera el contenido para la sección "${sectionTitle}" basándote en la siguiente información: ${userInput}`;
      
      const result = await generateContentWithChatGPT(prompt, sectionTitle);
      setGeneratedContent(result);
      
      // Si hay una función onSave, guardar el contenido
      if (onSave) {
        const currentKey = subsection?.id || section?.id;
        const dataToSave = { [currentKey]: { text: result } };
        await onSave(dataToSave);
      }
    } catch (err) {
      console.error('Error al generar contenido:', err);
      setGenerationError(`Error al generar contenido: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const currentTitle = subsection?.title || section?.title || 'Selecciona una Sección';

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">{currentTitle}</h2>
          <p className="text-gray-600">Genera contenido profesional para tu plan de negocios</p>
        </div>

        {/* Error Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}
        
        {generationError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {generationError}
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="mb-6">
            <label htmlFor="userInput" className="block text-lg font-semibold text-gray-800 mb-3">
              Describe tu negocio o lo que necesitas para esta sección:
            </label>
            <textarea
              id="userInput"
              className="w-full h-40 px-6 py-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Describe tu negocio, industria, objetivos, mercado objetivo, o cualquier información relevante que quieras incluir en esta sección..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleGenerate}
              disabled={generating || isLoading}
              className="flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transform hover:scale-105 disabled:transform-none"
            >
              {generating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generar con ChatGPT ✨
                </>
              )}
            </button>
            
            {onSave && (
              <button
                onClick={() => onSave({ [subsection?.id || section?.id]: { text: generatedContent } })}
                disabled={isSaving || generating || isLoading}
                className="flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transform hover:scale-105 disabled:transform-none"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Guardar Plan
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Generated Content Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Contenido Generado
          </h3>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 min-h-[300px]">
            <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {generatedContent ? (
                generatedContent
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-lg font-medium">El contenido generado aparecerá aquí</p>
                  <p className="text-sm">Escribe en el campo de arriba y haz clic en "Generar con ChatGPT"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanLayout;
