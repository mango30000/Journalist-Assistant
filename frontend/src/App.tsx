import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InvestigationsList from './pages/InvestigationsList';
import InvestigationBoard from './pages/InvestigationBoard';
import SourcesList from './pages/SourcesList';
import InformationSource from './pages/InformationSource';
import ConnectionsMap from './pages/ConnectionsMap';
import ChronologyOfEvents from './pages/ChronologyOfEvents';
import EvidencePackage from './pages/EvidencePackage';

const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<InvestigationsList />} />
        <Route path="/investigation/:id" element={<InvestigationBoard />} />
        <Route path="/investigation/:id/sources" element={<SourcesList />} />
        <Route path="/investigation/:id/evidence" element={<EvidencePackage />} />
        <Route path="/investigation/:id/timeline" element={<ChronologyOfEvents />} />
        <Route path="/investigation/:id/connections" element={<ConnectionsMap />} />
        <Route path="/source/:id" element={<InformationSource />} />
        <Route path="/source/:id/edit" element={<div>Редактирование источника</div>} />
      </Routes>
  );
};

export default App;