import type { Metadata } from "next";
import styles from "./privacy.module.css";

const title = "Política de Tratamiento de Datos Personales y Privacidad";
const description = "Responsable, finalidades, derechos y canales de atención para el tratamiento de datos personales en Nido Canino, Colombia.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/privacidad" },
  openGraph: { title, description, url: "/privacidad", type: "website", locale: "es_CO" },
  twitter: { card: "summary", title, description },
};

const sections = [
  ["responsable", "Identificación del responsable"], ["alcance", "Alcance"],
  ["datos", "Datos que puede tratar Nido"], ["finalidades", "Finalidades"],
  ["encargados", "Proveedores y encargados"], ["autorizacion", "Autorización"],
  ["sensibles", "Datos sensibles"], ["menores", "Menores de edad"],
  ["derechos", "Derechos de los titulares"], ["canales", "Canal de atención"],
  ["consultas", "Procedimiento para consultas"], ["reclamos", "Procedimiento para reclamos"],
  ["seguridad", "Seguridad"], ["conservacion", "Conservación"],
  ["cambios", "Cambios en la política"], ["vigencia", "Vigencia"],
] as const;

function ContactDetails() {
  return <address>
    <p>Calle 23D No. 72B-20, Bogotá D.C., Colombia.</p>
    <p>Teléfono: <a href="tel:+573124611816">+57 312 461 1816</a>.</p>
    <p>Correo de privacidad: <a href="mailto:bienestar@nidocanino.org">bienestar@nidocanino.org</a>.</p>
  </address>;
}

