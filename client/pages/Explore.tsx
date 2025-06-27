import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Star,
  Heart,
  Search,
  Gift,
  Crown,
  Building2,
  GraduationCap,
  PartyPopper,
  Coffee,
} from "lucide-react";

const eventTypeFilters = [
  { name: "Todos", icon: null, value: "all" },
  { name: "Bodas", icon: Heart, value: "Bodas" },
  { name: "Cumpleaños", icon: Gift, value: "Cumpleaños" },
  { name: "Quinceañeras", icon: Crown, value: "Quinceañeras" },
  { name: "Corporativo", icon: Building2, value: "Corporativo" },
  { name: "Graduaciones", icon: GraduationCap, value: "Graduaciones" },
  { name: "Aniversarios", icon: PartyPopper, value: "Aniversarios" },
  { name: "Baby Shower", icon: Coffee, value: "Baby Shower" },
];

const allVenues = [
  {
    id: 1,
    name: "Salón Elegancia",
    location: "Chihuahua, Chih.",
    image: "./SALON1.jpeg",
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
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    image: "./SALON3.jpeg",
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
    image: "/EventIA/Evento XV--/Salon 1/503282182_122141556806717554_8564944729113749278_n.jpg",
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
    image: "/EventIA/Evento Bodas--/Salon 2/495513026_18145021783378977_1590780738414277630_n.jpg",
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

export default function Explore() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("all");

  const filteredVenues = allVenues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedEventType === "all" || venue.type.toLowerCase() === selectedEventType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-background to-amber-50 font-body">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center font-body"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Inicio
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/LOGONEGRO.png" alt="Eventia logo" className="h-full w-auto" />
            </div>
            <div>

            </div>
          </div>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-display">
            Explora todos los salones
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            {filteredVenues.length} salones disponibles
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 font-body"
            />
          </div>
        </div>

        {/* Event Type Filters */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 font-display">
            Filtrar por tipo de evento
          </h3>
          <div className="flex flex-wrap gap-2">
            {eventTypeFilters.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <button
                  key={filter.value}
                  onClick={() => setSelectedEventType(filter.value)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors font-body ${
                    selectedEventType === filter.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:bg-muted"
                  }`}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  <span>{filter.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
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

        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground font-body">
              No se encontraron salones que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
