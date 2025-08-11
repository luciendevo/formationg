import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, Award, Target, Briefcase, TrendingUp } from 'react-feather';

interface LandingPageData {
  id: string;
  title: string;
  subtitle: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    text: string;
    rating: number;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

const LandingPage: React.FC = () => {
  const { pageId } = useParams();
  const [currentPage, setCurrentPage] = useState<LandingPageData | null>(null);

  // 4+ Landing pages data as requested
  const landingPages: Record<string, LandingPageData> = {
    'formation-web': {
      id: 'formation-web',
      title: 'Formation Développement Web',
      subtitle: 'Devenez développeur web en 3 mois',
      heroTitle: 'Lancez votre carrière dans le développement web',
      heroSubtitle: 'Formation intensive JavaScript, React, Node.js avec accompagnement personnalisé et garantie emploi.',
      ctaText: 'Commencer ma formation',
      features: [
        { title: 'Méthode pratique', description: 'Projets réels dès la première semaine', icon: 'code' },
        { title: 'Accompagnement', description: 'Mentor dédié et suivi personnalisé', icon: 'users' },
        { title: 'Garantie emploi', description: '95% de nos étudiants trouvent un emploi', icon: 'target' }
      ],
      testimonials: [
        { name: 'Marie Dubois', role: 'Développeuse Frontend', company: 'TechCorp', text: 'Formation excellente, j\'ai trouvé un emploi 2 semaines après la fin !', rating: 5 },
        { name: 'Pierre Martin', role: 'Full Stack Developer', company: 'StartupXYZ', text: 'Les projets pratiques m\'ont vraiment préparé au monde professionnel.', rating: 5 }
      ],
      stats: [
        { value: '95%', label: 'Taux d\'emploi' },
        { value: '3 mois', label: 'Durée formation' },
        { value: '2500+', label: 'Diplômés' }
      ]
    },
    'formation-data': {
      id: 'formation-data',
      title: 'Formation Data Science',
      subtitle: 'Maîtrisez l\'IA et l\'analyse de données',
      heroTitle: 'Devenez expert en Data Science et Intelligence Artificielle',
      heroSubtitle: 'Formation complète Python, Machine Learning, Deep Learning avec projets concrets et certification.',
      ctaText: 'Découvrir le programme',
      features: [
        { title: 'Python & ML', description: 'Maîtrise complète des outils essentiels', icon: 'trending-up' },
        { title: 'Projets réels', description: 'Cas d\'usage entreprise authentiques', icon: 'briefcase' },
        { title: 'Certification', description: 'Diplôme reconnu par les entreprises', icon: 'award' }
      ],
      testimonials: [
        { name: 'Sophie Laurent', role: 'Data Scientist', company: 'BigData Corp', text: 'La formation la plus complète que j\'ai suivie. Très pratique !', rating: 5 },
        { name: 'Thomas Bernard', role: 'ML Engineer', company: 'AI Solutions', text: 'Excellent accompagnement et projets très formateurs.', rating: 5 }
      ],
      stats: [
        { value: '92%', label: 'Taux de réussite' },
        { value: '4 mois', label: 'Formation intensive' },
        { value: '1800+', label: 'Data Scientists formés' }
      ]
    },
    'formation-marketing': {
      id: 'formation-marketing',
      title: 'Formation Marketing Digital',
      subtitle: 'Expertise complète en marketing numérique',
      heroTitle: 'Maîtrisez tous les leviers du marketing digital',
      heroSubtitle: 'SEO, SEA, Social Media, Analytics : devenez un expert du marketing digital avec notre formation certifiante.',
      ctaText: 'Booster ma carrière',
      features: [
        { title: 'Multi-canal', description: 'Tous les leviers digitaux maîtrisés', icon: 'target' },
        { title: 'Outils pro', description: 'Google Ads, Analytics, Facebook Business', icon: 'trending-up' },
        { title: 'ROI mesurable', description: 'Apprenez à mesurer vos performances', icon: 'award' }
      ],
      testimonials: [
        { name: 'Julie Moreau', role: 'Digital Marketing Manager', company: 'E-commerce Plus', text: 'Formation très complète qui m\'a permis d\'évoluer rapidement !', rating: 5 },
        { name: 'Alexandre Petit', role: 'Growth Hacker', company: 'Scale-up Inc', text: 'Les cas pratiques sont excellents, très proche de la réalité.', rating: 5 }
      ],
      stats: [
        { value: '89%', label: 'Évolution salariale' },
        { value: '2 mois', label: 'Formation accélérée' },
        { value: '3200+', label: 'Marketeurs formés' }
      ]
    },
    'formation-management': {
      id: 'formation-management',
      title: 'Formation Management',
      subtitle: 'Leadership et gestion d\'équipe',
      heroTitle: 'Développez vos compétences de leader',
      heroSubtitle: 'Formation management moderne : leadership, gestion d\'équipe, communication et performance collective.',
      ctaText: 'Devenir un leader',
      features: [
        { title: 'Leadership', description: 'Techniques de management modernes', icon: 'users' },
        { title: 'Communication', description: 'Maîtrise de la communication d\'équipe', icon: 'briefcase' },
        { title: 'Performance', description: 'Optimisation des résultats collectifs', icon: 'trending-up' }
      ],
      testimonials: [
        { name: 'Caroline Durand', role: 'Directrice Commerciale', company: 'Sales Corp', text: 'Cette formation a transformé ma façon de manager. Résultats immédiats !', rating: 5 },
        { name: 'Fabien Rousseau', role: 'Chef de Projet', company: 'Consulting Pro', text: 'Outils concrets et méthodes efficaces. Je recommande vivement.', rating: 5 }
      ],
      stats: [
        { value: '96%', label: 'Satisfaction' },
        { value: '6 semaines', label: 'Programme intensif' },
        { value: '1500+', label: 'Managers formés' }
      ]
    },
    'default': {
      id: 'default',
      title: 'Formation G - Formation G France 2022',
      subtitle: 'Votre partenaire formation professionnelle',
      heroTitle: 'Transformez votre carrière avec Formation G',
      heroSubtitle: 'Formations certifiantes, accompagnement personnalisé et garantie emploi. Plus de 50 formations disponibles.',
      ctaText: 'Découvrir nos formations',
      features: [
        { title: '50+ Formations', description: 'Large choix de formations certifiantes', icon: 'award' },
        { title: 'CPF Éligible', description: 'Financez avec vos droits formation', icon: 'briefcase' },
        { title: 'Accompagnement', description: 'Suivi personnalisé jusqu\'à l\'emploi', icon: 'users' }
      ],
      testimonials: [
        { name: 'Emma Leroy', role: 'Consultante RH', company: 'HR Solutions', text: 'Formation G m\'a permis de réussir ma reconversion professionnelle !', rating: 5 },
        { name: 'Nicolas Blanc', role: 'Chef de Projet Digital', company: 'Digital Agency', text: 'Accompagnement exceptionnel et formation de qualité.', rating: 5 },
        { name: 'Amélie Garcia', role: 'Data Analyst', company: 'Analytics Pro', text: 'Grâce à Formation G, j\'ai trouvé le métier de mes rêves.', rating: 5 }
      ],
      stats: [
        { value: '5000+', label: 'Étudiants formés' },
        { value: '93%', label: 'Taux de réussite' },
        { value: '50+', label: 'Formations disponibles' }
      ]
    }
  };

  useEffect(() => {
    const page = pageId ? landingPages[pageId] : landingPages['default'];
    setCurrentPage(page || landingPages['default']);
  }, [pageId]);

  if (!currentPage) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'users': return <Users className="w-8 h-8" />;
      case 'award': return <Award className="w-8 h-8" />;
      case 'target': return <Target className="w-8 h-8" />;
      case 'briefcase': return <Briefcase className="w-8 h-8" />;
      case 'trending-up': return <TrendingUp className="w-8 h-8" />;
      default: return <CheckCircle className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-light)' }}>
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: 'var(--border-light)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" 
                   style={{ backgroundColor: 'var(--primary-blue)' }}>
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--text-dark)' }}>
                  Formation G
                </h1>
                <p className="text-sm" style={{ color: 'var(--text-light)' }}>
                  France 2022
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/login" className="btn btn-outline">
                Se connecter
              </Link>
              <Link to="/login" className="btn btn-primary">
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--background-white)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--text-dark)' }}>
            {currentPage.heroTitle}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: 'var(--text-light)' }}>
            {currentPage.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/login" className="btn btn-primary text-lg px-8 py-4">
              {currentPage.ctaText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <button className="btn btn-outline text-lg px-8 py-4">
              Voir le programme
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {currentPage.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: 'var(--primary-blue)' }}>
                  {stat.value}
                </div>
                <div className="text-lg" style={{ color: 'var(--text-light)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--secondary-grey)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
              Pourquoi choisir Formation G ?
            </h2>
            <p className="text-xl" style={{ color: 'var(--text-light)' }}>
              Une approche moderne et efficace de la formation professionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentPage.features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="card-body">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center" 
                       style={{ backgroundColor: 'rgba(47, 128, 237, 0.1)' }}>
                    <div style={{ color: 'var(--primary-blue)' }}>
                      {getIcon(feature.icon)}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-dark)' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: 'var(--text-light)' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--background-white)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
              Témoignages de nos étudiants
            </h2>
            <p className="text-xl" style={{ color: 'var(--text-light)' }}>
              Découvrez les success stories de nos anciens étudiants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPage.testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" style={{ color: 'var(--warning-yellow)' }} />
                    ))}
                  </div>
                  <p className="mb-4 italic" style={{ color: 'var(--text-light)' }}>
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold" style={{ color: 'var(--text-dark)' }}>
                      {testimonial.name}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-light)' }}>
                      {testimonial.role} chez {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--primary-blue)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à transformer votre carrière ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez les milliers de professionnels qui ont fait confiance à Formation G
          </p>
          <Link to="/login" className="btn bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
            Commencer maintenant
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 mr-2" />
                <span className="text-lg font-bold">Formation G</span>
              </div>
              <p className="text-gray-400">
                Votre partenaire formation professionnelle depuis 2022
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Formations</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/landing/formation-web" className="hover:text-white">Développement Web</Link></li>
                <li><Link to="/landing/formation-data" className="hover:text-white">Data Science</Link></li>
                <li><Link to="/landing/formation-marketing" className="hover:text-white">Marketing Digital</Link></li>
                <li><Link to="/landing/formation-management" className="hover:text-white">Management</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Aide</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Mentions légales</a></li>
                <li><a href="#" className="hover:text-white">RGPD</a></li>
                <li><a href="#" className="hover:text-white">CGV</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2022 Formation G France. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