export default function PrivacyPage() {
  return <main className={styles.page}>
    <article className={styles.document} aria-labelledby="privacy-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Nido Canino · Protección de datos</p>
        <h1 id="privacy-title">{title}</h1>
        <dl className={styles.version}>
          <div><dt>Código</dt><dd>NIDO-PDP</dd></div>
          <div><dt>Versión</dt><dd>1.0</dd></div>
          <div><dt>Entrada en vigencia</dt><dd><time dateTime="2026-09-02">2 de septiembre de 2026</time></dd></div>
        </dl>
        <p className={styles.identifier}>Identificador de esta versión: NIDO-PDP-1.0-2026-09-02</p>
        <p>Esta política explica cómo Nido Canino recolecta, almacena, utiliza, comunica y suprime datos personales, y cómo puede ejercer sus derechos.</p>
        <p>Se aplica en Colombia, conforme al artículo 15 de la Constitución Política, la <a href="https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/ley_1581_2012.htm">Ley Estatutaria 1581 de 2012</a>, el <a href="https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/decreto_1074_2015_pr025.htm">Decreto Único Reglamentario 1074 de 2015</a> y las instrucciones aplicables de la Superintendencia de Industria y Comercio (SIC), autoridad de protección de datos personales.</p>
      </header>

      <nav className={styles.contents} aria-label="Contenido de la política">
        <h2>Contenido</h2>
        <ol>{sections.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>
      </nav>

      <section id="responsable" aria-labelledby="responsable-title">
        <h2 id="responsable-title">1. Identificación del responsable</h2>
        <p>Nido Canino es el nombre comercial bajo el cual opera <strong>Alba Lilian Deaza Alfonso</strong>, persona natural, fundadora y responsable del tratamiento de datos personales. Su domicilio es Bogotá D.C., Colombia.</p>
        <ContactDetails />
        <p>Sitio web: <a href="https://nidocanino.org">nidocanino.org</a>.</p>
      </section>

      <section id="alcance" aria-labelledby="alcance-title">
        <h2 id="alcance-title">2. Alcance</h2>
        <p>Esta política protege los datos personales de clientes, potenciales clientes, tutores de mascotas, usuarios del sitio, representantes y contactos de clientes empresariales, proveedores, aliados y personas que se comuniquen con Nido Canino.</p>
        <p>Cuando una empresa sea cliente, los datos personales de sus representantes, empleados y contactos también están protegidos. La política comprende información recibida por formularios, comunicaciones y otros medios necesarios para la relación con Nido.</p>
      </section>

      <section id="datos" aria-labelledby="datos-title">
        <h2 id="datos-title">3. Datos que puede tratar Nido</h2>
        <p>La información solicitada depende de la relación y de lo necesario para cada servicio. No todos los datos se solicitan a todas las personas.</p>
        <p>El tratamiento podrá realizarse por medios manuales y automatizados e incluir, según corresponda, la recolección, almacenamiento, organización, actualización, consulta, uso, circulación, transmisión y supresión de la información.</p>
        <ul>
          <li><strong>Identificación y contacto:</strong> nombre, teléfono, correo electrónico, dirección, localidad o zona e identificación cuando sea necesaria para contratar o cumplir obligaciones legales. No se solicita un documento de identidad en todos los casos.</li>
          <li><strong>Datos contractuales y administrativos:</strong> solicitudes, reservas, servicios contratados, comunicaciones, soportes e información necesaria para ejecutar la relación comercial.</li>
          <li><strong>Información de mascotas:</strong> nombre, especie, edad, raza o tipo, sexo, esterilización, tamaño o peso cuando corresponda, comportamiento, compatibilidad, rutinas, alimentación, necesidades de cuidado, medicamentos, condiciones o antecedentes veterinarios y documentos sanitarios o veterinarios cuando sean necesarios.</li>
          <li><strong>Datos digitales:</strong> información proporcionada mediante formularios, fecha y hora, página de origen, parámetros UTM o campaña, página de referencia (referrer) y datos técnicos razonablemente necesarios para seguridad, funcionamiento y atribución de solicitudes.</li>
        </ul>
        <p>La información veterinaria de las mascotas se maneja confidencialmente como información operacional del servicio. No se considera automáticamente un dato sensible de salud humana. Cuando esta información esté asociada a un tutor identificable, se protege también esa vinculación.</p>
      </section>

      <section id="finalidades" aria-labelledby="finalidades-title">
        <h2 id="finalidades-title">4. Finalidades</h2>
        <p>Nido trata los datos exclusivamente para las siguientes finalidades relacionadas legítimamente con su operación, según la relación con cada titular:</p>
        <ul>
          <li>Recibir y evaluar solicitudes, verificar compatibilidad con el modelo de cuidado, contactar al interesado y elaborar y comunicar cotizaciones.</li>
          <li>Gestionar adaptaciones, evaluaciones, reservas y prestación de servicios.</li>
          <li>Cuidar adecuadamente a las mascotas y administrar sus necesidades particulares de salud, alimentación, comportamiento o medicación.</li>
          <li>Comunicarse con el tutor o contacto autorizado y coordinar atención veterinaria o situaciones de emergencia cuando corresponda.</li>
          <li>Celebrar, ejecutar y administrar contratos, así como realizar gestiones administrativas y de pago.</li>
          <li>Mantener historial operacional y trazabilidad de los servicios.</li>
          <li>Atender consultas, peticiones y reclamos y cumplir obligaciones legales.</li>
          <li>Prevenir fraude, abuso o riesgos de seguridad.</li>
          <li>Realizar análisis internos sobre solicitudes, fuentes de adquisición, calidad y funcionamiento de los servicios.</li>
        </ul>
        <p>Estas finalidades no autorizan la venta de bases de datos ni la publicidad de terceros.</p>
      </section>

      <section id="encargados" aria-labelledby="encargados-title">
        <h2 id="encargados-title">5. Proveedores y encargados</h2>
        <p>Nido no vende, alquila ni comercializa datos personales, ni los entrega para publicidad propia de terceros.</p>
        <p>Puede utilizar proveedores tecnológicos o profesionales como encargados para alojamiento, bases de datos, CRM o gestión operativa, comunicaciones, seguridad, soporte tecnológico y servicios necesarios para la operación. Su acceso debe limitarse a lo necesario, conforme a las instrucciones y finalidades autorizadas de Nido, con obligaciones aplicables de confidencialidad y seguridad.</p>
        <p>Si el tratamiento implica transmisión o transferencia de información dentro o fuera de Colombia, Nido deberá observar los requisitos legales correspondientes; esta política no constituye una autorización ilimitada para compartir datos. Las entregas a autoridades o a otros destinatarios sólo procederán bajo autorización o habilitación legal aplicable.</p>
      </section>

      <section id="autorizacion" aria-labelledby="autorizacion-title">
        <h2 id="autorizacion-title">6. Autorización</h2>
        <p>Salvo las excepciones legales, Nido obtiene autorización previa, informada y verificable antes del tratamiento. Se informan las finalidades, los derechos y los canales para ejercerlos.</p>
        <p>La aceptación expresa mediante formularios electrónicos puede servir como medio de autorización y evidencia. Nido debe conservar evidencia razonable que permita consultar posteriormente la autorización, incluida la versión de la política y la fecha de aceptación cuando se utilice ese mecanismo. El silencio o una casilla marcada por defecto no sustituyen la autorización.</p>
      </section>

      <section id="sensibles" aria-labelledby="sensibles-title">
        <h2 id="sensibles-title">7. Datos sensibles</h2>
        <p>Nido no busca recolectar datos sensibles de personas naturales, como información de salud humana o biométrica, salvo que sean estrictamente necesarios y exista una excepción legal que habilite su tratamiento, incluida la autorización explícita cuando corresponda.</p>
        <p>Si una pregunta versa sobre datos sensibles, se informará esa condición y el carácter facultativo de suministrarlos cuando la ley así lo establezca. No se condicionará el servicio a entregar datos sensibles que no sean legalmente exigibles. Los datos veterinarios de una mascota no se equiparan automáticamente a datos sensibles de salud de una persona.</p>
      </section>

      <section id="menores" aria-labelledby="menores-title">
        <h2 id="menores-title">8. Menores de edad</h2>
        <p>El servicio y los formularios no están orientados a recolectar datos personales de menores. Si excepcionalmente fuera necesario y legalmente admisible tratarlos, se aplicarán las protecciones especiales colombianas, respetando el interés superior y los derechos prevalentes de niños, niñas y adolescentes.</p>
        <p>Se obtendrá la autorización de su representante legal cuando corresponda y se garantizará el derecho del menor a ser escuchado, considerando su madurez y capacidad de comprensión.</p>
      </section>

      <section id="derechos" aria-labelledby="derechos-title">
        <h2 id="derechos-title">9. Derechos de los titulares</h2>
        <p>Como titular de datos personales, puede:</p>
        <ul>
          <li>Conocer, actualizar y rectificar sus datos, incluidos los incompletos, inexactos o tratados sin autorización cuando ésta sea necesaria.</li>
          <li>Solicitar prueba de la autorización, salvo las excepciones legales, y conocer el uso dado a sus datos.</li>
          <li>Acceder gratuitamente a sus datos y presentar consultas y reclamos.</li>
          <li>Solicitar la supresión de datos y revocar la autorización cuando legalmente proceda. Podrán mantenerse los datos sujetos a un deber legal o contractual de conservación.</li>
          <li>Presentar quejas ante la SIC por presuntas infracciones, una vez agotado el trámite de consulta o reclamo ante el responsable o encargado cuando corresponda.</li>
        </ul>
      </section>

      <section id="canales" aria-labelledby="canales-title">
        <h2 id="canales-title">10. Canal de atención</h2>
        <p>La atención corresponde a <strong>Nido Canino — Responsable de Privacidad y Tratamiento de Datos</strong>, a cargo de Alba Lilian Deaza Alfonso.</p>
        <ContactDetails />
        <p>Puede presentar sus solicitudes relacionadas con protección de datos personales mediante cualquiera de los canales indicados.</p>
      </section>

      <section id="consultas" aria-labelledby="consultas-title">
        <h2 id="consultas-title">11. Procedimiento para consultas</h2>
        <p>Puede consultar sus datos por los canales indicados, directamente o mediante quien acredite estar facultado para representarlo. Indique su nombre, la información que desea consultar y un medio para recibir la respuesta. Nido podrá solicitar información razonable para verificar la identidad o representación y evitar entregar datos a personas no autorizadas.</p>
        <p>Las consultas se atienden en un máximo de <strong>10 días hábiles desde su recepción</strong>. Si no fuera posible responder en ese plazo, se informarán los motivos de la demora y la nueva fecha de respuesta, sin superar <strong>5 días hábiles adicionales</strong> al vencimiento del plazo inicial.</p>
      </section>

      <section id="reclamos" aria-labelledby="reclamos-title">
        <h2 id="reclamos-title">12. Procedimiento para reclamos</h2>
        <p>Puede reclamar para corregir, actualizar o suprimir datos, revocar la autorización o informar un presunto incumplimiento. Envíe por los canales indicados su identificación, una descripción de los hechos, su dirección de contacto y los documentos que desee aportar. La verificación de identidad será razonable y proporcional.</p>
        <ul>
          <li>Si faltan datos necesarios, se solicitará completar el reclamo dentro de los <strong>5 días siguientes a su recepción</strong>. Si transcurren <strong>2 meses desde ese requerimiento</strong> sin recibir lo solicitado, se entenderá desistido el reclamo.</li>
          <li>Si quien recibe el reclamo no es competente, lo trasladará a quien corresponda en máximo <strong>2 días hábiles</strong> e informará al interesado.</li>
          <li>Recibido el reclamo completo, se incorporará la indicación <strong>“reclamo en trámite”</strong> y su motivo en la base de datos en máximo <strong>2 días hábiles</strong>, hasta resolverlo.</li>
        </ul>
        <p>El plazo máximo de respuesta es de <strong>15 días hábiles desde el día siguiente a la recepción completa</strong>. Cuando no sea posible atenderlo en ese término, se comunicarán los motivos y la nueva fecha, sin superar <strong>8 días hábiles adicionales</strong> al vencimiento del plazo inicial.</p>
      </section>

      <section id="seguridad" aria-labelledby="seguridad-title">
        <h2 id="seguridad-title">13. Seguridad</h2>
        <p>Nido implementa medidas administrativas, técnicas y organizativas razonables y apropiadas para limitar el acceso, proteger credenciales, controlar permisos y preservar la confidencialidad.</p>
        <p>Estas medidas buscan reducir el riesgo de acceso, pérdida, alteración o divulgación no autorizada y gestionar responsablemente a los proveedores tecnológicos. Ningún sistema ofrece seguridad absoluta; la protección exige revisión y actualización de las medidas según los riesgos.</p>
      </section>

      <section id="conservacion" aria-labelledby="conservacion-title">
        <h2 id="conservacion-title">14. Conservación</h2>
        <p>Los datos se conservan sólo durante el tiempo necesario para prestar el servicio, mantener trazabilidad razonable de la relación, atender obligaciones contractuales o legales, resolver reclamaciones y proteger derechos legítimos de Nido y de los titulares.</p>
        <p>Después se suprimirán, anonimizarán o se limitará su tratamiento cuando corresponda. Las distintas categorías pueden estar sujetas a periodos legales de conservación diferentes; esta política no fija un número general de años para todas ellas.</p>
      </section>

      <section id="cambios" aria-labelledby="cambios-title">
        <h2 id="cambios-title">15. Cambios en la política</h2>
        <p>La versión y la fecha de vigencia se mantendrán visibles en esta página. Los cambios sustanciales se comunicarán oportunamente a los titulares antes de implementarse, por medios adecuados a la relación con Nido, cuando corresponda.</p>
        <p>Si se requiere una nueva autorización por cambios en las finalidades u otras condiciones legalmente relevantes, se solicitará antes del nuevo tratamiento. La actualización del texto no sustituye esa autorización.</p>
      </section>

      <section id="vigencia" aria-labelledby="vigencia-title">
        <h2 id="vigencia-title">16. Vigencia</h2>
        <p>Esta política, código NIDO-PDP, versión 1.0, entra en vigencia el <time dateTime="2026-09-02">2 de septiembre de 2026</time> y permanecerá vigente mientras Nido Canino realice tratamiento de datos personales, sin perjuicio de las actualizaciones que se comuniquen.</p>
        <p>Las bases de datos serán tratadas durante el tiempo necesario para las finalidades y obligaciones aplicables descritas en esta política.</p>
      </section>
    </article>
  </main>;
}
