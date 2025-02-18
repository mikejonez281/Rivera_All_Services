const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Helper function to detect Spanish language
function isSpanish(text) {
    const spanishIndicators = [
        // Basic bathroom variations
        'bano', 'baño', 'banio', 'vanio', 'banyo',
        // Cost/Price variations
        'cuanto', 'quanto', 'kuanto', 'kuanto kuesta', 'kuesta',
        'precio', 'presio', 'prezio',
        'kosto', 'costo', 'quanto vale',
        // Remodel variations
        'remodelar', 'remodelarr', 'remodelasion', 'remodelacion',
        'arreglar', 'areglar', 'arreglo', 'areglo',
        'renovar', 'renovasion', 'renobacion', 'renobado',
        // Room variations
        'kuarto', 'cuarto', 'quarto',
        // Service variations
        'servisio', 'servicio', 'serbicio', 'servisios',
        // Common text-style Spanish
        'nesecito', 'necesito', 'nesesito',
        'kieres', 'kiere', 'quiere', 'kiero', 'quiero',
        'puede', 'puedes', 'podria', 'podrias',
        'aver', 'haver', 'aber',
        'ayuda', 'aiuda', 'alluda',
        // Informal question starters
        'oye', 'oie', 'ola', 'hola',
        'me dises', 'me dice', 'dime',
        'save', 'sabe', 'sabes',
        // Common phrases without spaces
        'cuantocuesta', 'quantocuesta', 'kuantokuesta',
        'cuantosale', 'quantosale', 'kuantosale',
        'mepuedes', 'mepuede', 'medices', 'medise'
    ];
    
    const lowerText = text.toLowerCase()
        // Remove all punctuation
        .replace(/[.,¿?¡!]/g, '')
        // Remove accents
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        // Remove extra spaces
        .replace(/\s+/g, ' ');
    
    return spanishIndicators.some(word => {
        const normalizedWord = word
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
        return lowerText.includes(normalizedWord);
    });
}

// Helper function to detect bathroom renovation cost questions
function isBathroomCostQuestion(message) {
    const bathroomVariations = [
        // English variations
        'bathroom', 'bath', 'restroom', 'washroom', 'lavatory',
        // Spanish variations with common misspellings
        'bano', 'baño', 'banio', 'vanio', 'banyo', 'tina',
        'cuarto de bano', 'cuartodebano',
        'sanitario', 'sanitarios',
        'servicio', 'servisio', 'serbicio',
        'lababo', 'lavabo', 'lavavo'
    ];
    
    const costVariations = [
        // English variations
        'cost', 'price', 'how much', 'estimate', 'quote', 'pricing',
        // Spanish variations with common misspellings
        'costo', 'kosto', 'quanto', 'cuanto', 'kuanto',
        'precio', 'presio', 'prezio',
        'vale', 'kuesta', 'cuesta',
        'estimado', 'estimasion', 'estimacion',
        'cotizacion', 'cotisasion', 'cotizasion',
        'presupuesto', 'prezupuesto'
    ];

    const renoVariations = [
        // English variations
        'remodel', 'renovation', 'fix', 'update', 'redo',
        // Spanish variations with common misspellings
        'remodelar', 'remodelasion', 'remodelacion',
        'renovar', 'renovasion', 'renobacion',
        'arreglar', 'areglar', 'arreglo', 'areglo',
        'mejorar', 'mejorado', 'mejora'
    ];

    const lowerMessage = message.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,¿?¡!]/g, '');

    const hasBathroom = bathroomVariations.some(word => lowerMessage.includes(word));
    const hasCost = costVariations.some(word => lowerMessage.includes(word));
    const hasReno = renoVariations.some(word => lowerMessage.includes(word));

    // More flexible matching - if it has bathroom and either cost or renovation terms
    return hasBathroom && (hasCost || hasReno);
}

// Get bathroom cost response based on language
function getBathroomCostResponse(isSpanishQuery) {
    return isSpanishQuery 
        ? "La remodelación estándar de baño cuesta $3000.00 sin incluir materiales. Todos los materiales serán a discreción del comprador y se agregarán con el impuesto sobre las ventas estándar."
        : "The standard bathroom remodels are $3000.00 without materials included. All materials will be at buyers descretion and added with standard sales tax.";
}

// Chatbot route
app.post("/api/chat", async (req, res) => {
    const { message, language } = req.body;
    
    // Check if it's a bathroom cost question
    if (isBathroomCostQuestion(message)) {
        return res.json({
            reply: getBathroomCostResponse(language === 'es')
        });
    }

    // For all other questions, use OpenAI with appropriate language instruction
    try {
        const systemPrompt = language === 'es'
            ? "Eres un experto en renovaciones. Responde en español de manera profesional y clara."
            : "You are a renovation expert. Respond in English in a professional and clear manner.";

        const openaiKey = process.env.OPENAI_API_KEY;

        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
        }, {
            headers: { Authorization: `Bearer ${openaiKey}` }
        });
        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI API Error:', error);
        const errorMessage = language === 'es'
            ? "Error al comunicarse con la IA"
            : "Error communicating with AI";
        res.status(500).json({ error: errorMessage });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
