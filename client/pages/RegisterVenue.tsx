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
            Volver al inicio
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground font-display">Eventia</h1>
              <p className="text-xs text-muted-foreground font-body">Registra tu salón</p>
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
              <h2 className="text-3xl font-bold text-foreground mb-2 font-display">
                Registra tu salón de eventos
              </h2>
              <p className="text-lg text-muted-foreground font-body">
                Únete a la plataforma líder en México
              </p>
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium font-body ${
                    s <= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form Steps */}
        <div className="max-w-2xl mx-auto">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Información básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="font-body">Nombre del salón</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Ej: Salón Elegancia"
                    className="font-body"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="font-body">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe tu salón, sus características especiales..."
                    className="font-body"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state" className="font-body">Estado</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger className="font-body">
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {statesList.map((state) => (
                          <SelectItem key={state} value={state} className="font-body">
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="address" className="font-body">Dirección</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Dirección completa"
                      className="font-body"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Capacidad y precios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity" className="font-body">Capacidad máxima</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange("capacity", e.target.value)}
                      placeholder="Ej: 200"
                      className="font-body"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="font-body">Precio por evento</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="Ej: 15000"
                      className="font-body"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-body">Tipos de eventos que organizas</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {eventTypesList.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={formData.eventTypes.includes(type)}
                          onCheckedChange={(checked) =>
                            handleArrayChange("eventTypes", type, checked as boolean)
                          }
                        />
                        <Label htmlFor={type} className="text-sm font-body">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Servicios e imágenes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-body">Servicios incluidos</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {amenitiesList.map((amenity) => {
                      const IconComponent = amenity.icon;
                      return (
                        <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity.id}
                            checked={formData.amenities.includes(amenity.name)}
                            onCheckedChange={(checked) =>
                              handleArrayChange("amenities", amenity.name, checked as boolean)
                            }
                          />
                          <div className="flex items-center space-x-2">
                            <IconComponent className="w-4 h-4 text-primary" />
                            <Label htmlFor={amenity.id} className="text-sm font-body">
                              {amenity.name}
                            </Label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <Label className="font-body">Imágenes del salón</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center mt-2">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2 font-body">
                      Arrastra las imágenes aquí o haz clic para seleccionar
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button variant="outline" size="sm" className="font-body">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        Seleccionar imágenes
                      </label>
                    </Button>
                  </div>
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Información de contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactName" className="font-body">Nombre del contacto</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                    placeholder="Tu nombre completo"
                    className="font-body"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPhone" className="font-body">Teléfono</Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                      placeholder="+52 55 1234 5678"
                      className="font-body"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail" className="font-body">Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      placeholder="tu@email.com"
                      className="font-body"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className="font-body"
            >
              Anterior
            </Button>
            {step < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="font-body"
              >
                Siguiente
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="font-body"
              >
                Enviar solicitud
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
