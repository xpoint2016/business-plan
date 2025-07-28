import React from 'react';

const Sidebar = ({ sections, selectedSection, selectedSubsection, onSectionSelect, onSubsectionSelect, userId }) => {
  return (
    <div className="w-80 bg-white shadow-xl border-r border-gray-100 p-8 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Plan de Negocios AI</h1>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <span>ID de Usuario:</span>
          <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
            {userId || 'Cargando...'}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Navegación</h2>
        
        {sections.map(section => (
          <div key={section.id} className="space-y-1">
            {/* Main Section Button */}
            <button
              onClick={() => {
                onSectionSelect(section.id);
                if (section.subsections.length > 0) {
                  onSubsectionSelect(section.subsections[0].id);
                }
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium
                ${selectedSection === section.id 
                  ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }
              `}
            >
              {section.title}
            </button>
            
            {/* Subsection Buttons */}
            {selectedSection === section.id && section.subsections.length > 0 && (
              <div className="ml-4 space-y-1">
                {section.subsections.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => onSubsectionSelect(sub.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 text-sm
                      ${selectedSubsection === sub.id 
                        ? 'bg-blue-100 text-blue-800 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                      }
                    `}
                  >
                    {sub.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 border-t border-gray-100">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Powered by AI</p>
          <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            → Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;