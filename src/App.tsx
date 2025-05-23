
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectsPage from "./pages/projects";
import ProjectDetailPage from "./pages/projects/[id]";
import NewProjectPage from "./pages/projects/new";
import FormsPage from "./pages/forms";
import FormDetailPage from "./pages/forms/[id]";
import NewFormPage from "./pages/forms/new";
import ApprovalsPage from "./pages/approvals";
import ReportsPage from "./pages/reports";
import SettingsPage from "./pages/settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/projects/new" element={<NewProjectPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/forms/:id" element={<FormDetailPage />} />
          <Route path="/forms/new" element={<NewFormPage />} />
          <Route path="/approvals" element={<ApprovalsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
