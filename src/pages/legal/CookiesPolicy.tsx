import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bb-content-area p-8">
            <h1 
              className="text-3xl font-bold text-primary mb-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Política de Cookies
            </h1>

            <div className="prose prose-sm max-w-none space-y-6 text-foreground">
              <p className="text-muted-foreground">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  1. ¿Qué son las Cookies?
                </h2>
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan para recordar tus preferencias y mejorar tu experiencia de navegación.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  2. Tipos de Cookies que Utilizamos
                </h2>
                
                <h3 className="font-bold mt-4">Cookies Esenciales</h3>
                <p>
                  Necesarias para el funcionamiento básico del sitio. Incluyen cookies de sesión para mantener tu sesión iniciada.
                </p>

                <h3 className="font-bold mt-4">Cookies de Preferencias</h3>
                <p>
                  Permiten recordar tus preferencias, como el idioma seleccionado.
                </p>

                <h3 className="font-bold mt-4">Cookies Analíticas</h3>
                <p>
                  Nos ayudan a entender cómo los usuarios interactúan con el sitio para mejorar nuestro servicio.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  3. Gestión de Cookies
                </h2>
                <p>
                  Puedes controlar y gestionar las cookies a través de la configuración de tu navegador. Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  4. Cookies de Terceros
                </h2>
                <p>
                  Algunas cookies pueden ser establecidas por servicios de terceros que utilizamos, como herramientas de análisis. Estos terceros tienen sus propias políticas de privacidad.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  5. Actualizaciones
                </h2>
                <p>
                  Podemos actualizar esta política periódicamente. Te recomendamos revisar esta página regularmente para estar informado sobre el uso de cookies.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  6. Contacto
                </h2>
                <p>
                  Si tienes preguntas sobre nuestra política de cookies, contáctanos en info@bbleagues.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiesPolicy;
