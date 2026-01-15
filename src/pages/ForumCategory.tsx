import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, ChevronRight, Plus, Search, Pin, Lock, 
  Clock, Eye, MessageCircle, ArrowUpDown, Filter
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock categories
const categories: Record<string, { name: string; description: string }> = {
  "1": { name: "Dudas y Sugerencias", description: "Resuelve tus dudas y comparte sugerencias para mejorar la plataforma" },
  "2": { name: "Discusión General", description: "Conversaciones generales sobre Blood Bowl" },
  "3": { name: "Tácticas y Estrategias", description: "Comparte y aprende tácticas de juego" },
  "4": { name: "Ligas y Torneos", description: "Discusión sobre ligas activas y torneos" },
};

// Mock topics
const topicsData = [
  {
    id: "1",
    categoryId: "1",
    title: "¿Cómo puedo crear un equipo nuevo?",
    author: { name: "NuevoEntrenador", avatar: "" },
    replies: 12,
    views: 156,
    lastReply: { author: "AdminBB", date: "2024-01-15 14:30" },
    isPinned: true,
    isLocked: false,
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    categoryId: "1",
    title: "Sugerencia: Añadir notificaciones por email",
    author: { name: "ProPlayer99", avatar: "" },
    replies: 8,
    views: 89,
    lastReply: { author: "Comisario1", date: "2024-01-14 18:45" },
    isPinned: false,
    isLocked: false,
    createdAt: "2024-01-12",
  },
  {
    id: "3",
    categoryId: "1",
    title: "Bug: La clasificación no se actualiza",
    author: { name: "BugHunter", avatar: "" },
    replies: 5,
    views: 67,
    lastReply: { author: "AdminBB", date: "2024-01-14 10:20" },
    isPinned: true,
    isLocked: true,
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    categoryId: "2",
    title: "¿Cuál es la mejor raza para principiantes?",
    author: { name: "Rookie2024", avatar: "" },
    replies: 34,
    views: 412,
    lastReply: { author: "VeteranCoach", date: "2024-01-15 09:15" },
    isPinned: false,
    isLocked: false,
    createdAt: "2024-01-08",
  },
  {
    id: "5",
    categoryId: "2",
    title: "Debate: Elfos vs Orcos",
    author: { name: "ElfLover", avatar: "" },
    replies: 87,
    views: 1023,
    lastReply: { author: "GreenTide", date: "2024-01-15 16:00" },
    isPinned: false,
    isLocked: false,
    createdAt: "2024-01-01",
  },
  {
    id: "6",
    categoryId: "3",
    title: "Guía: Cómo usar a los Skaven",
    author: { name: "RatMaster", avatar: "" },
    replies: 23,
    views: 345,
    lastReply: { author: "SpeedDemon", date: "2024-01-14 20:30" },
    isPinned: true,
    isLocked: false,
    createdAt: "2024-01-05",
  },
];

const ForumCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);

  const category = categories[categoryId || "1"] || { name: "Categoría", description: "" };
  
  const topics = topicsData
    .filter(t => t.categoryId === categoryId)
    .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      // Pinned topics always first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      switch (sortBy) {
        case "replies":
          return b.replies - a.replies;
        case "views":
          return b.views - a.views;
        default:
          return new Date(b.lastReply.date).getTime() - new Date(a.lastReply.date).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-muted-foreground mb-6">
          <Link to="/forums" className="hover:text-primary transition-colors">
            Foros
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{category.name}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-primary" />
              {category.name}
            </h1>
            <p className="text-muted-foreground mt-1">{category.description}</p>
          </div>
          
          <Dialog open={isNewTopicOpen} onOpenChange={setIsNewTopicOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nuevo Tema
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Tema</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del tema</Label>
                  <Input id="title" placeholder="Escribe un título descriptivo..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Contenido</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Escribe el contenido de tu tema..."
                    className="min-h-[200px]"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewTopicOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsNewTopicOpen(false)}>
                    Publicar Tema
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar temas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Más recientes</SelectItem>
                  <SelectItem value="replies">Más respuestas</SelectItem>
                  <SelectItem value="views">Más vistos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Topics List */}
        <div className="space-y-2">
          {topics.map((topic) => (
            <Card 
              key={topic.id} 
              className={`hover:shadow-md transition-shadow ${topic.isPinned ? 'border-primary/50 bg-primary/5' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 hidden sm:flex">
                    <AvatarImage src={topic.author.avatar} />
                    <AvatarFallback>{topic.author.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {topic.isPinned && (
                        <Badge variant="secondary" className="gap-1">
                          <Pin className="h-3 w-3" />
                          Fijado
                        </Badge>
                      )}
                      {topic.isLocked && (
                        <Badge variant="outline" className="gap-1">
                          <Lock className="h-3 w-3" />
                          Cerrado
                        </Badge>
                      )}
                    </div>
                    
                    <Link 
                      to={`/forums/${categoryId}/${topic.id}`}
                      className="font-semibold hover:text-primary transition-colors line-clamp-1"
                    >
                      {topic.title}
                    </Link>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>por {topic.author.name}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">{topic.createdAt}</span>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span className="font-medium">{topic.replies}</span>
                      </div>
                      <span className="text-xs">respuestas</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span className="font-medium">{topic.views}</span>
                      </div>
                      <span className="text-xs">visitas</span>
                    </div>
                  </div>
                  
                  <div className="hidden lg:block text-right text-sm min-w-[150px]">
                    <p className="text-muted-foreground">Última respuesta</p>
                    <p className="font-medium">{topic.lastReply.author}</p>
                    <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                      <Clock className="h-3 w-3" />
                      {topic.lastReply.date}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {topics.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-xl font-semibold mb-2">No hay temas</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? "No se encontraron temas que coincidan con tu búsqueda" 
                  : "Sé el primero en crear un tema en esta categoría"}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsNewTopicOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Tema
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ForumCategory;
