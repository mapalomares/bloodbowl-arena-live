import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, ChevronRight, ThumbsUp, Flag, Edit, Trash2, 
  Quote, Clock, Pin, Lock, Share2, ChevronLeft, ChevronDown
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data
const categories: Record<string, string> = {
  "1": "Dudas y Sugerencias",
  "2": "Discusión General",
  "3": "Tácticas y Estrategias",
};

const topicData = {
  id: "1",
  categoryId: "1",
  title: "¿Cómo puedo crear un equipo nuevo?",
  isPinned: true,
  isLocked: false,
  createdAt: "2024-01-10 10:30",
  author: {
    name: "NuevoEntrenador",
    avatar: "",
    role: "Usuario",
    posts: 5,
    joinedAt: "2024-01",
  },
  content: `¡Hola a todos!

Soy nuevo en la plataforma y me gustaría saber cómo puedo crear un equipo para participar en una liga.

He intentado buscar en el menú pero no encuentro la opción. ¿Alguien puede ayudarme?

Gracias de antemano.`,
};

const repliesData = [
  {
    id: "1",
    author: {
      name: "VeteranCoach",
      avatar: "",
      role: "Veterano",
      posts: 234,
      joinedAt: "2020-03",
    },
    content: `¡Bienvenido a bbleagues!

Para crear un equipo, sigue estos pasos:

1. Ve a tu **Dashboard** (panel principal)
2. Busca la sección "Mis Equipos"
3. Haz clic en "Crear Nuevo Equipo"
4. Selecciona la liga donde quieres participar
5. Elige tu raza y nombre del equipo

¡Espero que te sirva!`,
    createdAt: "2024-01-10 11:15",
    likes: 8,
    isLiked: false,
  },
  {
    id: "2",
    author: {
      name: "AdminBB",
      avatar: "",
      role: "Administrador",
      posts: 1542,
      joinedAt: "2019-01",
    },
    content: `¡Hola @NuevoEntrenador!

Como bien dice @VeteranCoach, puedes crear equipos desde tu dashboard.

También te comento que hemos publicado una guía completa para nuevos usuarios que puedes encontrar en la sección de Ayuda.

Si tienes cualquier otra duda, no dudes en preguntar. ¡Estamos aquí para ayudar!`,
    createdAt: "2024-01-10 14:22",
    likes: 12,
    isLiked: true,
  },
  {
    id: "3",
    author: {
      name: "NuevoEntrenador",
      avatar: "",
      role: "Usuario",
      posts: 5,
      joinedAt: "2024-01",
    },
    content: `¡Muchas gracias a ambos!

Ya pude crear mi equipo. He elegido Orcos porque me parecen más fáciles para empezar.

Ahora me toca buscar una liga donde inscribirme. ¿Alguna recomendación para principiantes?`,
    createdAt: "2024-01-10 16:45",
    likes: 3,
    isLiked: false,
  },
  {
    id: "4",
    author: {
      name: "Comisario1",
      avatar: "",
      role: "Comisario",
      posts: 89,
      joinedAt: "2021-06",
    },
    content: `¡Hola!

Te recomiendo la **Liga Rookie** que estoy comisariando. Está pensada para jugadores nuevos y tenemos un ambiente muy amigable.

Las inscripciones están abiertas hasta el 20 de enero. ¡Anímate a unirte!`,
    createdAt: "2024-01-11 09:30",
    likes: 5,
    isLiked: false,
  },
  {
    id: "5",
    author: {
      name: "AdminBB",
      avatar: "",
      role: "Administrador",
      posts: 1542,
      joinedAt: "2019-01",
    },
    content: `¡Genial! Los Orcos son una excelente elección para empezar.

La Liga Rookie de @Comisario1 es perfecta para nuevos jugadores. También puedes ver otras ligas abiertas en la sección de Ligas.

¡Mucha suerte en tu aventura en Blood Bowl!`,
    createdAt: "2024-01-15 14:30",
    likes: 4,
    isLiked: false,
  },
];

