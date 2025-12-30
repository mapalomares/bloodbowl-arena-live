import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const ServiceTerms = () => {
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
              Términos de Servicio
            </h1>

            <div className="prose prose-sm max-w-none space-y-6 text-foreground">
              <p className="text-muted-foreground">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  1. Acuerdo de Servicio
                </h2>
                <p>
                  Este acuerdo establece los términos bajo los cuales BB Leagues proporciona sus servicios de gestión de ligas de Blood Bowl.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  2. Niveles de Servicio
                </h2>
                <p>
                  BB Leagues ofrece diferentes niveles de acceso:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Usuario Básico:</strong> Acceso a funciones básicas de consulta</li>
                  <li><strong>Entrenador:</strong> Gestión de equipos y registro de partidos</li>
                  <li><strong>Comisario:</strong> Administración de ligas y torneos</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  3. Disponibilidad
                </h2>
                <p>
                  Nos esforzamos por mantener el servicio disponible 24/7, pero no garantizamos disponibilidad ininterrumpida. Pueden ocurrir períodos de mantenimiento programado.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  4. Responsabilidades del Usuario
                </h2>
                <p>
                  Como usuario, te comprometes a:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Mantener la confidencialidad de tu cuenta</li>
                  <li>Reportar actividades sospechosas</li>
                  <li>Proporcionar información precisa en actas de partidos</li>
                  <li>Respetar a otros usuarios de la comunidad</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  5. Limitación de Responsabilidad
                </h2>
                <p>
                  BB Leagues no será responsable por pérdidas indirectas, incidentales o consecuentes derivadas del uso del servicio.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  6. Terminación
                </h2>
                <p>
                  Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos, con o sin previo aviso según la gravedad de la infracción.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  7. Soporte
                </h2>
                <p>
                  Proporcionamos soporte a través de nuestro formulario de contacto y correo electrónico. El tiempo de respuesta puede variar según la demanda.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  8. Contacto
                </h2>
                <p>
                  Para consultas sobre estos términos de servicio, contáctanos en soporte@bbleagues.com
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

export default ServiceTerms;
