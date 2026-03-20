import { useEffect } from 'react';

const contentGroups = [
  {
    id: 'internal',
    kicker: 'Internal',
    title: 'Conocimiento interno',
    description: 'Assets editoriales, benchmarks y documentos vivos para uso interno y compartido con contexto.',
    items: [
      {
        title: 'Origins Map',
        description:
          'ICP fase 0: arquetipos, patrones y decisiones accionables construidas sobre historial real de proyectos.',
        href: '/internal/origins-map',
        status: 'Publicado'
      },
      {
        title: "Benchmark CMS's",
        description:
          'Comparativa operativa de CMS para decidir stack por contexto de negocio, complejidad y velocidad de ejecución.',
        href: '/internal/benchmark-cmss',
        status: 'Publicado'
      },
      {
        title: 'Signal Hunter Reports',
        description: 'Próximamente: panel editorial de señales, hipótesis y activaciones semanales.',
        href: null,
        status: 'Próximamente'
      }
    ]
  },
  {
    id: 'proposals',
    kicker: 'Proposals',
    title: 'Propuestas comerciales',
    description: 'Piezas orientadas a cliente con solución, scope, inversión, roadmap y siguiente paso.',
    items: [
      {
        title: 'Tailor Hub x Novo Nordisk',
        description: "Compliance monitoring shouldn't take weeks.",
        href: '/proposals/novo-nordisk-compliance',
        status: 'Borrador'
      }
    ]
  }
];

export default function HubHomePage() {
  useEffect(() => {
    document.title = 'Tailor Content Hub';
  }, []);

  return (
    <main className="hub-shell">
      <header className="hub-header">
        <img className="hub-logo" src="/isotipo-tailor-black.png" alt="Tailor Hub" />
        <p className="hub-kicker">Tailor Hub · Content Hub</p>
        <h1 className="hub-title">Contenidos Estratégicos</h1>
        <p className="hub-subtitle">
          Un único punto de acceso para los documentos vivos de Tailor, separado entre conocimiento interno y
          propuestas comerciales.
        </p>
      </header>

      <div className="hub-groups" aria-label="Arquitectura de contenidos">
        {contentGroups.map((group) => (
          <section className="hub-group" key={group.id} aria-labelledby={`hub-group-${group.id}`}>
            <div className="hub-group-header">
              <p className="hub-group-kicker">{group.kicker}</p>
              <h2 className="hub-group-title" id={`hub-group-${group.id}`}>
                {group.title}
              </h2>
              <p className="hub-group-desc">{group.description}</p>
            </div>

            <div className="hub-list">
              {group.items.map((item) => (
                <article className="hub-card" key={item.title}>
                  <div className="hub-card-top">
                    <span className="hub-status">{item.status}</span>
                  </div>
                  <h3 className="hub-card-title">{item.title}</h3>
                  <p className="hub-card-desc">{item.description}</p>
                  {item.href ? (
                    <a className="hub-card-link" href={item.href}>
                      Abrir contenido
                    </a>
                  ) : (
                    <span className="hub-card-link disabled">Disponible pronto</span>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
