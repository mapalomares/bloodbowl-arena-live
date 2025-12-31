import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { 
  User, 
  Bell, 
  Gift, 
  Package,
  Save,
  ArrowLeft,
  Camera
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "Juan García",
    email: "juan.garcia@email.com",
    bio: "Entrenador veterano de Blood Bowl desde 2015. Fan de los Orcos.",
    location: "Madrid, España"
  });

  const [notifications, setNotifications] = useState({
    matchReminders: true,
    standingsChanges: true,
    commissionerMessages: true,
    weeklyDigest: false
  });

  const [bonusCode, setBonusCode] = useState("");

  const availablePackages = [
    { id: 1, name: "Pack Premium", description: "Acceso a estadísticas avanzadas y exportación PDF", price: "9.99€/mes" },
    { id: 2, name: "Pack Comisario", description: "Herramientas avanzadas para gestión de ligas", price: "14.99€/mes" },
  ];

  const handleSaveProfile = () => {
    console.log("Saving profile:", profileData);
  };

  const handleApplyBonus = () => {
    console.log("Applying bonus code:", bonusCode);
    setBonusCode("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuth={false} />
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <h1 className="bb-title text-2xl">Mi Perfil</h1>
          </div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Personal</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notificaciones</span>
              </TabsTrigger>
              <TabsTrigger value="bonuses" className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                <span className="hidden sm:inline">Bonos</span>
              </TabsTrigger>
              <TabsTrigger value="packages" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Paquetes</span>
              </TabsTrigger>
            </TabsList>

            {/* Personal Info */}
            <TabsContent value="personal">
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold">
                        JG
                      </div>
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <p className="font-medium">Foto de Perfil</p>
                      <p className="text-sm text-muted-foreground">JPG, PNG o GIF. Max 2MB.</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nombre Completo</Label>
                      <Input 
                        id="name" 
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Ubicación</Label>
                      <Input 
                        id="location" 
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        rows={4}
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} className="w-full sm:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications">
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle>Preferencias de Notificaciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Recordatorios de Partidos</p>
                      <p className="text-sm text-muted-foreground">Recibe alertas antes de tus partidos</p>
                    </div>
                    <Switch 
                      checked={notifications.matchReminders}
                      onCheckedChange={(checked) => setNotifications({...notifications, matchReminders: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Cambios en Clasificación</p>
                      <p className="text-sm text-muted-foreground">Notificaciones cuando cambia tu posición</p>
                    </div>
                    <Switch 
                      checked={notifications.standingsChanges}
                      onCheckedChange={(checked) => setNotifications({...notifications, standingsChanges: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mensajes de Comisarios</p>
                      <p className="text-sm text-muted-foreground">Avisos importantes de los comisarios</p>
                    </div>
                    <Switch 
                      checked={notifications.commissionerMessages}
                      onCheckedChange={(checked) => setNotifications({...notifications, commissionerMessages: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Resumen Semanal</p>
                      <p className="text-sm text-muted-foreground">Email semanal con resumen de actividad</p>
                    </div>
                    <Switch 
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) => setNotifications({...notifications, weeklyDigest: checked})}
                    />
                  </div>

                  <Button className="w-full sm:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Preferencias
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bonus Codes */}
            <TabsContent value="bonuses">
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle>Códigos de Bonificación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="bonusCode">Ingresar Código</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="bonusCode" 
                          placeholder="Ej: BONUS2025"
                          value={bonusCode}
                          onChange={(e) => setBonusCode(e.target.value.toUpperCase())}
                        />
                        <Button onClick={handleApplyBonus}>
                          Aplicar
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Bonos Aplicados</h4>
                    <div className="bg-secondary/50 rounded-lg p-4 text-center text-muted-foreground">
                      No tienes bonos aplicados actualmente.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Packages */}
            <TabsContent value="packages">
              <Card className="bb-content-area">
                <CardHeader>
                  <CardTitle>Paquetes Disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {availablePackages.map((pkg) => (
                      <Card key={pkg.id} className="bg-secondary/50">
                        <CardContent className="pt-6">
                          <h3 className="font-bold text-lg mb-2">{pkg.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">{pkg.price}</span>
                            <Button>Activar</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
