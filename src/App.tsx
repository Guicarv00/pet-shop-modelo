import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Award, 
  Clock, 
  Shield, 
  Menu, 
  X, 
  ChevronDown, 
  Star, 
  Scissors, 
  Droplet, 
  Sparkles, 
  Phone, 
  ArrowRight, 
  Check, 
  MapPin, 
  Calendar, 
  Volume2 as VolumeX,
  Instagram,
  Facebook
} from 'lucide-react';
import { BENTO_ITEMS, SERVICES, TESTIMONIALS, FAQ_ITEMS } from './data';
import { Service } from './types';

export default function App() {
  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Services filtering state
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'spa' | 'grooming' | 'care'>('all');

  // Testimonials Carousel State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // FAQ Accordion State (stores opened ID or null)
  const [openedFaq, setOpenedFaq] = useState<string | null>('faq-1');

  // Booking Calculator States
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [petSize, setPetSize] = useState<'pequeno' | 'medio' | 'grande'>('medio');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('srv-1');
  const [addons, setAddons] = useState<{ id: string; name: string; price: number; selected: boolean }[]>([
    { id: 'add-1', name: 'Escovação de dentes com gel refrescante', price: 25, selected: false },
    { id: 'add-2', name: 'Perfume importado de longa duração', price: 15, selected: false },
    { id: 'add-3', name: 'Corte de unha com acabamento polido', price: 30, selected: false },
    { id: 'add-4', name: 'Máscara Hidratante de Ouro 24k Pet', price: 40, selected: false }
  ]);

  // Toast / Status state for interactive booking action
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Scroll spy to update active navigation state
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'services', 'simulator', 'testimonials', 'faq'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAddon = (id: string) => {
    setAddons(prev => prev.map(add => add.id === id ? { ...add, selected: !add.selected } : add));
  };

  // Service calculation logic
  const selectedService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];
  
  // Calculate size multiplier
  const sizeMultiplier = petSize === 'pequeno' ? 0.9 : petSize === 'grande' ? 1.3 : 1.0;
  const baseServicePrice = Math.round(selectedService.basePrice * sizeMultiplier);
  const addonsTotal = addons.reduce((sum, current) => current.selected ? sum + current.price : sum, 0);
  const calculatedTotal = baseServicePrice + addonsTotal;

  // Generate WhatsApp text & link
  const getWhatsAppLink = () => {
    const addonNames = addons.filter(a => a.selected).map(a => a.name).join(', ');
    const text = `Olá, L'Étoile Pet Spa! Gostaria d agendar um horário exclusivo para o meu pet. 
- Pet: ${petType === 'dog' ? 'Cão' : 'Gato'} (${petSize})
- Serviço Principal: ${selectedService.title}
- Adicionais: ${addonNames ? addonNames : 'Nenhum'}
- Estimativa total: R$ ${calculatedTotal},00

Por favor, verifiquem os horários disponíveis!`;
    return `https://api.whatsapp.com/send?phone=5511999999999&text=${encodeURIComponent(text)}`;
  };

  const filteredServices = selectedCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === selectedCategory);

  // Helper for Bento icons
  const renderBentoIcon = (name: string, accentColor?: string) => {
    const props = { className: "w-8 h-8", style: { color: accentColor || '#DCA342' } };
    switch (name) {
      case 'Heart': return <Heart {...props} />;
      case 'Award': return <Award {...props} />;
      case 'Clock': return <Clock {...props} />;
      case 'VolumeX': return <VolumeX {...props} />;
      case 'Shield': return <Shield {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4EBE1] font-sans antialiased selection:bg-brand-gold selection:text-[#0A0A0A] relative">
      
      {/* GLOW DECORATIONS */}
      <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-brand-gold/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[100vh] right-1/4 w-[50rem] h-[50rem] rounded-full bg-gradient-to-br from-brand-teal/5 to-transparent blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10vh] left-10 w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-brand-gold/5 to-transparent blur-[120px] pointer-events-none" />

      {/* HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-brand-beige/5 glass-panel">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center space-x-3 group">
            <span className="p-2 py-1 bg-brand-gold text-[#0A0A0A] rounded-lg font-display font-extrabold text-sm tracking-widest group-hover:bg-[#E8AF4F] transition-colors">
              L'ÉTOILE
            </span>
            <span className="font-display text-lg tracking-wider font-semibold hover:text-brand-gold transition-colors">
              PET SPA
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { id: 'features', label: 'Diferenciais' },
              { id: 'services', label: 'Especialidades' },
              { id: 'simulator', label: 'Simulador' },
              { id: 'testimonials', label: 'Depoimentos' },
              { id: 'faq', label: 'FAQ' },
            ].map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-sm tracking-wide transition-colors relative py-2 ${
                  activeSection === link.id ? 'text-brand-gold font-medium' : 'text-brand-beige/70 hover:text-brand-beige'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold"
                    transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Premium CTA Header button */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="#simulator"
              className="px-5 py-2.5 rounded-full bg-transparent border border-brand-beige/20 text-xs font-semibold tracking-wider hover:bg-brand-beige/5 hover:border-brand-beige/40 transition-all duration-200"
            >
              Simular Preço
            </a>
            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-brand-gold text-[#0A0A0A] text-xs font-bold tracking-wider hover:bg-[#E8AF4F] transition-all duration-200 flex items-center space-x-2 shadow-lg shadow-brand-gold/10"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>Agendar Horário</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-brand-beige/80 hover:text-brand-beige focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -21 }}
            className="fixed inset-0 top-20 bg-[#0A0A0A] z-40 px-6 py-8 flex flex-col justify-between border-t border-brand-beige/5 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {[
                { id: 'features', label: 'Nossos Diferenciais' },
                { id: 'services', label: 'Especialidades & Spa' },
                { id: 'simulator', label: 'Simulador de Atendimento' },
                { id: 'testimonials', label: 'Depoimentos dos Pais' },
                { id: 'faq', label: 'Perguntas Frequentes' },
              ].map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-display tracking-wide border-b border-brand-beige/5 pb-3 text-brand-beige/90 hover:text-brand-gold transition-colors block"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col space-y-4">
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-4 bg-brand-gold text-[#0A0A0A] rounded-xl font-bold tracking-wider flex items-center justify-center space-x-3"
              >
                <Phone className="w-4 h-4 fill-current animate-pulse" />
                <span>Conversar no WhatsApp</span>
              </a>
              <div className="text-center text-xs text-brand-beige/40">
                L'Étoile Pet Spa • Atendimento das 09h às 19h
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        
        {/* ================= HERO SECTION ================= */}
        <section id="hero" className="relative min-h-[90vh] flex items-center px-6 lg:px-12 py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Texts info */}
            <div className="lg:col-span-7 flex flex-col space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/20 px-4 py-1.5 rounded-full w-fit"
              >
                <Sparkles className="w-4 h-4 text-brand-gold animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#E8AF4F]">
                  Estética Pet Altamente Personalizada
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-display font-light text-brand-beige tracking-tight leading-[1.1]"
              >
                O refúgio de <span className="font-serif italic font-normal text-brand-gold">luxo e carinho</span> de verdade que seu pet merece.
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg text-brand-beige/70 max-w-xl font-light leading-relaxed"
              >
                Serviços personalizados de beleza e higienização terapêutica para cães e gatos. Nossos especialistas combinam técnicas exclusivas sem estresse à alta cosmética internacional.
              </motion.p>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
              >
                <a 
                  href="#simulator"
                  className="px-8 py-4 rounded-full bg-brand-gold text-[#0A0A0A] font-bold tracking-wider hover:bg-[#E8AF4F] transition-all duration-300 text-center flex items-center justify-center space-x-3 shadow-xl shadow-brand-gold/20"
                >
                  <span>Simulador de Banho & Tosa</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-8 py-4 rounded-full border border-brand-beige/20 text-[#F4EBE1] font-semibold tracking-wider hover:bg-brand-beige/5 hover:border-brand-beige/40 transition-all duration-300 text-center"
                >
                  Falar via WhatsApp
                </a>
              </motion.div>

              {/* Small credentials info */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center space-x-8 pt-6 border-t border-brand-beige/5 text-xs text-brand-beige/45 mt-4"
              >
                <div className="flex items-center space-x-1">
                  <span className="text-brand-gold text-lg">★</span>
                  <span className="text-brand-gold text-lg">★</span>
                  <span className="text-brand-gold text-lg">★</span>
                  <span className="text-brand-gold text-lg">★</span>
                  <span className="text-brand-gold text-lg">★</span>
                  <span className="ml-2 font-medium text-brand-beige/80">4.9/5 Estrelas no Google Recensões</span>
                </div>
                <span>• Atendimento Jardins, SP</span>
              </motion.div>
            </div>

            {/* Right Cinematic Pet Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden border border-brand-beige/10 shadow-2xl group">
                {/* Radial Glow on top of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/30 via-transparent to-[#0A0A0A]/30 z-10" />
                <div className="absolute inset-0 bg-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                
                {/* Pet Image */}
                <img 
                  src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800" 
                  alt="Golden Retriever Grooming" 
                  className="w-full h-full object-cover transform scale-102 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Micro UI Item */}
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-2xl z-20 flex items-center justify-between border border-brand-beige/15 backdrop-blur-md">
                  <div className="flex items-center space-x-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
                    <div>
                      <h4 className="text-xs font-bold font-display tracking-wide uppercase">Dermatologia & Spa</h4>
                      <p className="text-[10px] text-brand-beige/50">Cosmética Pet Vegana Importada</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-gold font-mono">100% SEGURO</span>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ================= MARQUEE / AUTHORITY FAIXA ================= */}
        <section className="bg-brand-card/30 py-8 border-y border-brand-beige/5 overflow-hidden">
          <div className="w-full flex whitespace-nowrap overflow-hidden">
            <div className="animate-marquee flex items-center space-x-12 shrink-0">
              {[
                "100% AMOR & CARINHO", "PROTOCOLO NO-STRESS", "PRODUTOS IMPORTADOS", "AMBIENTE SANITIZADO", "EQUIPE DE VISAGISTAS CERTIFICADOS", "ATENDIMENTO VIP",
                "100% AMOR & CARINHO", "PROTOCOLO NO-STRESS", "PRODUTOS IMPORTADOS", "AMBIENTE SANITIZADO", "EQUIPE DE VISAGISTAS CERTIFICADOS", "ATENDIMENTO VIP",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <span className="text-xs font-display tracking-widest font-bold text-brand-beige/60 uppercase">{text}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DCA342]" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= DIFERENCIAIS (BENTO GRID) ================= */}
        <section id="features" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="text-xs tracking-widest font-bold text-brand-gold uppercase">POR QUE SOMOS A ESCOLHA FAVORITA?</span>
            <h2 className="text-3xl sm:text-5xl font-display font-light tracking-tight text-brand-beige leading-tight">
              Excelência estelar com o afeto de uma <span className="font-serif italic text-brand-gold">Maison acolhedora</span>.
            </h2>
            <p className="text-sm sm:text-base text-brand-beige/60 leading-relaxed max-w-xl">
              Nossa estrutura e processos foram desenhados delicadamente para entregar segurança impecável e sensibilidade estética que destaca a felicidade do seu pet.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[16rem]">
            {BENTO_ITEMS.map((item) => (
              <div 
                key={item.id} 
                className={`${item.sizeClass} relative hover:border-brand-gold/30 transition-all duration-300`}
              >
                {item.image && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/40 z-10" />
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0"
                      referrerPolicy="no-referrer"
                    />
                  </>
                )}
                {/* Grid card content wrapper to absolute align inside sizes if flex height varies */}
                <div className="flex flex-col justify-between h-full space-y-6 relative z-20">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-brand-beige/5 rounded-2xl w-fit group-hover:scale-105 transition-transform">
                      {renderBentoIcon(item.iconName, item.accentColor)}
                    </div>
                    {item.badge && (
                      <span className="text-[10px] tracking-widest uppercase px-3 py-1 bg-brand-gold/10 text-brand-gold rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                    <p className="text-xs text-brand-beige/60 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= BIOGRAFIA / FILOSOFIA RESUMIDA ================= */}
        <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto bg-brand-card/25 border border-brand-beige/5 rounded-[2.5rem] relative overflow-hidden my-12">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden border border-brand-beige/10 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent" />
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800" 
                alt="Amor e Cuidado com os Pets" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col space-y-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#DCA342]">Nossa Filosofia</span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
                "Não é apenas sobre estética. É sobre carinho, respeito e bem-estar mútuo."
              </h2>
              <p className="text-sm text-brand-beige/70 leading-relaxed">
                A L'Étoile Pet Spa nasceu da união entre a paixão inestimável pelos animais e a carência de espaços verdadeiramente comprometidos com a saúde e a paz emocional dos pets durante os procedimentos de banho e tosa.
              </p>
              <p className="text-sm text-brand-beige/60 leading-relaxed">
                Cada cão ou gato que entra em nossa Maison passa por uma avaliação dermatológica sutil. Desenvolvemos diagnósticos rápidos para aplicar apenas o tratamento ideal, utilizando os cosméticos corretos de forma a manter a integridade da pelagem exuberante.
              </p>

              {/* Authority mini markers */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-brand-gold/10 rounded-full">
                    <Check className="w-3.5 h-3.5 text-brand-gold" />
                  </div>
                  <span className="text-xs font-semibold text-brand-beige/90">Zero contenção mecânica dolorida</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-brand-gold/10 rounded-full">
                    <Check className="w-3.5 h-3.5 text-brand-gold" />
                  </div>
                  <span className="text-xs font-semibold text-brand-beige/90">Água termal ozonizada</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-brand-gold/10 rounded-full">
                    <Check className="w-3.5 h-3.5 text-brand-gold" />
                  </div>
                  <span className="text-xs font-semibold text-brand-beige/90">Aromaterapia Relaxante</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-brand-gold/10 rounded-full">
                    <Check className="w-3.5 h-3.5 text-brand-gold" />
                  </div>
                  <span className="text-xs font-semibold text-brand-beige/90">Salas limpas com UV-C</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= ESTETICIDADES (SERVIÇOS) ================= */}
        <section id="services" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl flex flex-col space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#DCA342]">NOSSOS TRATAMENTOS DE ELITE</span>
              <h2 className="text-3xl sm:text-5xl font-display font-light tracking-tight text-brand-beige">Especialidades & <span className="font-serif italic text-brand-gold">Rituais Terapêuticos</span></h2>
              <p className="text-xs sm:text-sm text-brand-beige/60">
                Explore os tratamentos especializados que promovem higienização impecável, perfume elegante e proteção dermatológica ativa de alta performance.
              </p>
            </div>

            {/* Filter Pill items */}
            <div className="flex flex-wrap gap-2 shrink-0">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'spa', label: 'Spa Ozonizado' },
                { id: 'grooming', label: 'Visagismo & Tosa' },
                { id: 'care', label: 'Cuidados Especiais' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-200 ${
                    selectedCategory === cat.id 
                      ? 'bg-brand-gold text-[#0A0A0A]' 
                      : 'bg-brand-beige/5 border border-brand-beige/5 hover:bg-brand-beige/10 hover:border-brand-beige/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredServices.map(srv => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  key={srv.id}
                  className="bg-gradient-to-br from-brand-card to-[#0d0d0d] border border-brand-beige/5 rounded-[2rem] overflow-hidden p-6 hover:border-brand-gold/20 transition-all duration-300 flex flex-col sm:flex-row gap-6 relative"
                >
                  <div className="w-full sm:w-2/5 h-48 sm:h-auto aspect-[4/3] rounded-2xl overflow-hidden border border-brand-beige/5 bg-brand-dark relative shrink-0">
                    <img 
                      src={srv.image} 
                      alt={srv.title} 
                      className="w-full h-full object-cover filter brightness-95" 
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="text-[10px] tracking-widest text-[#DCA342] bg-[#DCA342]/10 px-2.5 py-1 rounded-md uppercase font-extrabold">
                          {srv.category === 'spa' ? 'SPA' : srv.category === 'grooming' ? 'Estética' : 'Tratamento'}
                        </span>
                        <span className="text-xs font-mono text-brand-beige/40 flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          {srv.duration}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-display font-extrabold mb-1">{srv.title}</h3>
                      <p className="text-[11px] text-brand-beige/40 italic mb-2">{srv.subtitle}</p>
                      <p className="text-xs text-brand-beige/60 line-clamp-3 mb-4 leading-relaxed">{srv.description}</p>
                    </div>

                    <div className="pt-4 border-t border-brand-beige/5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-brand-beige/40 block">Valor base</span>
                        <span className="text-lg font-display font-bold text-brand-gold">R$ {srv.basePrice},00</span>
                      </div>
                      <a 
                        href="#simulator" 
                        onClick={() => {
                          setSelectedServiceId(srv.id);
                          document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="p-2 py-1.5 rounded-lg bg-brand-beige/5 hover:bg-brand-gold hover:text-[#0A0A0A] transition-colors text-xs font-bold text-brand-beige"
                      >
                        Simular
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ================= INTERACTIVE SIMULATOR (BOOKING VALUE CALC) ================= */}
        <section id="simulator" className="py-24 px-6 lg:px-12 bg-gradient-to-b from-[#0A0A0A] via-brand-card/30 to-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-gold">SIMULADOR INTELIGENTE</span>
              <h2 className="text-3xl sm:text-5xl font-display font-light tracking-tight">Estimar o <span className="font-serif italic text-brand-gold">Ritual do seu Pet</span></h2>
              <p className="text-sm text-brand-beige/60 leading-relaxed">
                Selecione as particularidades do seu bichinho e adicione tratamentos especiais para gerar instantaneamente uma estimativa e agendar via WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Simulator Options Column */}
              <div className="lg:col-span-7 bg-brand-card/50 border border-brand-beige/10 p-8 rounded-[2rem] space-y-8 glass-panel">
                
                {/* 1. Pet Type selection */}
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-wider text-brand-gold font-bold">1. Tipo do Pet</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPetType('dog')}
                      className={`p-4 rounded-xl border text-center font-bold tracking-wide transition-all ${
                        petType === 'dog' 
                          ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' 
                          : 'border-brand-beige/5 bg-brand-beige/5 hover:bg-brand-beige/10 text-brand-beige'
                      }`}
                    >
                      🐶 Cãozinho
                    </button>
                    <button
                      onClick={() => {
                        setPetType('cat');
                        // Cats usually are small/medium, fallback size size restriction if requested
                      }}
                      className={`p-4 rounded-xl border text-center font-bold tracking-wide transition-all ${
                        petType === 'cat' 
                          ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' 
                          : 'border-brand-beige/5 bg-brand-beige/5 hover:bg-brand-beige/10 text-brand-beige'
                      }`}
                    >
                      🐱 Gatinho
                    </button>
                  </div>
                </div>

                {/* 2. Size multiplier */}
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-wider text-brand-gold font-bold">2. Porte / Peso Estimado</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'pequeno', label: 'Pequeno', desc: 'Até 10kg' },
                      { id: 'medio', label: 'Médio', desc: '10kg a 22kg' },
                      { id: 'grande', label: 'Grande', desc: 'Acima de 22kg' }
                    ].map(size => (
                      <button
                        key={size.id}
                        onClick={() => setPetSize(size.id as any)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          petSize === size.id 
                            ? 'border-brand-gold bg-brand-gold/5 text-brand-gold font-bold' 
                            : 'border-brand-beige/5 bg-brand-beige/5 hover:bg-brand-beige/10 text-brand-beige'
                        }`}
                      >
                        <span className="block text-sm">{size.label}</span>
                        <span className="text-[10px] opacity-60 font-light block">{size.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Core service choosing */}
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-wider text-brand-gold font-bold">3. Tratamento Principal</label>
                  <div className="space-y-2.5">
                    {SERVICES.map(srv => (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedServiceId(srv.id)}
                        className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          selectedServiceId === srv.id 
                            ? 'border-brand-gold bg-brand-gold/10' 
                            : 'border-brand-beige/5 bg-brand-beige/5 hover:bg-brand-beige/10'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-1.5 rounded-lg ${selectedServiceId === srv.id ? 'bg-brand-gold text-[#0A0A0A]' : 'bg-brand-beige/12 text-brand-beige/70'}`}>
                            {srv.category === 'spa' ? <Droplet className="w-4 h-4" /> : <Scissors className="w-4 h-4" />}
                          </div>
                          <div>
                            <span className="text-sm font-semibold block">{srv.title}</span>
                            <span className="text-[11px] text-brand-beige/50 font-light block">{srv.subtitle}</span>
                          </div>
                        </div>

                        <span className="text-sm font-mono text-brand-gold font-bold">R$ {srv.basePrice},00</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Addons */}
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-wider text-brand-gold font-bold">4. Ritual de Adicionais (Opcional)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addons.map(add => (
                      <div
                        key={add.id}
                        onClick={() => handleToggleAddon(add.id)}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          add.selected 
                            ? 'border-brand-teal bg-brand-teal/5 text-brand-teal' 
                            : 'border-brand-beige/5 bg-brand-beige/5 hover:bg-brand-beige/10 text-brand-beige'
                        }`}
                      >
                        <span className="text-[11px] flex-1 pr-2 leading-relaxed">{add.name}</span>
                        <div className="flex items-center space-x-2 shrink-0">
                          <span className="text-xs font-mono font-bold">+ R$ {add.price}</span>
                          <div className={`w-4 py-0.5 h-4 rounded border flex items-center justify-center ${
                            add.selected ? 'border-brand-teal bg-brand-teal text-[#0A0A0A]' : 'border-brand-beige/20'
                          }`}>
                            {add.selected && <Check className="w-3 h-3 text-[1px] font-bold" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Estimate Receipt Column */}
              <div className="lg:col-span-5 bg-brand-card border border-brand-beige/15 rounded-[2rem] p-8 space-y-6 sticky top-28 shadow-2xl">
                <span className="text-xs tracking-widest uppercase font-extrabold text-brand-gold">Seu Ritual Escolhido</span>
                
                <div className="space-y-4 pt-2">
                  <div className="flex items-center space-x-2.5 pb-2">
                    <span className="p-2 py-1 bg-brand-beige/5 font-mono text-sm leading-none rounded-lg text-brand-gold font-extrabold uppercase shrink-0">
                      R$ ESTIMADO
                    </span>
                    <span className="font-display font-bold text-lg text-brand-beige">Maison L'Étoile</span>
                  </div>

                  {/* Summary bill items */}
                  <div className="space-y-2.5 text-xs text-brand-beige/70">
                    <div className="flex justify-between">
                      <span>Serviço base ({selectedService.title})</span>
                      <span className="font-mono">R$ {selectedService.basePrice},00</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Multiplicador de Porte ({petSize === 'pequeno' ? 'Pequeno: x0.9' : petSize === 'grande' ? 'Grande: x1.3' : 'Médio: x1.0'})</span>
                      <span className="font-mono text-brand-gold">
                        R$ {Math.round(selectedService.basePrice * sizeMultiplier)},00 (ajustado)
                      </span>
                    </div>

                    {/* Show selected addons */}
                    {addons.filter(a => a.selected).map(a => (
                      <div key={a.id} className="flex justify-between text-brand-teal font-light">
                        <span>+ {a.name}</span>
                        <span className="font-mono">+ R$ {a.price},00</span>
                      </div>
                    ))}
                  </div>

                  <hr className="border-brand-beige/10 my-4" />

                  {/* Total calculation indicator */}
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] text-brand-beige/40 uppercase font-semibold">Valor Estimado Total</span>
                      <span className="font-display text-4xl font-extrabold text-brand-gold block">
                        R$ {calculatedTotal},00
                      </span>
                    </div>
                    <span className="text-[10px] text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-md font-bold uppercase tracking-widest pb-1 mb-1">
                      HORA MARCADA
                    </span>
                  </div>

                  <p className="text-[11px] text-brand-beige/45 leading-relaxed pt-2">
                    *Esta é uma estimativa calculada que assume a cooperação sadia do pet e ausência de nós severos. Os valores podem ser retificados após avaliação presencial.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      setBookingSuccess('Abertura de canal WhatsApp iniciada! Obrigado pela preferência.');
                      setTimeout(() => setBookingSuccess(null), 8500);
                    }}
                    className="w-full py-4 bg-brand-gold text-[#0A0A0A] rounded-xl hover:bg-[#E8AF4F] font-bold tracking-wider transition-all duration-300 text-center flex items-center justify-center space-x-3 shadow-lg shadow-brand-gold/10"
                  >
                    <Phone className="w-4 h-4 fill-current animate-pulse" />
                    <span>Confirmar e Agendar no WhatsApp</span>
                  </a>

                  {bookingSuccess && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl mt-3 text-center"
                     >
                       {bookingSuccess}
                     </motion.div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ================= DEPOIMENTOS DE PROVA SOCIAL ================= */}
        <section id="testimonials" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto bg-brand-card/10 relative">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#DCA342]">OPINIÕES DOS PROPRIETÁRIOS</span>
            <h2 className="text-3xl sm:text-5xl font-display font-light tracking-tight text-brand-beige">Membros da <span className="font-serif italic text-brand-gold">Família L'Étoile</span></h2>
            <p className="text-sm text-brand-beige/60">
              Veja a experiência de pais de pets que encontraram na L'Étoile um santuário de verdadeira dedicação e alta estética.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div 
                key={testimonial.id}
                className="bg-[#121212] border border-brand-beige/5 p-8 rounded-3xl flex flex-col justify-between hover:border-brand-gold/25 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center space-x-1 text-brand-gold mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 py-0.5 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-brand-beige/80 leading-relaxed italic mb-8">
                    "{testimonial.comment}"
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-6 border-t border-brand-beige/5">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-brand-beige/20">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-display">{testimonial.name}</h4>
                    <p className="text-xs text-brand-beige/40">
                      Pais do <span className="text-brand-gold font-medium">{testimonial.petName}</span> ({testimonial.petBreed})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ACCORDION SECTION ================= */}
        <section id="faq" className="py-24 px-6 lg:px-12 max-w-4xl mx-auto">
          <div className="text-center mb-16 flex flex-col items-center space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#DCA342]">RESPOSTAS RÁPIDAS</span>
            <h2 className="text-3xl sm:text-5xl font-display font-light tracking-tight text-brand-beige">Perguntas <span className="font-serif italic text-brand-gold">Frequentes</span></h2>
            <p className="text-sm text-brand-beige/60">
              Queremos que sua experiência seja o mais transparente possível. Confira as dúvidas recorrentes.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = openedFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="border border-brand-beige/10 bg-brand-card/15 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenedFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-6 flex justify-between items-center bg-transparent focus:outline-none"
                  >
                    <span className="font-display font-bold text-sm sm:text-base pr-4 text-brand-beige hover:text-brand-gold transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform shrink-0 duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-beige/60 leading-relaxed border-t border-brand-beige/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= LOCATION MAPS AND CALLOUT ================= */}
        <section className="py-12 px-6 lg:px-12 max-w-7xl mx-auto my-12 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:items-center">
          <div className="flex flex-col space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#DCA342]">ONDE ESTAMOS</span>
            <h2 className="text-3xl sm:text-5xl font-display font-light tracking-tight text-brand-beige">Visite nossa <span className="font-serif italic text-brand-gold">Maison de Estética</span></h2>
            <p className="text-sm text-brand-beige/70 leading-relaxed">
              Estamos localizados no coração pulsante do bairro Jardins. Um espaço totalmente idealizado para a tranquilidade canina e felina, onde oferecemos estacionamento exclusivo com manobrista para sua total conveniência.
            </p>
            
            <div className="space-y-4 text-xs sm:text-sm text-brand-beige/85">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                <span>Alameda Lorena, 1420 - Jardins, São Paulo - SP</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-brand-teal shrink-0" />
                <span>Segunda a Sábado: 09:00 - 19:30</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-brand-gold shrink-0" />
                <span>Domingo: Fechado (Exclusivo para manutenção e esterilização global dos espaços)</span>
              </div>
            </div>

            <div className="pt-4">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Alameda+Lorena%2C+1420+-+Jardins%2C+S%C3%A3o+Paulo+-+SP"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-[#0A0A0A] font-bold rounded-xl tracking-wider transition-all duration-300"
              >
                <span>Obter Rota via Google Maps</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden aspect-video relative border border-brand-beige/10 h-72 lg:h-96">
            {/* Visual aesthetic representation card in case custom map api key is missing */}
            <div className="absolute inset-0 bg-brand-dark flex flex-col justify-center items-center p-8 text-center space-y-4">
              <div className="p-4 bg-brand-gold/10 rounded-full text-brand-gold">
                <MapPin className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="font-display font-bold text-lg">Maison Jardins, SP</h3>
              <p className="text-xs text-brand-beige/50 max-w-xs">
                Alameda Lorena, 1420. Estacionamento conveniado Grátis para clientes em atendimento.
              </p>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#DCA342] bg-[#DCA342]/10 px-3 py-1 rounded">
                RECEPÇÃO PRESTIGIOSA
              </span>
            </div>
          </div>
        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-brand-card py-16 px-6 lg:px-12 border-t border-brand-beige/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-brand-beige/5">
          
          <div className="md:col-span-4 flex flex-col space-y-4">
            <span className="p-2 py-1 bg-brand-gold text-[#0A0A0A] rounded-lg font-display font-extrabold text-xs tracking-widest w-fit">
              L'ÉTOILE
            </span>
            <p className="text-xs text-brand-beige/50 max-w-xs leading-relaxed">
              Estética, visagismo e boutique pet de elite. Dedicados a prover um ritual de beleza livre de ansiedade, celebrando o esplendor único de cães e gatos.
            </p>
            <div className="flex items-center space-x-3 pt-2 text-brand-beige/60">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-widest text-brand-gold uppercase">SERVIÇOS DE ESTÉTICA</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-brand-beige/60">
              <a href="#services" className="hover:text-brand-beige transition-colors">Banho Ozônio</a>
              <a href="#services" className="hover:text-brand-beige transition-colors">Tosa Tesoura</a>
              <a href="#services" className="hover:text-brand-beige transition-colors">Hidratação Fios</a>
              <a href="#services" className="hover:text-brand-beige transition-colors">Lapidação Unhas</a>
              <a href="#services" className="hover:text-brand-beige transition-colors">Tratamento Pele</a>
              <a href="#services" className="hover:text-brand-beige transition-colors">Boutique Canina</a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-widest text-brand-gold uppercase">NEWSLETTER PREMIUM</h4>
            <p className="text-xs text-brand-beige/60 leading-relaxed">
              Inscreva-se para receber convites exclusivos de eventos, conselhos dermatológicos dos nossos visagistas e descontos sazonais na boutique.
            </p>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Seu email principal" 
                className="bg-brand-dark/80 border border-brand-beige/10 px-4 py-2 text-xs rounded-xl focus:border-brand-gold focus:outline-none flex-1 font-light"
              />
              <button 
                onClick={() => alert('Assinatura confirmada com sucesso!')}
                className="px-4 py-2 bg-brand-gold text-[#0A0A0A] text-xs font-bold rounded-xl hover:bg-[#E8AF4F] transition-colors"
              >
                Assinar
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-beige/40">
          <span>
            © 2026 L'Étoile Pet Spa. Todos os direitos reservados. Alameda Lorena, 1420 - São Paulo, SP.
          </span>
          <div className="flex space-x-6">
            <a href="#faq" className="hover:text-brand-beige transition-colors">Políticas de Privacidade</a>
            <a href="#faq" className="hover:text-brand-beige transition-colors">Termos de Atendimento</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
