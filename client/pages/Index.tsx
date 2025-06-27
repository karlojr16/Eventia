import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Users,
  Star,
  Calendar,
  Heart,
  Gift,
  Crown,
  Building2,
  GraduationCap,
  PartyPopper,
  Coffee,
} from "lucide-react";

const featuredVenues = [
  {
    id: 1,
    name: "Salón Elegancia",
    location: "Chihuahua, Chih.",
    image:
      "./SALON1.jpeg",
    rating: 4.9,
    reviews: 127,
    price: 15000,
    type: "Bodas",
    capacity: 200,
  },
  {
    id: 2,
    name: "Centro de Eventos Aurora",
    location: "Chihuahua, Chih.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 89,
    price: 12000,
    type: "Corporativo",
    capacity: 150,
  },
  {
    id: 3,
    name: "Terraza Jardín Real",
    location: "Chihuahua, Chih.",
    image:
      "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 156,
    price: 18000,
    type: "Cumpleaños",
    capacity: 100,
  },
  {
    id: 4,
    name: "Salón Vista Hermosa",
    location: "Chihuahua, Chih.",
    image:
      "./SALON3.jpeg",
    rating: 4.9,
    reviews: 203,
    price: 10000,
    type: "Quinceañeras",
    capacity: 180,
  },
  {
    id: 5,
    name: "Salón XV Fiesta 1",
    location: "Chihuahua, Chih.",
    image: "/EventIA/Evento XV--/Salon 1/SALONXV.jpg",
    type: "Quinceañeras",
    rating: 4.8,
    reviews: 80,
    price: 12000,
    capacity: 180,
  },
  {
    id: 6,
    name: "Salón XV Fiesta 2",
    location: "Chihuahua, Chih.",
    image: "/EventIA/Evento XV--/Salon 2/514164441_122154875384472633_7761444742909402427_n.jpg",
    type: "Quinceañeras",
    rating: 4.7,
    reviews: 65,
    price: 11000,
    capacity: 150,
  },
  {
    id: 7,
    name: "Salón Bodas 1",
    location: "Chihuahua, Chih.",
    image: "/EventIA/Evento Bodas--/Salon 1/465550249_6641628697451_4660581914822539723_n.jpg",
    type: "Bodas",
    rating: 4.9,
    reviews: 120,
    price: 18000,
    capacity: 200,
  },
  {
    id: 8,
    name: "Salón Bodas 2",
    location: "Chihuahua, Chih.",
    image: "/EventIA/Evento Bodas--/Salon 2/BODAS.jpg",
    type: "Bodas",
    rating: 4.8,
    reviews: 110,
    price: 17000,
    capacity: 180,
  },
  {
    id: 9,
    name: "Salón Fiestas Infantiles 1",
    location: "Chihuahua, Chih.",
    image: "/EventIA/Evento Fiestas infantiles--/Salon 1/503917851_122110250798888854_2289480817780444977_n.jpg",
    type: "Fiestas Infantiles",
    rating: 4.6,
    reviews: 90,
    price: 9000,
    capacity: 100,
  },
  {
    id: 10,
    name: "Salón Fiestas Infantiles 2",
    location: "Chihuahua, Chih.",
    image: "/EventIA/Evento Fiestas infantiles--/Salon 2/505883974_122103658430899375_7951542583058318836_n.jpg",
    type: "Fiestas Infantiles",
    rating: 4.7,
    reviews: 95,
    price: 9500,
    capacity: 120,
  },
  {
    id: 11,
    name: "Salón Babyshower 1",
    location: "Chihuahua, Chih.",
    image: "/EventIA/Eventos Babyshower--/Salon 1/494060268_1285878250210854_6461261003915800306_n.jpg",
    type: "Baby Shower",
    rating: 4.8,
    reviews: 70,
    price: 8000,
    capacity: 80,
  },
  {
    id: 12,
    name: "Salón Babyshower 2",
    location: "Chihuahua, Chih.",
    image: "/EventIA/Eventos Babyshower--/Salon 2/505410894_122136139784639437_4420039389550950362_n.jpg",
    type: "Baby Shower",
    rating: 4.9,
    reviews: 75,
    price: 8500,
    capacity: 90,
  },
];

