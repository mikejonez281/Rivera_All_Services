import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.js';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // For unique keys
import './Chat.css';

// --- Start of Data Integration ---

// New, topic-based structure for conversational flow
const faqData = {
  en: {
    // --- Existing Topics ---
    deck: {
      keywords: ['deck', 'patio', 'porch', 'deck installation'],
      service: "Yes, we build, repair, and refinish decks, patios, and porches. A beautiful outdoor space is a great addition to any home. Let us know what you have in mind!",
      cost: {
        keywords: ['cost', 'price', 'how much', 'quote', 'estimate'],
        answer: "The cost for a new deck can vary widely. On average, you can expect a range of $25-$50 per square foot. For a standard 12x12 ft deck (144 sq ft), this could be $3,600 - $7,200. The final price depends heavily on materials (like wood vs. composite), size, and design complexity. For an accurate price, we highly recommend a free, on-site estimate."
      }
    },
    bathroom: {
      keywords: ['bathroom', 'shower', 'tub', 'vanity', 'restroom', 'bathroom remodel'],
      service: "Absolutely! We provide complete bathroom renovation services, from updating showers and tubs to installing new vanities and toilets. We can help transform your bathroom into a modern, relaxing space.",
      cost: {
        keywords: ['cost', 'price', 'how much', 'quote', 'estimate'],
        answer: "A standard bathroom renovation is approximately between $3,000 to $5,000. For a more accurate quote based on your specific needs and materials, please contact us to schedule a free estimate."
      }
    },
    kitchen: {
      keywords: ['kitchen', 'cabinets', 'countertop', 'backsplash', 'kitchen remodel'],
      service: "Yes, we specialize in full kitchen renovations. This includes installing new cabinets, countertops, backsplashes, and kitchen islands to create your dream kitchen.",
      cost: {
        keywords: ['cost', 'price', 'how much', 'quote', 'estimate'],
        answer: "A standard kitchen renovation can range from $5,000 to $25,000 or more, depending on the scope and materials. We recommend a free consultation for a precise quote tailored to your vision."
      }
    },
    plumbing: {
      keywords: ['plumbing', 'leak', 'faucet', 'toilet', 'pipe', 'drain', 'clog', 'plumber'],
      service: "Yes, Rivera All Services offers comprehensive plumbing work, including repairs for leaks, faucets, and toilets, as well as new installations.",
      cost: {
        keywords: ['cost', 'price', 'how much', 'quote', 'estimate'],
        answer: "Plumbing costs vary greatly depending on the job. A simple repair might be a small service call fee, while new installations require a custom quote. We offer free estimates for all general repairs!"
      }
    },
    electrical: {
      keywords: ['electrical', 'outlet', 'light fixture', 'wiring', 'switch', 'power', 'electrician'],
      service: "Our electrical services cover everything from installing new outlets and light fixtures to minor wiring repairs. For safety, it's always best to hire a professional.",
      cost: {
        keywords: ['cost', 'price', 'how much', 'quote', 'estimate'],
        answer: "Like plumbing, electrical work pricing depends on the task. Installing a new fixture is different from a wiring project. We'd be happy to provide a free estimate for your specific needs."
      }
    },
    // --- New Topics from User ---
    // 1. Outdoor & Structural Projects
    retainingWalls: {
      keywords: ['retaining wall'],
      service: "Yes, we build retaining walls. They are essential for managing soil and preventing erosion, and can also be a beautiful landscaping feature. We'd be happy to discuss your project."
    },
    fencing: {
      keywords: ['fencing', 'fence'],
      service: "Absolutely, we install and repair a variety of fences. Whether you're looking for privacy, security, or just to define your property line, we can help you choose the right material and style."
    },
    driveway: {
      keywords: ['concrete driveway', 'driveway', 'pouring', 'driveway repair'],
      service: "Yes, we handle concrete work, including driveway pouring and repairs. A well-maintained driveway significantly boosts curb appeal. Let us know what you need, and we can provide a free estimate."
    },
    garageShed: {
      keywords: ['garage', 'shed', 'detached garage'],
      service: "Yes, we can construct detached garages and sheds. It's a great way to add storage or a workshop to your property. We can go over the options and provide a detailed quote."
    },
    roofing: {
      keywords: ['roofing', 'roof', 'roof replacement'],
      service: "Yes, we offer roofing services, including full replacements. Protecting your home starts from the top down. We can assess your current roof and provide a comprehensive estimate for a replacement."
    },
    gutters: {
      keywords: ['gutter', 'gutter system', 'gutter guard'],
      service: "We do! We install and repair gutter systems and can also add gutter guards to prevent clogs. Proper water management is crucial for protecting your home's foundation."
    },
    // 2. Kitchen & Bathroom Specifics
    customCabinets: {
      keywords: ['custom cabinet', 'pre-fab', 'cabinet building'],
      service: "We work with both pre-fabricated and custom cabinet solutions to fit your budget and style. During a kitchen renovation consultation, we can explore which option is best for you."
    },
    countertopFabrication: {
      keywords: ['countertop fabrication', 'countertop installation'],
      service: "Yes, our kitchen renovation services include countertop fabrication and installation. We work with a variety of materials like granite, quartz, and more to give you the perfect finish."
    },
    walkInShower: {
      keywords: ['walk-in shower', 'wet room'],
      service: "Absolutely. We specialize in modern bathroom updates, including installing beautiful and accessible walk-in showers and creating full wet rooms. Let's discuss how we can transform your bathroom."
    },
    tileBacksplash: {
      keywords: ['tile backsplash'],
      service: "Yes, installing a new tile backsplash is one of our specialties. It's a fantastic way to add personality to your kitchen or bathroom. We can handle the installation as part of a larger remodel or as a standalone project."
    },
    sinkFaucet: {
      keywords: ['sink replacement', 'faucet replacement'],
      service: "Yes, we can certainly replace sinks and faucets in your kitchen or bathroom. It's a quick way to update the look and functionality of the space."
    },
    kitchenIsland: {
      keywords: ['kitchen island', 'island with electrical', 'island with outlets'],
      service: "We definitely do. Installing a kitchen island, including wiring for electrical outlets, is a very common part of our kitchen renovation projects. It adds a great deal of functionality to the space."
    },
    // 3. Interior Finishes & "Aesthetic" Work
    floorRefinishing: {
      keywords: ['hardwood floor refinishing', 'refinish floor'],
      service: "Yes, we provide hardwood floor refinishing services to bring your old floors back to life. Sanding, staining, and sealing can completely transform a room."
    },
    lvpFlooring: {
      keywords: ['lvp', 'luxury vinyl plank', 'vinyl flooring'],
      service: "We do! We install Luxury Vinyl Plank (LVP) flooring. It's a durable, waterproof, and stylish option that's great for any room in the house."
    },
    painting: {
      keywords: ['painting', 'interior painting', 'paint walls', 'paint ceiling'],
      service: "Yes, we offer professional interior painting for walls, ceilings, and trim. A fresh coat of paint is one of the easiest ways to refresh your space."
    },
    molding: {
      keywords: ['crown molding', 'baseboards', 'trim'],
      service: "Absolutely. We install crown molding, baseboards, and other trim work. These finishing touches can really elevate the look of a room."
    },
    popcornCeiling: {
      keywords: ['popcorn ceiling', 'remove popcorn ceiling', 'ceiling texture'],
      service: "Yes, we handle popcorn ceiling removal. It's a messy job, but we take care to protect your home and leave you with a smooth, modern ceiling."
    },
    wallpaper: {
      keywords: ['wallpaper', 'install wallpaper'],
      service: "We do offer wallpaper installation services. Whether it's for a full room or an accent wall, we can ensure a professional, seamless application."
    },
    drywall: {
      keywords: ['drywall', 'patching', 'drywall finishing', 'sheetrock'],
      service: "Yes, we do drywall patching and finishing. From small holes to larger repairs, we can make your walls look like new again."
    },
    // 4. Mechanical & Utility Work
    panelUpgrade: {
      keywords: ['electrical panel', 'panel upgrade', 'breaker box'],
      service: "Yes, we perform electrical panel upgrades. This is an important safety and modernization update, especially for older homes or when adding major appliances. We recommend a licensed professional for this work."
    },
    recessedLighting: {
      keywords: ['recessed lighting', 'pot lights', 'ceiling fan'],
      service: "We certainly do. Installing recessed lighting (or pot lights) and ceiling fans is a great way to modernize a room and provide clean, even illumination. We can help with layout and installation."
    },
    smartHome: {
      keywords: ['smart home', 'thermostat', 'doorbell', 'smart doorbell'],
      service: "Yes, we can install various smart home devices, including smart thermostats and video doorbells, to make your home more convenient and secure."
    },
    waterHeater: {
      keywords: ['water heater', 'water heater replacement'],
      service: "Yes, we handle water heater replacements. If your current unit is old or failing, we can help you choose and install a new, more efficient model."
    },
    floorHeating: {
      keywords: ['under-floor heating', 'heated floors', 'floor heating'],
      service: "We do! We can install under-floor heating systems, which are a wonderful luxury, especially for tile floors in bathrooms and kitchens. It's best to do this during a flooring renovation."
    },
    hvac: {
      keywords: ['hvac', 'ductwork', 'duct repair'],
      service: "While we don't specialize in full HVAC system installations, we can handle minor ductwork repairs and replacements, often as part of a larger renovation project. For major HVAC issues, we'd recommend a dedicated specialist."
    },
    // 5. Windows, Doors & Openings
    windowReplacement: {
      keywords: ['window replacement', 'replace window', 'window'],
      service: "Yes, we provide professional window replacement services. New windows can greatly improve your home's energy efficiency and curb appeal."
    },
    slidingDoor: {
      keywords: ['sliding glass door', 'patio door', 'door'],
      service: "We do. We can install new sliding glass doors, which are perfect for connecting your indoor and outdoor living spaces."
    },
    interiorDoor: {
      keywords: ['interior door', 'door hanging'],
      service: "Yes, we hang and replace interior doors. It's a small change that can make a big difference in the feel of your home."
    },
    skylight: {
      keywords: ['skylight', 'install skylight'],
      service: "Yes, we can install skylights. They are a fantastic way to bring more natural light into a room. This is a job best left to professionals to ensure it's done without any leaks."
    },
    egressWindow: {
      keywords: ['egress window', 'basement window'],
      service: "We do perform egress window installations for basements. This is a crucial safety feature for any finished basement living space, and we ensure it's done to code."
    },
    // 6. Basement & Attic
    waterproofing: {
      keywords: ['waterproofing', 'basement waterproofing', 'wet basement'],
      service: "Yes, we offer basement waterproofing solutions to help keep your basement dry and prevent water damage. A dry basement is the first step to a usable space."
    },
    atticInsulation: {
      keywords: ['attic insulation', 'insulation blowing', 'batting'],
      service: "We do. Proper attic insulation is key to your home's energy efficiency. We can add blown-in or batting insulation to help lower your energy bills."
    },
    basementFinishing: {
      keywords: ['basement finishing', 'finish basement', 'basement remodel'],
      service: "Absolutely! We specialize in full basement finishing, turning your unused space into a beautiful and functional living area, home theater, or gym. Let's talk about the possibilities for your home."
    },
    // --- Standalone Questions ---
    estimates: {
      keywords: ['free estimate', 'general repair estimate', 'repair cost'],
      service: "Yes, we absolutely provide free, no-obligation estimates for all general repairs. Please contact us to schedule an appointment."
    },
    contact: {
      keywords: ['contact', 'phone', 'email', 'information', 'call', 'reach out', 'address', 'number'],
      service: "You can reach us by phone at (786) 294-1207 or by email at riverallservices@gmail.com. For more details, please visit our [Contact Page](/contact)."
    },
    default: {
      answer: "I am sorry, could you please help me understand by rephrasing your question or concern?"
    }
  },
  es: {
    // --- Existing Topics ---
    deck: {
      keywords: ['deck', 'terraza', 'patio', 'porche', 'instalaciones de terrazas'],
      service: "¡Sí! Construimos, reparamos y restauramos terrazas, patios y porches. Un hermoso espacio al aire libre es una gran adición a cualquier hogar. ¡Díganos qué tiene en mente!",
      cost: {
        keywords: ['costo', 'precio', 'cuánto cuesta', 'cotización', 'estimado'],
        answer: "El costo de instalar una nueva terraza (deck) puede variar ampliamente. En promedio, puede esperar un rango de $25 a $50 por pie cuadrado. Para una terraza de 12x12 pies (144 pies cuadrados), esto podría ser de $3,600 a $7,200. El precio final depende de los materiales, el tamaño y la complejidad. Para un precio exacto, recomendamos un presupuesto gratuito en el sitio."
      }
    },
    bathroom: {
      keywords: ['baño', 'ducha', 'bañera', 'tocador', 'remodelación de baño'],
      service: "¡Por supuesto! Ofrecemos servicios completos de renovación de baños, desde la actualización de duchas y bañeras hasta la instalación de nuevos tocadores e inodoros. Podemos ayudar a transformar su baño en un espacio moderno y relajante.",
      cost: {
        keywords: ['costo', 'precio', 'cuánto cuesta', 'cotización', 'estimado', "cuesta',"],
        answer: "Una renovación de baño estándar cuesta aproximadamente entre $3,000 y $5,000. Para una cotización más precisa basada en sus necesidades y materiales específicos, por favor contáctenos para programar un presupuesto sin compromiso."
      }
    },
    kitchen: {
      keywords: ['cocina', 'gabinetes', 'encimera', 'salpicadero', 'remodelación de cocina'],
      service: "Sí, nos especializamos en renovaciones completas de cocina. Esto incluye la instalación de nuevos gabinetes, encimeras, salpicaderos e islas de cocina para crear la cocina de sus sueños.",
      cost: {
        keywords: ['costo', 'precio', 'cuánto cuesta', 'cotización', 'estimado'],
        answer: "Una renovación de cocina estándar puede oscilar entre $5,000 y $25,000 o más, dependiendo del alcance y los materiales. Recomendamos una consulta gratuita para una cotización precisa adaptada a su visión."
      }
    },
    plumbing: {
      keywords: ['plomería', 'fuga', 'grifo', 'inodoro', 'tubería', 'fontanero'],
      service: "Sí, Rivera All Services ofrece trabajos de plomería completos, incluyendo reparaciones de fugas, grifos e inodoros, así como nuevas instalaciones.",
      cost: {
        keywords: ['costo', 'precio', 'cuánto cuesta', 'cotización', 'estimado'],
        answer: "Los costos de plomería varían mucho según el trabajo. Una reparación simple puede tener una tarifa de servicio pequeña, mientras que las nuevas instalaciones requieren una cotización personalizada. ¡Ofrecemos presupuestos gratuitos para todas las reparaciones generales!"
      }
    },
    electrical: {
      keywords: ['eléctrico', 'enchufe', 'lámpara', 'cableado', 'interruptor', 'electricista'],
      service: "Nuestros servicios eléctricos cubren todo, desde la instalación de nuevos enchufes y lámparas hasta reparaciones menores. Por seguridad, siempre es mejor contratar a un profesional.",
      cost: {
        keywords: ['costo', 'precio', 'cuánto cuesta', 'cotización', 'estimado'],
        answer: "Al igual que la plomería, el precio del trabajo eléctrico depende de la tarea. Instalar una lámpara nueva es diferente a un proyecto de cableado. Estaremos encantados de ofrecerle un presupuesto gratuito para sus necesidades específicas."
      }
    },
    // --- New Topics from User (Spanish) ---
    // 1. Proyectos Exteriores y Estructurales
    retainingWalls: {
      keywords: ['muro de contención', 'muros de contención'],
      service: "Sí, construimos muros de contención. Son esenciales para manejar la tierra y prevenir la erosión, y también pueden ser un hermoso elemento de paisajismo. Estaremos encantados de hablar sobre su proyecto."
    },
    fencing: {
      keywords: ['cercas', 'rejas', 'cercado'],
      service: "Por supuesto, instalamos y reparamos una variedad de cercas. Ya sea que busque privacidad, seguridad o simplemente delimitar su propiedad, podemos ayudarle a elegir el material y estilo adecuados."
    },
    driveway: {
      keywords: ['concreto', 'entrada de concreto', 'reparación de driveway'],
      service: "Sí, realizamos trabajos de concreto, incluyendo el vertido y la reparación de entradas para autos (driveways). Una entrada bien mantenida mejora significativamente el atractivo de su casa. Díganos qué necesita y le podemos dar un presupuesto gratuito."
    },
    garageShed: {
      keywords: ['garaje', 'cobertizo', 'garaje independiente'],
      service: "Sí, podemos construir garajes independientes y cobertizos. Es una excelente manera de añadir almacenamiento o un taller a su propiedad. Podemos revisar las opciones y proporcionarle una cotización detallada."
    },
    roofing: {
      keywords: ['techado', 'techo', 'reemplazo de techo'],
      service: "Sí, ofrecemos servicios de techado (roofing), incluyendo reemplazos completos. La protección de su hogar comienza desde arriba. Podemos evaluar su techo actual y proporcionarle un presupuesto completo para un reemplazo."
    },
    gutters: {
      keywords: ['canaletas', 'sistema de canaletas', 'protector de canaletas'],
      service: "¡Sí! Instalamos y reparamos sistemas de canaletas y también podemos añadir protectores para evitar obstrucciones. Un manejo adecuado del agua es crucial para proteger los cimientos de su hogar."
    },
    // 2. Especificaciones de Cocina y Baño
    customCabinets: {
      keywords: ['gabinete a medida', 'gabinetes prefabricados', 'fabricación de gabinetes'],
      service: "Trabajamos tanto con soluciones de gabinetes prefabricados como a medida para ajustarnos a su presupuesto y estilo. Durante una consulta de renovación de cocina, podemos explorar cuál es la mejor opción para usted."
    },
    countertopFabrication: {
      keywords: ['fabricación de encimeras', 'instalación de encimeras'],
      service: "Sí, nuestros servicios de renovación de cocina incluyen la fabricación e instalación de encimeras. Trabajamos con una variedad de materiales como granito, cuarzo y más para darle el acabado perfecto."
    },
    walkInShower: {
      keywords: ['ducha a ras de suelo', 'cuarto húmedo', 'walk-in shower'],
      service: "Por supuesto. Nos especializamos en actualizaciones de baños modernos, incluyendo la instalación de hermosas y accesibles duchas a ras de suelo (walk-in) y la creación de cuartos húmedos completos. Hablemos de cómo podemos transformar su baño."
    },
    tileBacksplash: {
      keywords: ['protector de salpicaduras', 'backsplash de azulejo'],
      service: "Sí, la instalación de un nuevo protector de salpicaduras (backsplash) de azulejo es una de nuestras especialidades. Es una forma fantástica de añadir personalidad a su cocina o baño. Podemos encargarnos de la instalación como parte de una remodelación más grande o como un proyecto independiente."
    },
    sinkFaucet: {
      keywords: ['reemplazo de fregadero', 'reemplazo de grifo'],
      service: "Sí, ciertamente podemos reemplazar fregaderos y grifos en su cocina o baño. Es una forma rápida de actualizar la apariencia y funcionalidad del espacio."
    },
    kitchenIsland: {
      keywords: ['isla de cocina', 'isla con electricidad', 'isla con tomas de corriente'],
      service: "Definitivamente lo hacemos. Instalar una isla de cocina, incluyendo el cableado para tomas de corriente, es una parte muy común de nuestros proyectos de renovación de cocina. Añade una gran funcionalidad al espacio."
    },
    // 3. Acabados Interiores y Trabajo Estético
    floorRefinishing: {
      keywords: ['pulido de pisos', 'acabado de pisos de madera'],
      service: "Sí, ofrecemos servicios de pulido y acabado de pisos de madera para devolverle la vida a sus pisos viejos. Lijar, teñir y sellar puede transformar completamente una habitación."
    },
    lvpFlooring: {
      keywords: ['lvp', 'piso de vinilo', 'vinilo de lujo'],
      service: "¡Sí! Instalamos pisos de vinilo de lujo (LVP). Es una opción duradera, impermeable y con estilo, ideal para cualquier habitación de la casa."
    },
    painting: {
      keywords: ['pintura', 'pintura interior', 'pintar paredes', 'pintar techos'],
      service: "Sí, ofrecemos pintura interior profesional para paredes, techos y molduras. Una nueva capa de pintura es una de las formas más fáciles de renovar su espacio."
    },
    molding: {
      keywords: ['moldura de corona', 'rodapiés', 'molduras'],
      service: "Por supuesto. Instalamos molduras de corona, rodapiés y otros trabajos de acabado. Estos toques finales realmente pueden elevar la apariencia de una habitación."
    },
    popcornCeiling: {
      keywords: ['techo de palomitas', 'quitar techo de palomitas', 'textura de techo'],
      service: "Sí, nos encargamos de la eliminación de techos de palomitas de maíz (popcorn). Es un trabajo sucio, pero nos cuidamos de proteger su hogar y dejarle un techo liso y moderno."
    },
    wallpaper: {
      keywords: ['papel tapiz', 'instalar papel tapiz'],
      service: "Ofrecemos servicios de instalación de papel tapiz. Ya sea para una habitación completa o una pared de acento, podemos asegurar una aplicación profesional y sin costuras."
    },
    drywall: {
      keywords: ['drywall', 'panel de yeso', 'parcheo', 'acabado de drywall'],
      service: "Sí, hacemos parcheo y acabado de paneles de yeso (drywall). Desde pequeños agujeros hasta reparaciones más grandes, podemos hacer que sus paredes parezcan nuevas otra vez."
    },
    // 4. Trabajo Mecánico y de Servicios
    panelUpgrade: {
      keywords: ['panel eléctrico', 'actualización de panel', 'caja de breakers'],
      service: "Sí, realizamos actualizaciones de paneles eléctricos. Esta es una actualización importante de seguridad y modernización, especialmente para casas antiguas o al añadir electrodomésticos grandes. Recomendamos un profesional con licencia para este trabajo."
    },
    recessedLighting: {
      keywords: ['iluminación empotrada', 'pot lights', 'ventilador de techo'],
      service: "Ciertamente lo hacemos. Instalar iluminación empotrada (o 'pot lights') y ventiladores de techo es una excelente manera de modernizar una habitación y proporcionar una iluminación limpia y uniforme. Podemos ayudar con el diseño y la instalación."
    },
    smartHome: {
      keywords: ['hogar inteligente', 'termostato', 'timbre', 'timbre inteligente'],
      service: "Sí, podemos instalar varios dispositivos de hogar inteligente, incluyendo termostatos inteligentes y timbres con video, para hacer su hogar más conveniente y seguro."
    },
    waterHeater: {
      keywords: ['calentador de agua', 'reemplazo de calentador'],
      service: "Sí, nos encargamos de los reemplazos de calentadores de agua. Si su unidad actual es vieja o está fallando, podemos ayudarle a elegir e instalar un modelo nuevo y más eficiente."
    },
    floorHeating: {
      keywords: ['calefacción por suelo', 'suelo radiante', 'pisos con calefacción'],
      service: "¡Sí! Podemos instalar sistemas de calefacción por suelo radiante, que son un lujo maravilloso, especialmente para pisos de baldosas en baños y cocinas. Es mejor hacerlo durante una renovación de pisos."
    },
    hvac: {
      keywords: ['hvac', 'conductos', 'reparación de conductos'],
      service: "Aunque no nos especializamos en instalaciones completas de sistemas de HVAC, podemos manejar reparaciones y reemplazos menores de conductos, a menudo como parte de un proyecto de renovación más grande. Para problemas mayores de HVAC, recomendaríamos un especialista dedicado."
    },
    // 5. Ventanas, Puertas y Aberturas
    windowReplacement: {
      keywords: ['reemplazo de ventana', 'reemplazar ventana', 'ventana'],
      service: "Sí, ofrecemos servicios profesionales de reemplazo de ventanas. Las ventanas nuevas pueden mejorar enormemente la eficiencia energética y el atractivo exterior de su hogar."
    },
    slidingDoor: {
      keywords: ['puerta corrediza de vidrio', 'puerta de patio', 'puerta'],
      service: "Sí. Podemos instalar nuevas puertas corredizas de vidrio, que son perfectas para conectar sus espacios de vida interiores y exteriores."
    },
    interiorDoor: {
      keywords: ['puerta interior', 'colgar puerta'],
      service: "Sí, colgamos y reemplazamos puertas interiores. Es un pequeño cambio que puede hacer una gran diferencia en la sensación de su hogar."
    },
    skylight: {
      keywords: ['tragaluz', 'instalar tragaluz'],
      service: "Sí, podemos instalar tragaluces. Son una forma fantástica de traer más luz natural a una habitación. Es un trabajo que es mejor dejar a los profesionales para asegurar que se haga sin fugas."
    },
    egressWindow: {
      keywords: ['ventana de salida', 'ventana de sótano'],
      service: "Realizamos instalaciones de ventanas de salida (egress) para sótanos. Esta es una característica de seguridad crucial para cualquier espacio habitable en un sótano terminado, y nos aseguramos de que se haga de acuerdo con el código."
    },
    // 6. Sótano y Ático
    waterproofing: {
      keywords: ['impermeabilización', 'impermeabilización de sótano', 'sótano húmedo'],
      service: "Sí, ofrecemos soluciones de impermeabilización de sótanos para ayudar a mantener su sótano seco y prevenir daños por agua. Un sótano seco es el primer paso para un espacio utilizable."
    },
    atticInsulation: {
      keywords: ['aislamiento de ático', 'aislamiento soplado'],
      service: "Sí. Un aislamiento adecuado del ático es clave para la eficiencia energética de su hogar. Podemos añadir aislamiento soplado o en manta para ayudar a reducir sus facturas de energía."
    },
    basementFinishing: {
      keywords: ['acabado de sótano', 'terminar sótano', 'remodelación de sótano'],
      service: "¡Por supuesto! Nos especializamos en el acabado completo de sótanos, convirtiendo su espacio no utilizado en una hermosa y funcional área de estar, cine en casa o gimnasio. Hablemos de las posibilidades para su hogar."
    },
    // --- Standalone Questions ---
    estimates: {
      keywords: ['presupuesto gratis', 'estimado gratuito', 'reparación general'],
      service: "Sí, por supuesto, ofrecemos presupuestos gratuitos y sin compromiso para todas las reparaciones generales. Por favor, contáctenos para programar una cita."
    },
    contact: {
      keywords: ['contacto', 'teléfono', 'email', 'información', 'llamar', 'comunicarse', 'dirección', 'número'],
      service: "Puede comunicarse con nosotros por teléfono al (786) 294-1207 o por correo electrónico a riverallservices@gmail.com. Para más detalles, también puede visitar nuestra [Página de Contacto](/contact)."
    },
    default: {
      answer: "Lo siento por la confusión, podría ayudarme a entender reformulando sus preguntas o inquietudes?"
    }
  }
};

