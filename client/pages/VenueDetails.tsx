import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  MapPin,
  Users,
  Star,
  Heart,
  Share,
  Wifi,
  Car,
  Music,
  Coffee,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const venueData = {
  1: {
    id: 1,
    name: "Salón Elegancia",
    location: "Ciudad de México",
    rating: 4.9,
    reviews: 127,
    price: 15000,
    type: "Bodas",
    capacity: 200,
    description:
      "Un elegante salón de eventos ubicado en el corazón de Ciudad de México, perfecto para celebraciones especiales como bodas, quinceañeras y eventos corporativos. Con una decoración sofisticada y servicios de primera clase.",
    amenities: [
      "Wi-Fi gratuito",
      "Estacionamiento",
      "Sistema de sonido",
      "Servicio de catering",
      "Decoración incluida",
      "Aire acondicionado",
    ],
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f29c8eb7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    reviews: [
      {
        id: 1,
        name: "María González",
        rating: 5,
        comment:
          "Perfecto para nuestra boda. El personal fue muy atento y las instalaciones impecables.",
        date: "Hace 2 semanas",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
      {
        id: 2,
        name: "Carlos Méndez",
        rating: 5,
        comment:
          "Excelente ubicación y servicio. Todo salió perfectamente en nuestro evento corporativo.",
        date: "Hace 1 mes",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
      {
        id: 3,
        name: "Ana Martínez",
        rating: 4,
        comment:
          "Muy bonito salón, solo le faltaría un poco más de iluminación en el área de la pista.",
        date: "Hace 2 meses",
        avatar:
          "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  2: {
    id: 2,
    name: "Centro de Eventos Aurora",
    location: "Guadalajara",
    rating: 4.8,
    reviews: 89,
    price: 12000,
    type: "Corporativo",
    capacity: 150,
    description:
      "Moderno centro de eventos corporativos en Guadalajara, equipado con la última tecnología para conferencias, presentaciones y eventos empresariales. Espacios versátiles y servicios profesionales.",
    amenities: [
      "Wi-Fi gratuito",
      "Estacionamiento",
      "Sistema de sonido",
      "Equipo audiovisual",
      "Servicio de coffee break",
      "Aire acondicionado",
    ],
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f29c8eb7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    reviews: [
      {
        id: 1,
        name: "Carlos Méndez",
        rating: 5,
        comment:
          "Excelente para eventos corporativos. La tecnología y el servicio son de primera.",
        date: "Hace 1 semana",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
      {
        id: 2,
        name: "Ana López",
        rating: 5,
        comment:
          "Perfecto para nuestra conferencia anual. Todo salió excelente.",
        date: "Hace 3 semanas",
        avatar:
          "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  3: {
    id: 3,
    name: "Terraza Jardín Real",
    location: "Monterrey",
    rating: 4.7,
    reviews: 156,
    price: 18000,
    type: "Cumpleaños",
    capacity: 100,
    description:
      "Hermosa terraza al aire libre en Monterrey, ideal para celebraciones íntimas como cumpleaños y reuniones familiares. Con jardines naturales y ambiente acogedor.",
    amenities: [
      "Área al aire libre",
      "Estacionamiento",
      "Sistema de sonido",
      "Servicio de catering",
      "Jardines naturales",
      "Iluminación especial",
    ],
    images: [
      "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f29c8eb7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    reviews: [
      {
        id: 1,
        name: "Patricia Ruiz",
        rating: 5,
        comment:
          "La terraza es preciosa, perfecto para el cumpleaños de mi hijo.",
        date: "Hace 2 semanas",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  4: {
    id: 4,
    name: "Salón Vista Hermosa",
    location: "Puebla",
    rating: 4.9,
    reviews: 203,
    price: 10000,
    type: "Quinceañeras",
    capacity: 180,
    description:
      "Elegante salón especializado en quinceañeras en Puebla. Decoración clásica y sofisticada, perfecta para hacer realidad el sueño de toda quinceañera.",
    amenities: [
      "Wi-Fi gratuito",
      "Estacionamiento",
      "Sistema de sonido",
      "Pista de baile",
      "Decoración incluida",
      "Área VIP",
    ],
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f29c8eb7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    reviews: [
      {
        id: 1,
        name: "Ana Martínez",
        rating: 5,
        comment: "Mi quinceañera fue perfecta aquí. Muy recomendado.",
        date: "Hace 1 mes",
        avatar:
          "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  5: {
    id: 5,
    name: "Salón Premium Palace",
    location: "Ciudad de México",
    rating: 4.8,
    reviews: 95,
    price: 22000,
    type: "Bodas",
    capacity: 300,
    description:
      "El salón más exclusivo de Ciudad de México para bodas de gran elegancia. Instalaciones de lujo y servicio personalizado para el día más importante.",
    amenities: [
      "Wi-Fi gratuito",
      "Valet parking",
      "Sistema de sonido premium",
      "Servicio de catering gourmet",
      "Decoración de lujo",
      "Suite nupcial",
    ],
    images: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f29c8eb7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    reviews: [
      {
        id: 1,
        name: "Isabella Torres",
        rating: 5,
        comment: "Boda de ensueño en un lugar increíble. Vale cada peso.",
        date: "Hace 3 semanas",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  6: {
    id: 6,
    name: "Centro de Conferencias Moderno",
    location: "Guadalajara",
    rating: 4.6,
    reviews: 78,
    price: 8000,
    type: "Corporativo",
    capacity: 120,
    description:
      "Centro especializado en conferencias y eventos profesionales en Guadalajara. Tecnología de punta y espacios diseñados para la productividad.",
    amenities: [
      "Wi-Fi de alta velocidad",
      "Estacionamiento",
      "Equipo audiovisual 4K",
      "Sistema de traducción",
      "Coffee station",
      "Salas de break-out",
    ],
    images: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f29c8eb7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    reviews: [
      {
        id: 1,
        name: "Roberto Silva",
        rating: 5,
        comment:
          "Excelente para conferencias internacionales. Todo muy profesional.",
        date: "Hace 2 semanas",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  7: {
    id: 7,
    name: "Quinta Los Rosales",
    location: "Monterrey",
    rating: 4.9,
    reviews: 142,
    price: 16000,
    type: "Quinceañeras",
    capacity: 250,
    description:
      "Hermosa quinta en Monterrey con arquitectura colonial, perfecta para quinceañeras tradicionales. Amplios jardines y salones elegantes.",
    amenities: [
      "Jardines amplios",
      "Estacionamiento",
      "Sistema de sonido",
      "Capilla privada",
      "Decoración incluida",
      "Área de fotos",
    ],
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f29c8eb7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    reviews: [
      {
        id: 1,
        name: "Carmen Delgado",
        rating: 5,
        comment:
          "La quinta es bellísima, mi hija quedó encantada con su quinceañera.",
        date: "Hace 1 mes",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  8: {
    id: 8,
    name: "Salón de Graduaciones UNI",
    location: "Puebla",
    rating: 4.5,
    reviews: 67,
    price: 9000,
    type: "Graduaciones",
    capacity: 180,
    description:
      "Salón académico en Puebla, diseñado especialmente para ceremonias de graduación. Ambiente formal y solemne para celebrar logros académicos.",
    amenities: [
      "Wi-Fi gratuito",
      "Estacionamiento",
      "Sistema de sonido",
      "Podio incluido",
      "Área de fotografía",
      "Proyectores",
    ],
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f29c8eb7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    reviews: [
      {
        id: 1,
        name: "Dr. Luis Herrera",
        rating: 5,
        comment:
          "Perfecto para ceremonias de graduación. Muy formal y elegante.",
        date: "Hace 3 semanas",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  9: {
    id: 9,
    name: "Terraza Celebración",
    location: "Cancún",
    rating: 4.7,
    reviews: 118,
    price: 14000,
    type: "Cumpleaños",
    capacity: 150,
    description:
      "Terraza tropical en Cancún con vista al mar, perfecta para cumpleaños y celebraciones especiales. Ambiente relajado y vistas espectaculares.",
    amenities: [
      "Vista al mar",
      "Estacionamiento",
      "Sistema de sonido",
      "Bar incluido",
      "Área de playa",
      "Iluminación nocturna",
    ],
    images: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f29c8eb7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    reviews: [
      {
        id: 1,
        name: "Sofia Jiménez",
        rating: 5,
        comment: "Cumpleaños increíble con vista al mar. Muy recomendado.",
        date: "Hace 2 semanas",
        avatar:
          "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
};

export default function VenueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState("");
  const [eventType, setEventType] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [step, setStep] = useState(1);

  const venue = venueData[id as keyof typeof venueData];

  if (!venue) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Salón no encontrado
          </h2>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!date || !guests || !eventType) {
      alert("Por favor completa todos los campos");
      return;
    }
    setShowBooking(true);
  };

  const amenityIcons = {
    "Wi-Fi gratuito": Wifi,
    Estacionamiento: Car,
    "Sistema de sonido": Music,
    "Servicio de catering": Coffee,
    "Decoración incluida": CheckCircle,
    "Aire acondicionado": CheckCircle,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Compartir
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Guardar
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="col-span-2 row-span-2">
                  <img
                    src={venue.images[selectedImage]}
                    alt={venue.name}
                    className="w-full h-64 object-cover rounded-lg cursor-pointer"
                    onClick={() => setSelectedImage(0)}
                  />
                </div>
                {venue.images.slice(1, 4).map((image, index) => (
                  <img
                    key={index + 1}
                    src={image}
                    alt={`${venue.name} ${index + 2}`}
                    className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage(index + 1)}
                  />
                ))}
              </div>
            </div>

            {/* Venue Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {venue.name}
                  </h1>
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {venue.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Hasta {venue.capacity} personas
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      {venue.rating} ({venue.reviews.length} reseñas)
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{venue.type}</Badge>
              </div>

              <p className="text-muted-foreground mb-6">{venue.description}</p>

              {/* Amenities */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Servicios incluidos
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {venue.amenities.map((amenity) => {
                    const IconComponent =
                      amenityIcons[amenity as keyof typeof amenityIcons] ||
                      CheckCircle;
                    return (
                      <div
                        key={amenity}
                        className="flex items-center space-x-2"
                      >
                        <IconComponent className="w-5 h-5 text-primary" />
                        <span className="text-sm text-foreground">
                          {amenity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Reseñas de clientes
              </h3>
              <div className="space-y-6">
                {venue.reviews.map((review) => (
                  <Card key={review.id} className="p-4">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-foreground">
                              {review.name}
                            </h5>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">
                    ${venue.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    por evento
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!showBooking ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="date">Fecha del evento</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date
                              ? format(date, "PPP", { locale: es })
                              : "Selecciona fecha"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guests">Número de invitados</Label>
                      <Input
                        id="guests"
                        type="number"
                        placeholder="Ej: 150"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        max={venue.capacity}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="event-type">Tipo de evento</Label>
                      <Select value={eventType} onValueChange={setEventType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="boda">Boda</SelectItem>
                          <SelectItem value="cumpleanos">Cumpleaños</SelectItem>
                          <SelectItem value="quinceanera">
                            Quinceañera
                          </SelectItem>
                          <SelectItem value="corporativo">
                            Corporativo
                          </SelectItem>
                          <SelectItem value="graduacion">Graduación</SelectItem>
                          <SelectItem value="aniversario">
                            Aniversario
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${venue.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Servicios</span>
                        <span>$2,000</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${(venue.price + 2000).toLocaleString()}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleBooking}
                    >
                      Reservar ahora
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    {step === 1 && (
                      <>
                        <h3 className="font-semibold text-foreground">
                          Confirma tu reserva
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Fecha:</span>
                            <span>
                              {date ? format(date, "PPP", { locale: es }) : ""}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Invitados:</span>
                            <span>{guests} personas</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Evento:</span>
                            <span className="capitalize">{eventType}</span>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total a pagar:</span>
                          <span>${(venue.price + 2000).toLocaleString()}</span>
                        </div>
                        <Button className="w-full" onClick={() => setStep(2)}>
                          Continuar al pago
                        </Button>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <h3 className="font-semibold text-foreground flex items-center">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Información de pago
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="card-number">
                              Número de tarjeta
                            </Label>
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="expiry">Vencimiento</Label>
                              <Input id="expiry" placeholder="MM/AA" />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="name">Nombre en la tarjeta</Label>
                            <Input id="name" placeholder="Juan Pérez" />
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => {
                            alert(
                              "¡Reserva confirmada! Recibirás un email con los detalles.",
                            );
                            navigate("/");
                          }}
                        >
                          Confirmar pago
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
