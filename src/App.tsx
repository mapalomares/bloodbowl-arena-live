import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Leagues from "./pages/Leagues";
import LeagueDetail from "./pages/LeagueDetail";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import MatchDetail from "./pages/MatchDetail";
import Forums from "./pages/Forums";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Contact from "./pages/Contact";
import Terms from "./pages/legal/Terms";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import CookiesPolicy from "./pages/legal/CookiesPolicy";
import ServiceTerms from "./pages/legal/ServiceTerms";
import NotFound from "./pages/NotFound";
// Commissioner Zone
import CommissionerDashboard from "./pages/commissioner/CommissionerDashboard";
import MatchActForm from "./pages/commissioner/MatchActForm";
import ManageTeams from "./pages/commissioner/ManageTeams";
import ManageRounds from "./pages/commissioner/ManageRounds";
import ManagePlayoffs from "./pages/commissioner/ManagePlayoffs";
import LeagueSettings from "./pages/commissioner/LeagueSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Zone */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Legal Pages */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies-policy" element={<CookiesPolicy />} />
          <Route path="/service-terms" element={<ServiceTerms />} />
          
          {/* User Zone */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/liga/:leagueId" element={<LeagueDetail />} />
          <Route path="/equipos" element={<Teams />} />
          <Route path="/equipo/:teamId" element={<TeamDetail />} />
          <Route path="/partido/:matchId" element={<MatchDetail />} />
          <Route path="/forums" element={<Forums />} />
          
          {/* Commissioner Zone */}
          <Route path="/comisario/:leagueId" element={<CommissionerDashboard />} />
          <Route path="/comisario/:leagueId/acta" element={<MatchActForm />} />
          <Route path="/comisario/:leagueId/equipos" element={<ManageTeams />} />
          <Route path="/comisario/:leagueId/jornadas" element={<ManageRounds />} />
          <Route path="/comisario/:leagueId/playoffs" element={<ManagePlayoffs />} />
          <Route path="/comisario/:leagueId/configuracion" element={<LeagueSettings />} />
          
          {/* Admin Zone */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/leagues" element={<AdminLeagues />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/teams" element={<AdminTeams />} />
          <Route path="/admin/bonuses" element={<AdminBonuses />} />
          <Route path="/admin/data/races" element={<AdminRaces />} />
          <Route path="/admin/maintenance/:section" element={<AdminMaintenance />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
