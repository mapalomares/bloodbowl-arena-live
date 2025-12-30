import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const Terms = () => {
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
              Términos y Condiciones
            </h1>

            <div className="prose prose-sm max-w-none space-y-6 text-foreground">
              <p className="text-muted-foreground">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  1. Aceptación de los Términos
                </h2>
                <p>
                  Al acceder y utilizar BB Leagues, aceptas estar vinculado por estos términos y condiciones de uso. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al servicio.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  2. Descripción del Servicio
                </h2>
                <p>
                  BB Leagues es una plataforma de gestión de ligas para juegos de Blood Bowl y similares. Proporcionamos herramientas para organizar torneos, gestionar equipos, registrar partidos y mantener estadísticas.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  3. Registro de Usuario
                </h2>
                <p>
                  Para utilizar ciertas funciones del servicio, deberás registrarte y proporcionar información precisa y actualizada. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  4. Uso Aceptable
                </h2>
                <p>
                  Te comprometes a utilizar el servicio de manera responsable y a no:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Violar leyes o regulaciones aplicables</li>
                  <li>Publicar contenido ofensivo o inapropiado</li>
                  <li>Interferir con el funcionamiento del servicio</li>
                  <li>Intentar acceder a cuentas de otros usuarios</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  5. Propiedad Intelectual
                </h2>
                <p>
                  Blood Bowl es una marca registrada de Games Workshop Limited. BB Leagues no está afiliado ni respaldado por Games Workshop.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  6. Modificaciones
                </h2>
                <p>
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  7. Contacto
                </h2>
                <p>
                  Para cualquier pregunta sobre estos términos, contáctanos en info@bbleagues.com
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

export default Terms;