const eventTypes = [
  { name: "Bodas", icon: Heart },
  { name: "Cumpleaños", icon: Gift },
  { name: "Quinceañeras", icon: Crown },
  { name: "Corporativo", icon: Building2 },
  { name: "Graduaciones", icon: GraduationCap },
  { name: "Aniversarios", icon: PartyPopper },
  { name: "Baby Shower", icon: Coffee },
  { name: "Conferencias", icon: Users },
];

export default function Index() {
  const [searchCity, setSearchCity] = useState("");
  const [eventType, setEventType] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchCity || eventType) {
      const params = new URLSearchParams();
      if (searchCity) params.set("ciudad", searchCity);
      if (eventType) params.set("evento", eventType);
      navigate(`/buscar?${params.toString()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-300 font-body">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 h-full">
          <img src="/LOGONEGRO.png" alt="Eventia logo" className="h-full w-auto" />
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate("/explorar")}
              className="text-muted-foreground hover:text-foreground transition-colors font-body"
            >
              Explorar
            </button>
            <button
              onClick={() => navigate("/registrar-salon")}
              className="text-muted-foreground hover:text-foreground transition-colors font-body"
            >
              Registra tu salón
            </button>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors font-body"
            >
              Ayuda
            </a>
            <Button variant="outline" size="sm" className="font-body">
              Iniciar Sesión
            </Button>
            <Button size="sm" className="font-body">Registrarse</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 overflow-hidden"
        style={{
          backgroundImage: "url('/eventfondo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Galería de imágenes decorativa a la derecha */}
        <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 w-1/3 flex items-center justify-end z-0 pointer-events-none">
          <div className="grid grid-rows-3 gap-6 w-full pr-8">
            <img src="./SALON1.jpeg" alt="img1" className="rounded-3xl object-cover w-full h-40 shadow-lg" />
            <img src="./SALON2.jpeg" alt="img2" className="rounded-3xl object-cover w-full h-40 shadow-lg" />
            <img src="./SALON3.jpeg" alt="img3" className="rounded-3xl object-cover w-full h-40 shadow-lg" />
          </div>
        </div>
        <div className="container mx-auto text-left flex flex-col items-start relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
            Encuentra el salón perfecto
            <span className="text-accent block">para tu evento especial</span>
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl font-body">
            Descubre espacios únicos para bodas, cumpleaños, eventos
            corporativos y más. Miles de opciones esperándote en toda México.
          </p>

          {/* Search Form alineado a la izquierda */}
          <div className="max-w-4xl w-full">
            <Card className="p-6 shadow-xl border-2">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground block text-left font-body">
                      ¿Dónde?
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Ciudad o estado"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        className="pl-10 h-12 font-body"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground block text-left font-body">
                      Tipo de evento
                    </label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger className="h-12 font-body">
                        <SelectValue placeholder="Selecciona un evento" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => {
                          const IconComponent = type.icon;
                          return (
                            <SelectItem key={type.name} value={type.name} className="font-body">
                              <div className="flex items-center space-x-2">
                                <IconComponent className="w-4 h-4 text-primary" />
                                <span>{type.name}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={handleSearch}
                      className="w-full h-12 text-lg font-semibold font-body"
                      size="lg"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Buscar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Featured Venues */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4 font-display">
              Salones destacados
            </h3>
            <p className="text-lg text-muted-foreground font-body">
              Los espacios más populares de nuestros huéspedes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVenues.map((venue) => (
              <Card
                key={venue.id}
                className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                onClick={() => navigate(`/salon/${venue.id}`)}
              >
                <div className="relative">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
                    <Heart className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                  </button>
                  <Badge
                    className="absolute bottom-3 left-3 font-body"
                    variant="secondary"
                  >
                    {venue.type}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors font-display">
                      {venue.name}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium font-body">
                        {venue.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm mb-2 font-body">
                    <MapPin className="w-3 h-3 mr-1" />
                    {venue.location}
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm mb-3 font-body">
                    <Users className="w-3 h-3 mr-1" />
                    Hasta {venue.capacity} personas
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-foreground font-display">
                        ${venue.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1 font-body">
                        por evento
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-body">
                      {venue.reviews} reseñas
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4 font-display">
              ¿Por qué elegir Eventia?
            </h3>
            <p className="text-lg text-muted-foreground font-body">
              La mejor experiencia para encontrar tu salón ideal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2 font-display">
                Búsqueda fácil
              </h4>
              <p className="text-muted-foreground font-body">
                Encuentra exactamente lo que necesitas con nuestros filtros
                inteligentes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2 font-display">
                Calidad garantizada
              </h4>
              <p className="text-muted-foreground font-body">
                Todos nuestros salones están verificados y cuentan con reseñas
                reales
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2 font-display">
                Soporte 24/7
              </h4>
              <p className="text-muted-foreground font-body">
                Nuestro equipo está aquí para ayudarte en cada paso del proceso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4 font-display">
              Lo que dicen nuestros clientes
            </h3>
            <p className="text-lg text-muted-foreground font-body">
              Miles de eventos exitosos nos respaldan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="María González"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h5 className="font-semibold text-foreground font-display">
                      María González
                    </h5>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic font-body">
                  "Eventia nos ayudó a encontrar el salón perfecto para
                  nuestra boda. El proceso fue súper fácil y el equipo nos
                  acompañó en cada paso."
                </p>
                <span className="text-sm text-muted-foreground mt-3 block font-body">
                  Boda en Salón Elegancia
                </span>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Carlos Méndez"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h5 className="font-semibold text-foreground font-display">
                      Carlos Méndez
                    </h5>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic font-body">
                  "Organizamos nuestro evento corporativo anual aquí. Excelente
                  servicio, instalaciones de primera y precios muy
                  competitivos."
                </p>
                <span className="text-sm text-muted-foreground mt-3 block font-body">
                  Evento corporativo en Centro Aurora
                </span>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Ana Martínez"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h5 className="font-semibold text-foreground font-display">
                      Ana Martínez
                    </h5>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic font-body">
                  "Mi quinceañera fue un sueño hecho realidad. La plataforma es
                  muy fácil de usar y encontramos exactamente lo que
                  buscábamos."
                </p>
                <span className="text-sm text-muted-foreground mt-3 block font-body">
                  Quinceañera en Salón Vista Hermosa
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-lg font-bold font-display">Eventia</span>
              </div>
              <p className="text-muted font-body">
                El lugar perfecto para cada evento especial
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3 font-display">Explorar</h5>
              <ul className="space-y-2 text-sm text-muted font-body">
                <li>
                  <a
                    href="#"
                    className="hover:text-background transition-colors"
                  >
                    Bodas
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-background transition-colors"
                  >
                    Cumpleaños
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-background transition-colors"
                  >
                    Corporativo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-background transition-colors"
                  >
                    Quinceañeras
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3 font-display">Compañía</h5>
              <ul className="space-y-2 text-sm text-muted font-body">
                <li>
                  <a
                    href="#"
                    className="hover:text-background transition-colors"
                  >
                    Acerca de
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-background transition-colors"
                  >
                    Carreras
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-background transition-colors"
                  >
                    Prensa
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-background transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3 font-display">Soporte</h5>
              <ul className="space-y-2 text-sm text-muted font-body">
                <li>
                  <a
                    href="#"
                    className="hover:text-background transition-colors"
                  >
                    Centro de ayuda
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-background transition-colors"
                  >
                    Contacto
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-background transition-colors"
                  >
                    Términos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-background transition-colors"
                  >
                    Privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-muted/20 mt-8 pt-8 text-center text-sm text-muted font-body">
            © 2024 Eventia. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
