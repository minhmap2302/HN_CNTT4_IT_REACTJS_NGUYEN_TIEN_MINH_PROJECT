import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProjectManagement from './ProjectManagement'
import ProjectDetail from './ProjectDetails';


export default function Main() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProjectManagement />} />
          <Route path="/project-detail" element={<ProjectDetail />} />
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}
