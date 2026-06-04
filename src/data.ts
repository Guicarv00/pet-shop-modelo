import { Testimonial, Service, FAQItem, BentoItem } from './types';

export const BENTO_ITEMS: BentoItem[] = [
  {
    id: 'bento-1',
    title: 'Atendimento com Carinho Absoluto',
    description: 'Tratamos cada pet como um membro da nossa própria família. Nosso protocolo "No Stress" garante um ambiente silencioso, respeitando os limites emocionais e físicos de cães e gatos.',
    iconName: 'Heart',
    sizeClass: 'md:col-span-2 md:row-span-2 bg-gradient-to-br from-brand-card to-[#15120F] border border-brand-beige/10 p-8 rounded-3xl flex flex-col justify-between group overflow-hidden relative',
    badge: 'Exclusivo',
    accentColor: '#DCA342',
    image: 'https://lh3.googleusercontent.com/d/1aRbFNOC0gdE4_y0HonjTfBzqIlFB6hY7'
  },
  {
    id: 'bento-2',
    title: 'Esteticistas Certificados',
    description: 'Equipe graduada em visagismo pet e dermatologia estética animal.',
    iconName: 'Award',
    sizeClass: 'bg-gradient-to-br from-brand-card to-[#0d0F0E] border border-brand-beige/5 p-6 rounded-3xl flex flex-col justify-between group',
    accentColor: '#14B8A6'
  },
  {
    id: 'bento-3',
    title: 'Hora Marcada Sem Filas',
    description: 'Agende digitalmente. Seu pet entra na sala no horário correto, reduzindo ansiedade.',
    iconName: 'Clock',
    sizeClass: 'bg-gradient-to-br from-brand-card to-[#0e0d11] border border-brand-beige/5 p-6 rounded-3xl flex flex-col justify-between group',
  },
  {
    id: 'bento-4',
    title: 'Equipamentos Silenciosos',
    description: 'Sopradores e secadores de última geração com isolamento acústico para que o banho seja uma experiência puramente relaxante e acolhedora.',
    iconName: 'VolumeX',
    sizeClass: 'bg-gradient-to-br from-brand-card to-[#111316] border border-brand-beige/5 p-6 rounded-3xl md:col-span-1 flex flex-col justify-between group',
  },
  {
    id: 'bento-5',
    title: 'Infraestrutura 100% Esterilizada',
    description: 'Purificação constante do ar, uso exclusivo de toalhas higienizadas em lavanderia especializada e esterilização por autoclave de todos os equipamentos de estética.',
    iconName: 'Shield',
    sizeClass: 'md:col-span-2 bg-gradient-to-br from-[rgba(18,18,18,0.8)] to-[#0A0D10] border border-brand-beige/10 p-8 rounded-3xl flex flex-col justify-between group overflow-hidden relative',
    badge: 'Segurança'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'Banho de Spa Aromoterápico',
    subtitle: 'Hidratação e Relaxamento Profundo',
    description: 'Uma experiência termal premium com água ozonizada, shampoo hipoalergênico importado, máscara reconstrutora de pelagem e massagem relaxante.',
    category: 'spa',
    basePrice: 120,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600',
    duration: '60-90 min',
    details: [
      'Água morna purificada com ozônio',
      'Massagem linfática relaxante na banheira',
      'Shampoos livres de parabenos de marcas multinacionais',
      'Secagem ultra-suave com proteção térmica'
    ]
  },
  {
    id: 'srv-2',
    title: 'Tosa Higiênica e Estética de Elite',
    subtitle: 'Cortes sob Medida e Visagismo',
    description: 'Corte tesoura, máquina ou handstripping realizado por especialistas que analisam a estrutura óssea e o tipo de pelo para destacar a beleza natural do seu pet.',
    category: 'grooming',
    basePrice: 170,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
    duration: '90-120 min',
    details: [
      'Visagismo facial e estrutural personalizado',
      'Desbaste especializado para controle de volume',
      'Remoção delicada de nós sem dor',
      'Limpeza de orelhas e áreas higiênicas sensíveis'
    ]
  },
  {
    id: 'srv-3',
    title: 'Protocolo de Recuperação e Brilho',
    subtitle: 'Cronograma Capilar e Nutrição Premium',
    description: 'Tratamento intensivo com óleos essenciais, queratina e manteiga de karitê. Ideal para pelagens ressecadas ou danificadas pelo sol e poluição.',
    category: 'care',
    basePrice: 150,
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600',
    duration: '45 min',
    details: [
      'Nutrição lipídica profunda com óleo de argan pet',
      'Cauterização de pontas duplas do pelo',
      'Aplicação de leave-in de brilho tridimensional',
      'Perfume finalizador selecionado de alta fixação'
    ]
  },
  {
    id: 'srv-4',
    title: 'Pedicure de Luxo & Lapidação',
    subtitle: 'Acabamento Seguro e Polido',
    description: 'Corte cuidadoso das unhas seguido de lapidação com lixa diamantada de alta precisão para eliminar pontas pontiagudas e evitar arranhões em pisos e peles.',
    category: 'care',
    basePrice: 60,
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=600',
    duration: '20 min',
    details: [
      'Corte de unhas respeitando o canal vascular',
      'Uso de lixadeira elétrica ultra-silenciosa',
      'Hidratação profunda das almofadinhas das patas (coxinhas)',
      'Aplicação de cera protetora natural e nutritiva'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Carolina Mendes',
    petName: 'Bento',
    petBreed: 'Golden Retriever',
    comment: 'O Bento tem pavor de barulho e sempre voltava estressado de outros pet shops. Na L\'Étoile, ele adora ir! O atendimento diferenciado sem estresse e o secador silencioso mudaram a vida dele. Voltou cheiroso e super calmo!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Roberto Alencar',
    petName: 'Zara',
    petBreed: 'Gato Persa',
    comment: 'Extrema delicadeza com felinos! Fazer tosa na Zara era um pesadelo devido à sua pele sensível. O banho e tosa a tesoura deles é simplesmente divino. O ambiente para gatos é separado e muito acolhedor.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Mariana e Pedro',
    petName: 'Milo',
    petBreed: 'Spitz Alemão',
    comment: 'O corte à tesoura de Milo ficou impecável! Ele parece um ursinho de verdade. Dá para sentir o amor dos atendentes em cada detalhe. O atendimento pelo WhatsApp para marcar é extremamente ágil!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    rating: 5
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Como funciona o atendimento com hora marcada?',
    answer: 'Nossos horários são agendados de forma personalizada pelo WhatsApp com intervalos adequados para que seu pet não tenha que esperar em gaiolas. Ele chega na hora combinada e vai direto para a sala de banho, o que reduz bastante o estresse e a ansiedade dos animais.'
  },
  {
    id: 'faq-2',
    question: 'Vocês atendem gatos também? Como é o espaço?',
    answer: 'Sim, atendemos felinos! Os gatos contam com profissionais que entendem o comportamento e os gatilhos de estresse dos felinos. Os agendamentos de gatos são preferencialmente organizados em horários específicos para evitar encontros com cães agitados.'
  },
  {
    id: 'faq-3',
    question: 'Quais tipos de produtos são utilizados nos banhos?',
    answer: 'Nós trabalhamos apenas com cosmética pet de elite (marcas importadas com fórmulas hipoalergênicas, enriquecidas com queratina, colágeno vegetal e óleos naturais). Todos os shampoos são balanceados com pH apropriado para cada pele de cão e gato, sem adição de parabenos ou sulfatos pesados.'
  },
  {
    id: 'faq-4',
    question: 'Como faço para agendar um horário?',
    answer: 'O agendamento é rápido e descomplicado. Você pode utilizar o simulador de valores em nossa página para ter uma estimativa do valor e clicar no botão de agendamento, que gerará uma mensagem personalizada em nosso canal de WhatsApp. Nossos recepcionistas confirmarão os horários em minutos!'
  }
];