const getAnswer = (question, language, currentTopic) => {
  const lowerCaseQuestion = question.toLowerCase().trim();
  const qaSet = faqData[language];
  let newTopic = null;
  let response = null;

  // 1. Check for follow-up questions about the current topic
  if (currentTopic && qaSet[currentTopic] && qaSet[currentTopic].cost) {
    const isAskingForCost = qaSet[currentTopic].cost.keywords.some(kw => lowerCaseQuestion.includes(kw));
    if (isAskingForCost) {
      response = qaSet[currentTopic].cost.answer;
      // The topic is now "resolved," so we clear it to avoid repeated cost answers.
      newTopic = null; 
      return { response, newTopic };
    }
  }

  // 2. If not a follow-up, find a new topic
  const matchedTopicKey = Object.keys(qaSet).find(topicKey => {
    if (topicKey === 'default') return false;
    const topic = qaSet[topicKey];
    return topic.keywords && topic.keywords.some(kw => lowerCaseQuestion.includes(kw));
  });

  if (matchedTopicKey) {
    const topic = qaSet[matchedTopicKey];
    response = topic.service; // Give the general service answer
    // If this topic has a potential follow-up, set it as the new topic.
    newTopic = topic.cost ? matchedTopicKey : null;
  } else {
    response = qaSet.default.answer;
    newTopic = null; // No topic found, reset context
  }

  return { response, newTopic };
};