const ForumTopic = () => {
  const { categoryId, topicId } = useParams<{ categoryId: string; topicId: string }>();
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState(repliesData);

  const categoryName = categories[categoryId || "1"] || "Categoría";

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Administrador":
        return "destructive";
      case "Comisario":
        return "default";
      case "Veterano":
        return "secondary";
      default:
        return "outline";
    }
  };

  const handleLike = (replyId: string) => {
    setReplies(prev => prev.map(reply => {
      if (reply.id === replyId) {
        return {
          ...reply,
          likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
          isLiked: !reply.isLiked,
        };
      }
      return reply;
    }));
  };

  const handleSubmitReply = () => {
    if (!replyContent.trim()) return;
    // Mock submit - in real app would call API
    setReplyContent("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-muted-foreground mb-6 flex-wrap">
          <Link to="/forums" className="hover:text-primary transition-colors">
            Foros
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to={`/forums/${categoryId}`} className="hover:text-primary transition-colors">
            {categoryName}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground truncate max-w-[200px]">{topicData.title}</span>
        </div>

        {/* Topic Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {topicData.isPinned && (
              <Badge variant="secondary" className="gap-1">
                <Pin className="h-3 w-3" />
                Fijado
              </Badge>
            )}
            {topicData.isLocked && (
              <Badge variant="outline" className="gap-1">
                <Lock className="h-3 w-3" />
                Cerrado
              </Badge>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{topicData.title}</h1>
        </div>

        {/* Original Post */}
        <Card className="mb-6 border-primary/30">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Author Info */}
              <div className="bg-muted/50 p-4 md:w-48 flex-shrink-0 border-b md:border-b-0 md:border-r">
                <div className="flex md:flex-col items-center md:items-center gap-3">
                  <Avatar className="h-12 w-12 md:h-16 md:w-16">
                    <AvatarImage src={topicData.author.avatar} />
                    <AvatarFallback className="text-lg">{topicData.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="font-semibold">{topicData.author.name}</p>
                    <Badge variant={getRoleBadgeVariant(topicData.author.role)} className="mt-1">
                      {topicData.author.role}
                    </Badge>
                  </div>
                </div>
                <div className="hidden md:block mt-4 text-sm text-muted-foreground space-y-1 text-center">
                  <p>Posts: {topicData.author.posts}</p>
                  <p>Desde: {topicData.author.joinedAt}</p>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="flex-1 p-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {topicData.createdAt}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                  {topicData.content}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {replies.length} Respuestas
          </h2>
          
          {replies.map((reply) => (
            <Card key={reply.id}>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Author Info */}
                  <div className="bg-muted/30 p-4 md:w-48 flex-shrink-0 border-b md:border-b-0 md:border-r">
                    <div className="flex md:flex-col items-center md:items-center gap-3">
                      <Avatar className="h-10 w-10 md:h-12 md:w-12">
                        <AvatarImage src={reply.author.avatar} />
                        <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="font-semibold text-sm">{reply.author.name}</p>
                        <Badge variant={getRoleBadgeVariant(reply.author.role)} className="mt-1 text-xs">
                          {reply.author.role}
                        </Badge>
                      </div>
                    </div>
                    <div className="hidden md:block mt-3 text-xs text-muted-foreground space-y-1 text-center">
                      <p>Posts: {reply.author.posts}</p>
                    </div>
                  </div>
                  
                  {/* Reply Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {reply.createdAt}
                      </div>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap mb-4">
                      {reply.content}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t">
                      <Button 
                        variant={reply.isLiked ? "default" : "ghost"} 
                        size="sm"
                        onClick={() => handleLike(reply.id)}
                        className="gap-1"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        {reply.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Quote className="h-4 w-4 mr-1" />
                        Citar
                      </Button>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* Reply Form */}
        {!topicData.isLocked && (
          <Card className="mt-6">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Responder al tema</h3>
              <Textarea
                placeholder="Escribe tu respuesta..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[120px] mb-3"
              />
              <div className="flex justify-end">
                <Button onClick={handleSubmitReply} disabled={!replyContent.trim()}>
                  Publicar Respuesta
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {topicData.isLocked && (
          <Card className="mt-6 bg-muted/50">
            <CardContent className="p-4 text-center">
              <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">
                Este tema está cerrado y no admite nuevas respuestas.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Back button */}
        <div className="mt-6">
          <Button variant="outline" asChild>
            <Link to={`/forums/${categoryId}`}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Volver a {categoryName}
            </Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForumTopic;
