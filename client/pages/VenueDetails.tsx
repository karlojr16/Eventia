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
    reviewCount: 127,
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
    reviewCount: 89,
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
    reviewCount: 156,
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
    reviewCount: 203,
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
      "Servicio de catering",
      "Decoración incluida",
    ],
    images: [
      "/EventIA/Evento XV--/Salon 1/SALONXV.jpg",
      "/EventIA/Evento XV--/Salon 1/SALONXV2.jpg",
      "/EventIA/Evento XV--/Salon 1/SALONXV3.jpg",
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
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [guestCount, setGuestCount] = useState("");
  const [eventType, setEventType] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const venue = venueData[Number(id) as unknown as keyof typeof venueData];

  if (!venue) {
    return (
      <div className="min-h-screen bg-background font-body">
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4 font-display">
            Salón no encontrado
          </h2>
          <p className="text-muted-foreground mb-6 font-body">
            El salón que buscas no existe o ha sido removido.
          </p>
          <Button onClick={() => navigate("/")} className="font-body">
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    // Aquí iría la lógica de reserva
    alert("Funcionalidad de reserva en desarrollo");
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center font-body"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="font-body">
              <Share className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
              className="font-body"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Venue Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 font-display">
                {venue.name}
              </h1>
              <div className="flex items-center space-x-4 text-muted-foreground font-body">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {venue.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Hasta {venue.capacity} personas
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  {venue.rating} ({venue.reviewCount} reseñas)
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="font-body">{venue.type}</Badge>
          </div>
          <p className="text-lg text-muted-foreground font-body">
            {venue.description}
          </p>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="md:col-span-2">
            <img
              src={venue.images && venue.images.length > 0 ? venue.images[0] : '/SALON1.jpeg'}
              alt={venue.name}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
          {venue.images && venue.images.length > 1 && venue.images.slice(1, 4).map((image, index) => (
            <img
              key={String(index)}
              src={image}
              alt={`${venue.name} ${index + 2}`}
              className="w-full h-32 object-cover rounded-lg"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Servicios incluidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {venue.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3 font-body">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Reseñas de clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {venue.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        {review.avatar && !review.avatar.includes('photo-1494790108755-2616b612b5c5') && (
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground font-display">
                              {review.name}
                            </h4>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2 font-body">
                            {review.comment}
                          </p>
                          <span className="text-sm text-muted-foreground font-body">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-display">Reservar salón</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-foreground font-display">
                    ${venue.price.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground font-body">por evento</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date" className="font-body">Fecha del evento</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal font-body"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "PPP", { locale: es })
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="guests" className="font-body">Número de invitados</Label>
                    <Select value={guestCount} onValueChange={setGuestCount}>
                      <SelectTrigger className="font-body">
                        <SelectValue placeholder="Selecciona el número" />
                      </SelectTrigger>
                      <SelectContent>
                        {[50, 100, 150, 200, 250, 300].map((count) => (
                          <SelectItem key={count} value={count.toString()} className="font-body">
                            {count} personas
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="event-type" className="font-body">Tipo de evento</Label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger className="font-body">
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Boda", "Cumpleaños", "Quinceañera", "Corporativo", "Graduación", "Aniversario"].map((type) => (
                          <SelectItem key={type} value={type} className="font-body">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleBooking}
                    className="w-full font-body"
                    size="lg"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Reservar ahora
                  </Button>
                </div>

                <Separator />

                <div className="text-center">
                  <p className="text-sm text-muted-foreground font-body">
                    ¿Tienes preguntas?
                  </p>
                  <Button variant="link" className="font-body">
                    Contactar al propietario
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