// --- End of Data Integration ---

const renderMessageWithLink = (text) => {
  const linkRegex = /\[(.*?)\]\((.*?)\)/;
  const match = text.match(linkRegex);

  if (!match) {
    return text;
  }

  const beforeText = text.substring(0, match.index);
  const linkText = match[1];
  const linkUrl = match[2];
  const afterText = text.substring(match.index + match[0].length);

  return (
    <>
      {beforeText}<Link to={linkUrl}>{linkText}</Link>{afterText}
    </>
  );
};

function Chat({ closeChat, isVisible }) {
  const { language } = useLanguage();
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [input, setInput] = useState(''); // Input field state
  const [loading, setLoading] = useState(false); // Loading state
  const [currentTopic, setCurrentTopic] = useState(null); // State for conversational context
  const inputRef = useRef(null); // Ref for the text input
  const chatContainerRef = useRef(null); // Ref for auto-scrolling

  // Get common questions from our new data file, excluding the 'default' key
  const commonQuestions = language === 'en' ? [
    "How much for a bathroom renovation?",
    "How much for a kitchen renovation?",
    "Do you provide free estimates for general repairs?",
  ] : [ 
    "¿Cuánto cuesta la renovación de un baño?", 
    "¿Cuánto cuesta la renovación de una cocina?", 
    "¿Ofrecen presupuestos gratuitos para reparaciones generales?"
  ];
  // Scroll to the latest message whenever messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Effect to focus the input when the bot is done responding
  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  useEffect(() => {
    const welcomeMessageText = language === 'en' 
        ? "Hello! I'm the virtual assistant for Rivera All Services. How can I help you today? You can ask me a question or select one of the common topics below."
        : "¡Hola! Soy el asistente virtual de Rivera All Services. ¿Cómo puedo ayudarte hoy? Puedes hacerme una pregunta o seleccionar uno de los temas comunes a continuación.";

    const welcomeMessage = {
        id: uuidv4(),
        text: welcomeMessageText,
        sender: 'Rivera All Services'
    };

    // Set the initial welcome message, but only if the chat is empty
    if (messages.length === 0) {
      setMessages([welcomeMessage]);
    }
  }, [language, messages.length]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    // Submit on Enter press, but allow new lines with Shift+Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!loading) handleSubmit(e);
    }
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || loading) return;
    setLoading(true);
    
    // Simulate a network delay for a better user experience
    setTimeout(() => {
      const { response, newTopic } = getAnswer(messageText, language, currentTopic);
      setCurrentTopic(newTopic); // Update the conversational topic
      const aiMessage = { id: uuidv4(), text: response, sender: 'Rivera All Services' };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setLoading(false);
    }, 500 + Math.random() * 500); // Respond in 0.5-1.0 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentInput = input;
    if (!currentInput.trim()) return;

    setInput('');
    const userMessage = { id: uuidv4(), text: currentInput, sender: 'Customer' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    await sendMessage(currentInput);
  };

  const handlePresetQuestionClick = (question) => {
    const userMessage = { id: uuidv4(), text: question, sender: 'Customer' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    sendMessage(question);
  };

  return (
    <div className={`chat-popup ${isVisible ? 'visible' : ''}`}>
      <div className="chat-header">
        <h1 className="chat-title">Rivera All Services Chat</h1>
        <button onClick={closeChat} className="close-chat-button">&times;</button>
      </div>
      <div ref={chatContainerRef} className="chat-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender === 'Customer' ? 'customer' : 'service'}`}>
            <div className="message-bubble">
              <strong>{msg.sender}:</strong> {renderMessageWithLink(msg.text)}
            </div>
          </div>
        ))}
        {loading && <div className="typing-indicator"><i>Typing...</i></div>}
      </div>
      <div className="preset-questions">
        <p><strong>Or ask one of these common questions:</strong></p>
        {commonQuestions.map((q, i) => (
          <button key={i} onClick={() => handlePresetQuestionClick(q)} disabled={loading} className="preset-button">
            {q}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about our services..."
          disabled={loading}
          className="chat-input"
        />
        <button type="submit" disabled={loading} className="send-button">
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default Chat;
