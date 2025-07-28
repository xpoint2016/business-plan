import React, { useState, useMemo } from 'react';
import { sections } from './config/bp-sections';
import { useAuth } from './hooks/useAuth';

import Sidebar from './components/sidebar';
import BusinessPlanLayout from './components/bp-layout';

const App = () => {
  // Estado de la UI se mantiene aquí
  const [selectedSectionId, setSelectedSectionId] = useState(sections[0].id);
  const [selectedSubsectionId, setSelectedSubsectionId] = useState(sections[0].subsections[0]?.id || null);

  // Hook de autenticación
  const { user, loading: authLoading, error: authError } = useAuth();

  // Derivar el estado actual de las selecciones
  const currentSection = useMemo(() => sections.find(s => s.id === selectedSectionId), [selectedSectionId]);
  const currentSubsection = useMemo(() => currentSection?.subsections.find(sub => sub.id === selectedSubsectionId), [currentSection, selectedSubsectionId]);

  const handleSectionSelect = (id) => {
    const section = sections.find(s => s.id === id);
    setSelectedSectionId(id);
    setSelectedSubsectionId(section?.subsections[0]?.id || null);
  };
  
  const currentContentKey = selectedSubsectionId || selectedSectionId;

  if (authLoading) {
    return <div className="flex h-screen items-center justify-center">
      <div className="text-xl">Autenticando...</div>
    </div>;
  }
  
  return (
    <div className="flex h-screen bg-gray-100 font-inter">
      <Sidebar
        sections={sections}
        selectedSection={selectedSectionId}
        selectedSubsection={selectedSubsectionId}
        onSectionSelect={handleSectionSelect}
        onSubsectionSelect={setSelectedSubsectionId}
        userId={user?.uid || 'Usuario Anónimo'}
      />
      
      <BusinessPlanLayout
          section={currentSection}
          subsection={currentSubsection}
          content={null}
          onSave={null}
          isLoading={false}
          isSaving={false}
          error={authError}
      />
    </div>
  );
};

export default App;