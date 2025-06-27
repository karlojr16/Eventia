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
    location: "Ciudad de México",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f29c8eb7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 127,
    price: 15000,
    type: "Bodas",
    capacity: 200,
  },
  {
    id: 2,
    name: "Centro de Eventos Aurora",
    location: "Guadalajara",
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
    location: "Monterrey",
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
    location: "Puebla",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 203,
    price: 10000,
    type: "Quinceañeras",
    capacity: 180,
  },
  {
    id: 5,
    name: "Salón Premium Palace",
    location: "Ciudad de México",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 95,
    price: 22000,
    type: "Bodas",
    capacity: 300,
  },
  {
    id: 6,
    name: "Centro de Conferencias Moderno",
    location: "Guadalajara",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviews: 78,
    price: 8000,
    type: "Corporativo",
    capacity: 120,
  },
  {
    id: 7,
    name: "Quinta Los Rosales",
    location: "Monterrey",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 142,
    price: 16000,
    type: "Quinceañeras",
    capacity: 250,
  },
  {
    id: 8,
    name: "Salón de Graduaciones UNI",
    location: "Puebla",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    reviews: 67,
    price: 9000,
    type: "Graduaciones",
    capacity: 180,
  },
  {
    id: 9,
    name: "Terraza Celebración",
    location: "Cancún",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 118,
    price: 14000,
    type: "Cumpleaños",
    capacity: 150,
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
      selectedEventType === "all" || venue.type === selectedEventType;
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
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground font-display">Eventia</h1>
              <p className="text-xs text-muted-foreground font-body">Explora salones</p>
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
