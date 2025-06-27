import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Upload,
  MapPin,
  Users,
  Wifi,
  Car,
  Music,
  Coffee,
  CheckCircle,
  Building2,
  Phone,
  Mail,
  Camera,
} from "lucide-react";

const amenitiesList = [
  { id: "wifi", name: "Wi-Fi gratuito", icon: Wifi },
  { id: "parking", name: "Estacionamiento", icon: Car },
  { id: "sound", name: "Sistema de sonido", icon: Music },
  { id: "catering", name: "Servicio de catering", icon: Coffee },
  { id: "decoration", name: "Decoración incluida", icon: CheckCircle },
  { id: "ac", name: "Aire acondicionado", icon: CheckCircle },
];

const eventTypesList = [
  "Bodas",
  "Cumpleaños",
  "Quinceañeras",
  "Corporativo",
  "Graduaciones",
  "Aniversarios",
  "Baby Shower",
  "Conferencias",
];

const statesList = [
  "Ciudad de México",
  "Guadalajara",
  "Monterrey",
  "Puebla",
  "Tijuana",
  "Mérida",
  "Cancún",
  "Toluca",
  "Querétaro",
  "Morelia",
];

export default function RegisterVenue() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    state: "",
    address: "",
    capacity: "",
    price: "",
    eventTypes: [] as string[],
    amenities: [] as string[],
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    images: [] as File[],
  });

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (
    field: string,
    value: string,
    checked: boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(
            (item) => item !== value,
          ),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    alert(
      "¡Salón registrado exitosamente! Nuestro equipo revisará tu solicitud y te contactará pronto.",
    );
    navigate("/");
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.name &&
          formData.description &&
          formData.state &&
          formData.address
        );
      case 2:
        return (
          formData.capacity && formData.price && formData.eventTypes.length > 0
        );
      case 3:
        return formData.amenities.length > 0 && formData.images.length > 0;
      case 4:
        return (
          formData.contactName && formData.contactPhone && formData.contactEmail
        );
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-background to-amber-50">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">EventSpace</h1>
              <p className="text-xs text-muted-foreground">Registra tu salón</p>
            </div>
          </div>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Registra tu salón de eventos
              </h2>
              <p className="text-lg text-muted-foreground">
                Únete a la plataforma líder en México
              </p>
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    s <= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Información</span>
              <span>Detalles</span>
              <span>Servicios</span>
              <span>Contacto</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Información básica"}
                {step === 2 && "Detalles del evento"}
                {step === 3 && "Servicios e imágenes"}
                {step === 4 && "Información de contacto"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del salón *</Label>
                    <Input
                      id="name"
                      placeholder="Ej: Salón Elegancia"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe tu salón, sus características principales y lo que lo hace especial..."
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado/Ciudad *</Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) =>
                          handleInputChange("state", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona ubicación" />
                        </SelectTrigger>
                        <SelectContent>
                          {statesList.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección *</Label>
                      <Input
                        id="address"
                        placeholder="Dirección completa"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Event Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacidad máxima *</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="capacity"
                          type="number"
                          placeholder="200"
                          value={formData.capacity}
                          onChange={(e) =>
                            handleInputChange("capacity", e.target.value)
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Precio por evento *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="price"
                          type="number"
                          placeholder="15000"
                          value={formData.price}
                          onChange={(e) =>
                            handleInputChange("price", e.target.value)
                          }
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Tipos de eventos que acepta *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {eventTypesList.map((eventType) => (
                        <div
                          key={eventType}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`event-${eventType}`}
                            checked={formData.eventTypes.includes(eventType)}
                            onCheckedChange={(checked) =>
                              handleArrayChange(
                                "eventTypes",
                                eventType,
                                checked as boolean,
                              )
                            }
                          />
                          <Label
                            htmlFor={`event-${eventType}`}
                            className="text-sm font-normal"
                          >
                            {eventType}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Services and Images */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Servicios incluidos *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {amenitiesList.map((amenity) => {
                        const IconComponent = amenity.icon;
                        return (
                          <div
                            key={amenity.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`amenity-${amenity.id}`}
                              checked={formData.amenities.includes(amenity.id)}
                              onCheckedChange={(checked) =>
                                handleArrayChange(
                                  "amenities",
                                  amenity.id,
                                  checked as boolean,
                                )
                              }
                            />
                            <IconComponent className="w-4 h-4 text-primary" />
                            <Label
                              htmlFor={`amenity-${amenity.id}`}
                              className="text-sm font-normal"
                            >
                              {amenity.name}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>Fotos del salón * (mínimo 1)</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Sube fotos de alta calidad de tu salón
                      </p>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Label htmlFor="image-upload">
                        <Button variant="outline" className="cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Seleccionar fotos
                        </Button>
                      </Label>
                    </div>

                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Button
                              size="sm"
                              variant="destructive"
                              className="absolute top-1 right-1 w-6 h-6 p-0"
                              onClick={() => removeImage(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Contact Information */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nombre completo *</Label>
                    <Input
                      id="contactName"
                      placeholder="Tu nombre completo"
                      value={formData.contactName}
                      onChange={(e) =>
                        handleInputChange("contactName", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Teléfono *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="contactPhone"
                        placeholder="55 1234 5678"
                        value={formData.contactPhone}
                        onChange={(e) =>
                          handleInputChange("contactPhone", e.target.value)
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Correo electrónico *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.contactEmail}
                        onChange={(e) =>
                          handleInputChange("contactEmail", e.target.value)
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">
                      ¿Qué sigue después del registro?
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Nuestro equipo revisará tu solicitud en 1-2 días
                      </li>
                      <li>• Te contactaremos para verificar la información</li>
                      <li>
                        • Una vez aprobado, tu salón aparecerá en la plataforma
                      </li>
                      <li>• Comenzarás a recibir reservas de inmediato</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 1}
                >
                  Anterior
                </Button>

                {step < totalSteps ? (
                  <Button onClick={nextStep} disabled={!isStepValid()}>
                    Siguiente
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStepValid()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Registrar salón
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
