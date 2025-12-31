import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { 
  MessageSquare,
  ChevronRight,
  Plus,
  Clock,
  User,
  MessagesSquare
} from "lucide-react";

interface ForumCategory {
  id: number;
  name: string;
  description: string;
  topics: number;
  lastMessage: {
    topic: string;
    author: string;
    date: string;
  };
}

interface Topic {
  id: number;
  title: string;
  author: string;
  replies: number;
  lastReply: {
    author: string;
    date: string;
  };
  pinned?: boolean;
}

const mockCategories: ForumCategory[] = [
  { 
    id: 1, 
    name: "Dudas y Sugerencias", 
    description: "Pregunta cualquier cosa sobre Blood Bowl o la plataforma",
    topics: 45,
    lastMessage: { topic: "¿Cómo funciona el sistema de mejoras?", author: "NuevoJugador", date: "Hace 2h" }
  },
  { 
    id: 2, 
    name: "Discusión General", 
    description: "Charla general sobre Blood Bowl, estrategias y más",
    topics: 128,
    lastMessage: { topic: "Mejores equipos para principiantes", author: "VeteranoBB", date: "Hace 30min" }
  },
  { 
    id: 3, 
    name: "Liga Nacional", 
    description: "Foro exclusivo para participantes de la Liga Nacional",
    topics: 67,
    lastMessage: { topic: "Jornada 8: Predicciones", author: "Analista", date: "Hace 1h" }
  },
  { 
    id: 4, 
    name: "Mercado de Transferencias", 
    description: "Compra, venta e intercambio de jugadores entre equipos",
    topics: 23,
    lastMessage: { topic: "Blitzer Orco disponible - 100k", author: "TraderBB", date: "Hace 4h" }
  },
];

const mockTopics: Topic[] = [
  { id: 1, title: "📌 Reglas del foro - Leer antes de publicar", author: "Admin", replies: 0, lastReply: { author: "Admin", date: "01 Ene 2025" }, pinned: true },
  { id: 2, title: "¿Cómo funciona el sistema de mejoras?", author: "NuevoJugador", replies: 12, lastReply: { author: "VeteranoBB", date: "Hace 2h" } },
  { id: 3, title: "Mi primer equipo - ¿Consejos?", author: "Rookie2025", replies: 8, lastReply: { author: "Coach_Master", date: "Hace 5h" } },
  { id: 4, title: "Bug al registrar acta", author: "ReporteBug", replies: 3, lastReply: { author: "Soporte", date: "Ayer" } },
  { id: 5, title: "Estrategias para Elfos Silvanos", author: "ElfLover", replies: 25, lastReply: { author: "TacticoElfo", date: "Hace 1 día" } },
];

const Forums = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const renderCategories = () => (
    <div className="space-y-4">
      {mockCategories.map((category) => (
        <Card 
          key={category.id}
          className="bb-content-area cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedCategory(category.id)}
        >
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <MessagesSquare className="h-4 w-4 inline mr-1" />
                    {category.topics} temas
                  </p>
                </div>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium">{category.lastMessage.topic}</p>
                <p className="text-xs text-muted-foreground">
                  por {category.lastMessage.author} • {category.lastMessage.date}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground ml-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTopics = () => {
    const category = mockCategories.find(c => c.id === selectedCategory);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedCategory(null)}>
            ← Volver a Categorías
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Tema
          </Button>
        </div>

        <Card className="bb-content-area">
          <CardHeader>
            <CardTitle>{category?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className={`flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-secondary transition-colors ${
                    topic.pinned ? 'bg-accent/20' : 'bg-secondary/50'
                  }`}
                  onClick={() => navigate(`/forums/${selectedCategory}/${topic.id}`)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{topic.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        por {topic.author} • {topic.replies} respuestas
                      </p>
                    </div>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {topic.lastReply.date}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      por {topic.lastReply.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuth={false} />
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="bb-title text-3xl">Foros</h1>
            {!selectedCategory && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Tema
              </Button>
            )}
          </div>

          {selectedCategory ? renderTopics() : renderCategories()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Forums;
