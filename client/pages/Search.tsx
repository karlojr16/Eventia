import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowLeft } from "lucide-react";

export default function Search() {
  const [searchParams] = useSearchParams();
  const ciudad = searchParams.get("ciudad");
  const evento = searchParams.get("evento");

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground font-display">Eventia</h1>
              <p className="text-xs text-muted-foreground font-body">
                Encuentra tu salón ideal
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors font-body"
            >
              Explorar
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors font-body"
            >
              Anunciar
            </a>
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

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="font-body"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-foreground font-display">
              Resultados de búsqueda
            </h2>
            {(ciudad || evento) && (
              <p className="text-muted-foreground font-body">
                {ciudad && `en ${ciudad}`} {ciudad && evento && "• "}{" "}
                {evento && `para ${evento}`}
              </p>
            )}
          </div>
        </div>

        <Card className="p-8 text-center">
          <CardContent>
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 font-display">
                Página en construcción
              </h3>
              <p className="text-muted-foreground mb-6 font-body">
                Estamos trabajando en esta página para mostrarte los mejores
                resultados de búsqueda.
              </p>
              <Button onClick={() => window.history.back()} className="font-body">
                Volver al inicio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
