import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const PrivacyPolicy = () => {
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
              Política de Privacidad
            </h1>

            <div className="prose prose-sm max-w-none space-y-6 text-foreground">
              <p className="text-muted-foreground">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  1. Información que Recopilamos
                </h2>
                <p>
                  Recopilamos información que nos proporcionas directamente, como:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Nombre y dirección de correo electrónico</li>
                  <li>Información del perfil de usuario</li>
                  <li>Datos de equipos y partidos</li>
                  <li>Contenido que publicas en los foros</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  2. Uso de la Información
                </h2>
                <p>
                  Utilizamos la información recopilada para:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Proporcionar y mantener el servicio</li>
                  <li>Enviar notificaciones sobre partidos y ligas</li>
                  <li>Mejorar nuestro servicio</li>
                  <li>Responder a tus consultas</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  3. Compartir Información
                </h2>
                <p>
                  No vendemos ni compartimos tu información personal con terceros, excepto cuando sea necesario para proporcionar el servicio o cumplir con obligaciones legales.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  4. Seguridad
                </h2>
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración o destrucción.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  5. Tus Derechos
                </h2>
                <p>
                  Tienes derecho a:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Acceder a tus datos personales</li>
                  <li>Rectificar datos incorrectos</li>
                  <li>Solicitar la eliminación de tus datos</li>
                  <li>Oponerte al procesamiento de tus datos</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  6. Contacto
                </h2>
                <p>
                  Para ejercer tus derechos o cualquier consulta sobre privacidad, contáctanos en privacidad@bbleagues.com
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

export default PrivacyPolicy;
