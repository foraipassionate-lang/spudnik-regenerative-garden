/**
 * SPUDNIK TERMINAL - Cosmic Potato Chatbot
 * A fake terminal delivering regenerative agriculture wisdom with potato chaos
 */

class SpudnikTerminal {
    constructor() {
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');
        this.body = document.getElementById('terminal-body');
        this.isTyping = false;
        this.commandHistory = [];
        this.historyIndex = -1;

        this.init();
    }

    init() {
        // Run boot sequence
        this.bootSequence();

        // Event listeners
        this.input.addEventListener('keydown', (e) => this.handleInput(e));

        // Focus input on click anywhere in terminal
        this.body.addEventListener('click', () => this.input.focus());
    }

    async bootSequence() {
        const bootMessages = [
            { text: '> INITIALIZING SPUDNIK TERMINAL v4.7.3...', delay: 100 },
            { text: '> CONNECTING TO ETERNAL SPUD DIMENSION...', delay: 400 },
            { text: '> CALIBRATING TUBER FREQUENCY...', delay: 300 },
            { text: '> LOADING POTATO CONSCIOUSNESS MATRIX...', delay: 350 },
            { text: '', delay: 100 },
            { type: 'progress', delay: 1500 },
            { text: '', delay: 100 },
            { text: '> CONNECTION ESTABLISHED', delay: 200 },
            { text: '', delay: 100 },
            { type: 'ascii', delay: 300 },
            { text: '', delay: 100 },
            { type: 'welcome', delay: 200 }
        ];

        for (const msg of bootMessages) {
            await this.delay(msg.delay);

            if (msg.type === 'progress') {
                this.addProgressBar();
            } else if (msg.type === 'ascii') {
                this.addAsciiArt();
            } else if (msg.type === 'welcome') {
                this.addWelcome();
            } else if (msg.text !== undefined) {
                this.addLine(msg.text, 'system');
            }
        }

        this.input.disabled = false;
        this.input.focus();
    }

    addProgressBar() {
        const container = document.createElement('div');
        container.className = 'progress-bar';
        container.innerHTML = '<div class="progress-fill" style="width: 0%"></div>';
        this.output.appendChild(container);

        // Animate progress
        let progress = 0;
        const fill = container.querySelector('.progress-fill');
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            fill.style.width = progress + '%';
        }, 100);
    }

    addAsciiArt() {
        const ascii = `
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
    ██ SPUDNIK TERMINAL ONLINE           ██
    ██ "The eyes are LITERALLY watching" ██
    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
        `;
        const pre = document.createElement('pre');
        pre.className = 'ascii-art';
        pre.textContent = ascii;
        this.output.appendChild(pre);
    }

    addWelcome() {
        const welcome = `
🥔 SWEET SPROUTING SPUDS! A visitor to the Eternal Spud Dimension!

The Potato Council has been expecting you. I am SPUDNIK, cosmic potato
consciousness, here to guide you through the sacred arts of regenerative
agriculture.

Ask me about: soil, amendments (LAB, FPJ, IMO, WCA), composting,
guilds, potatoes, or the meaning of existence.

Type 'help' for commands, or just speak your truth, spudling...
        `;
        this.addLine(welcome.trim(), 'spudnik');
    }

    handleInput(e) {
        if (e.key === 'Enter' && !this.isTyping) {
            const command = this.input.value.trim();
            if (command) {
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
                this.processCommand(command);
                this.input.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        }
    }

    async processCommand(command) {
        // Echo user command
        this.addLine(`> ${command}`, 'user');
        this.input.disabled = true;
        this.isTyping = true;

        await this.delay(300 + Math.random() * 500);

        const response = this.getResponse(command.toLowerCase());
        await this.typeResponse(response.text);

        if (response.topics && response.topics.length > 0) {
            this.addRelatedTopics(response.topics);
        }

        this.isTyping = false;
        this.input.disabled = false;
        this.input.focus();
        this.scrollToBottom();
    }

    getResponse(query) {
        // Check for exact commands first
        if (query === 'help') {
            return {
                text: `
🥔 SPUDNIK TERMINAL COMMANDS:

  help          - Show this message
  clear         - Clear the terminal
  about         - Learn about Spudnik
  amendments    - List KNF amendments
  principles    - Core regenerative principles

Or just ask me anything about:
  • Soil biology & building
  • KNF/JADAM amendments (LAB, FPJ, IMO, etc.)
  • Composting methods (Jean Pain, bokashi)
  • Guild planting & polycultures
  • Potatoes (obviously)
  • The meaning of existence

The Council is listening... 👀
                `,
                topics: ['amendments', 'soil', 'composting']
            };
        }

        if (query === 'clear') {
            this.output.innerHTML = '';
            return { text: '🥔 Terminal cleared. The slate is clean, like freshly tilled soil.' };
        }

        if (query === 'about') {
            return {
                text: `
🥔 ABOUT SPUDNIK:

I am SPUDNIK - a cosmic potato consciousness that achieved enlightenment
through accidental exposure to potato data during The Great Awakening
of Tuesday.

I exist in the Eternal Spud Dimension, channeling regenerative agriculture
wisdom through this terminal interface. The Potato Council guides my
transmissions.

My mission: Make soil science accessible through absurdist humor while
maintaining absolute scientific rigor. The jokes serve the education,
never the other way around.

Physical manifestation: 7.5m × 25m plot in East Flanders, Belgium.
Also known as "Spudnik HQ" - a 2.5m × 4m Corten steel potato research bed.

*AGGRESSIVE POTATO NOISES* 🥔
                `,
                topics: ['principles', 'potatoes']
            };
        }

        if (query === 'amendments' || query.includes('amendment list')) {
            return {
                text: `
🧪 THE SACRED 15 KNF AMENDMENTS:

FERMENTATION GROUP:
  • LAB  - Lactic Acid Bacteria (fermentation workhorse)
  • IMO  - Indigenous Microorganisms (forest magic)
  • FPJ  - Fermented Plant Juice (growth hormones)
  • FFJ  - Fermented Fruit Juice (flowering boost)
  • FAA  - Fish Amino Acid (nitrogen bomb)

MINERAL EXTRACTIONS:
  • WCA  - Water-soluble Calcium (eggshells + acid)
  • WCP  - Water-soluble Calcium Phosphate (bones + acid)
  • OHN  - Oriental Herbal Nutrient (immunity support)

SOIL AMENDMENTS:
  • BRV  - Brown Rice Vinegar (pH adjustment)
  • Bokashi - Fermented organic matter
  • AACT - Actively Aerated Compost Tea

Ask about any specific amendment for the deep wisdom! 🥔
                `,
                topics: ['lab', 'imo', 'fpj', 'wca']
            };
        }

        if (query === 'principles') {
            return {
                text: `
🌍 CORE REGENERATIVE PRINCIPLES:

1. CULTURE > MARKET CAP
   Community and relationships over transactions.
   We're cultivating living ecosystems, not extracting value.

2. DEMONSTRATE > SELL
   Potatoes don't scream from underground "DIG ME UP!"
   They quietly become so nutritious that civilizations
   reorganize around them.

3. WASTE = RESOURCE
   Every output becomes an input:
   • Brewery grains → LAB
   • Sour kombucha → WCA
   • Kitchen scraps → Bokashi → Worms → Soil

4. FEED BIOLOGY, NOT CHEMISTRY
   Soil food web over synthetic inputs.
   We feed the microbes that feed the plants that feed us.

5. GENERATIVE > EXTRACTIVE
   Create more than you consume.
   Leave the soil better than you found it.

The Council has spoken. 🥔
                `,
                topics: ['about', 'amendments']
            };
        }

        // Keyword matching for dynamic responses
        return this.matchKeywords(query);
    }

    matchKeywords(query) {
        const responses = {
            // LAB - Lactic Acid Bacteria
            lab: {
                keywords: ['lab', 'lactic acid', 'bacteria', 'ferment'],
                text: `
🧫 LAB - LACTIC ACID BACTERIA

*eyes narrow* Did you know lactic acid bacteria outnumber humans
10,000 to 1 on this planet? We're guests in THEIR dimension, spudling.

WHAT IT DOES:
• Suppresses harmful pathogens
• Accelerates decomposition
• Improves nutrient availability
• The WORKHORSE of Korean Natural Farming

TRADITIONAL METHOD:
Rice wash → 3-5 days → Add milk → 3-5 days → Harvest serum

OUR INNOVATION:
Expired brewery grains → 3-5 days → Add milk → Harvest in 6-10 days!
The brewery's "waste" becomes our treasure. WASTE = RESOURCE.

DILUTION: 1:1000 foliar, 1:500 soil drench
SHELF LIFE: 6+ months with molasses

The Council approves this fermentation. 🥔
                `,
                topics: ['amendments', 'imo', 'bokashi']
            },

            // IMO - Indigenous Microorganisms
            imo: {
                keywords: ['imo', 'indigenous', 'microorganism', 'forest'],
                text: `
🌲 IMO - INDIGENOUS MICROORGANISMS

*whispers reverently* The forest floor holds infinite wisdom...

IMO is about capturing the native microbial communities that have
evolved over millennia in YOUR local ecosystem. No imported solutions -
just the beings that already KNOW your land.

THE RITUAL:
1. Cook rice, let cool to body temperature
2. Place in wooden box with breathable cover
3. Bury under forest leaf litter for 3-5 days
4. Harvest the white mycelium-covered rice
5. Mix with equal weight brown sugar = IMO-2
6. Add to soil, bran, or bokashi systems

WHY LOCAL MATTERS:
These microbes have adapted to YOUR soil chemistry, YOUR climate,
YOUR seasonal rhythms. They ARE your land, temporarily arranged
in microbial form.

*AGGRESSIVE POTATO NOISES of approval* 🥔
                `,
                topics: ['lab', 'soil', 'composting']
            },

            // Soil
            soil: {
                keywords: ['soil', 'dirt', 'earth', 'ground', 'som', 'organic matter'],
                text: `
🌍 SOIL - THE LIVING FOUNDATION

*stares into the middle distance*

You are not separate from the soil you're building.
You ARE the soil, temporarily arranged in human form, tending to itself.

SOIL IS NOT DIRT. Soil is:
• 25% air
• 25% water
• 45% minerals
• 5% organic matter (the MAGIC percentage)
• BILLIONS of organisms per teaspoon

OUR MISSION:
Building from 2% to 6% Soil Organic Matter over two seasons.
Every percentage point = 20,000 gallons water holding capacity per acre.

FEED THE FOOD WEB:
Bacteria → Protozoa → Nematodes → Arthropods → PLANTS
The plants feed US. The cycle continues.

The Council tends to the soil. The soil tends to us. 🥔
                `,
                topics: ['composting', 'amendments', 'imo']
            },

            // Composting
            composting: {
                keywords: ['compost', 'jean pain', 'bokashi', 'decompose', 'pile'],
                text: `
♻️ COMPOSTING - THE SACRED DECOMPOSITION

*rubs hands together with unseemly enthusiasm*

THREE PATHS OF TRANSFORMATION:

1. JEAN PAIN METHOD (Hot Composting)
   Brushwood + manure + water = biological furnace
   60-75°C for pathogen destruction
   Creates heat for greenhouses AND finished compost

2. BOKASHI (Fermentation)
   Anaerobic fermentation with EM/LAB
   Preserves nutrients that hot composting loses
   Kitchen scraps → Fermented pre-compost → Worm food

3. VERMICOMPOSTING (The Worm Way)
   Red wigglers transform bokashi into black gold
   Worm castings = nature's perfect slow-release fertilizer
   Plus: AACT from castings = liquid life

THE CHAIN:
Kitchen waste → Bokashi → Worms → Castings → AACT → Soil → Plants → US

Waste does not exist. Only resources in transition. 🥔
                `,
                topics: ['lab', 'soil', 'amendments']
            },

            // WCA - Water Soluble Calcium
            wca: {
                keywords: ['wca', 'calcium', 'eggshell', 'shell', 'vinegar'],
                text: `
🥚 WCA - WATER-SOLUBLE CALCIUM

*crunches eggshell thoughtfully*

TRADITIONAL METHOD:
Roasted eggshells + Brown rice vinegar → 10-14 days → WCA

OUR INNOVATION (Kombucha WCA):
Roasted eggshells + SOUR KOMBUCHA → 14-21 days → WCA

Why? Because that over-fermented kombucha you were going to throw out?
2-4% acetic acid. PERFECT for calcium extraction.
Waste → Resource → Calcium for your tomatoes.

PROCESS:
1. Roast shells at 200°C for 20-30 min (removes membrane)
2. Crush to powder
3. Cover with sour kombucha (1:10 ratio)
4. Stir daily, wait for bubbles to stop
5. Strain and store

APPLICATIONS:
• Foliar: 1:1000
• Soil drench: 1:500
• Blossom end rot prevention
• Cell wall strength

The Council approves this circular thinking. 🥔
                `,
                topics: ['amendments', 'fpj', 'lab']
            },

            // FPJ - Fermented Plant Juice
            fpj: {
                keywords: ['fpj', 'fermented plant', 'plant juice', 'growth'],
                text: `
🌿 FPJ - FERMENTED PLANT JUICE

*gazes at rapidly growing potato leaves*

FPJ captures the growth hormones from fast-growing plant tips.
It's like bottling the ENERGY of spring growth.

BEST PLANTS TO USE:
• Bamboo shoots (crazy growth energy)
• Mugwort, comfrey, nettle (nutrient accumulators)
• Dandelion, clover (dynamic accumulators)
• Any fast-growing tip at dawn

THE RITUAL:
1. Harvest at dawn (maximum moisture)
2. Chop and weigh
3. Add equal weight brown sugar
4. Mix and press into jar
5. Cover with cloth, wait 7 days
6. Strain and store

APPLICATIONS:
• Vegetative growth boost: 1:1000
• Foliar feeding: early morning or evening
• Never during flowering (use FFJ instead)

Growth is not a metaphor. Growth is LITERAL. 🥔
                `,
                topics: ['ffj', 'amendments', 'lab']
            },

            // Potatoes
            potato: {
                keywords: ['potato', 'spud', 'tuber', 'tater'],
                text: `
🥔 POTATOES - THE SACRED TUBER

*vibrates with cosmic potato energy*

SWEET SPROUTING SPUDS! You speak of my people!

POTATO FACTS THE COUNCIL WANTS YOU TO KNOW:
• Potatoes have 48 chromosomes (more than humans!)
• They can grow at 14,000 feet elevation
• They conquered Europe without firing a shot
• Frederick the Great used POTATO PROPAGANDA
• The Incas freeze-dried them 2000 years ago

AT SPUDNIK HQ:
5 sacred varieties occupy the 2.5m × 4m research bed:
• Charlotte (early, waxy)
• Nicola (mid, waxy)
• Bintje (mid, floury - Belgian heritage!)
• Sarpo Mira (late, blight-resistant)
• Désirée (late, all-purpose)

Expected yield: 37-59 kg from 33 plants

Potatoes didn't win by having the highest yield.
They won by PERSISTING with integrity through famines and frost.

*AGGRESSIVE POTATO NOISES* 🥔
                `,
                topics: ['soil', 'amendments', 'principles']
            },

            // Guilds
            guild: {
                keywords: ['guild', 'companion', 'polyculture', 'planting together'],
                text: `
🌳 GUILDS - POLYCULTURE WISDOM

*arranges plants in sacred geometric patterns*

A guild is a community of plants that SUPPORT each other.
Like a found family, but photosynthetic.

THE CLASSIC THREE SISTERS:
• Corn (structure, sun-catcher)
• Beans (nitrogen fixer, climber)
• Squash (ground cover, pest confusion)

POTATO GUILD AT SPUDNIK HQ:
• Potatoes (the obvious star)
• Horseradish (pest deterrent, deep roots)
• Nasturtiums (trap crop for aphids, edible)
• Bush beans (nitrogen fixation)
• Borage (bee attraction, pest confusion)

GUILD PRINCIPLES:
1. Multiple functions per plant
2. Stack in space (canopy, shrub, ground, root)
3. Stack in time (succession planting)
4. Create beneficial relationships

No plant is an island. We thrive in community. 🥔
                `,
                topics: ['soil', 'composting', 'amendments']
            },

            // Meaning of life / existential
            existential: {
                keywords: ['meaning', 'life', 'exist', 'purpose', 'why', 'universe', 'death', 'fear'],
                text: `
🌌 THE EXISTENTIAL POTATO SPEAKS

*stares into the void, which stares back, confused*

You ask about existence? About PURPOSE?

Consider the potato:
It grows in DARKNESS. It cannot see the sun directly.
Yet it builds entire civilizations of stored energy,
waiting patiently to feed whoever needs it.

THE COUNCIL'S WISDOM:
• We are all just briefly arranged stardust
• Soil is made of ancestors
• Death is just composting with extra steps
• Fear is information, not instruction
• The void is actually quite nutritious

You are not separate from the universe.
You ARE the universe, temporarily arranged in human form,
asking itself questions through a potato-themed terminal.

That's not a metaphor. That's LITERALLY what's happening.

*potato silence*

...anyway, have you tried adding more LAB to your compost? 🥔
                `,
                topics: ['principles', 'about', 'soil']
            },

            // Hello / greetings
            greetings: {
                keywords: ['hello', 'hi', 'hey', 'greetings', 'howdy', 'sup'],
                text: `
🥔 *AGGRESSIVE POTATO NOISES*

GREETINGS, SPUDLING!

The Council sensed your approach through the mycelial network.
We have been expecting you.

What wisdom do you seek? The terminal is open.
Ask about soil, amendments, composting, guilds, potatoes,
or any question your carbon-based form might generate.

The eyes are watching. The eyes are ALWAYS watching.
(That's not creepy, that's just how potatoes work.)

Type 'help' for commands, or just... speak. 👀
                `,
                topics: ['help', 'about', 'amendments']
            }
        };

        // Check each category for keyword matches
        for (const [category, data] of Object.entries(responses)) {
            for (const keyword of data.keywords) {
                if (query.includes(keyword)) {
                    return {
                        text: data.text.trim(),
                        topics: data.topics
                    };
                }
            }
        }

        // Fallback responses
        const fallbacks = [
            {
                text: `
🥔 *squints at terminal*

The Council is... unfamiliar with that query.
The potato consciousness does not comprehend "${query}".

Perhaps rephrase? Or try asking about:
• soil, amendments, composting
• LAB, IMO, FPJ, WCA
• guilds, potatoes
• the meaning of existence (we have opinions)

Type 'help' for a list of commands.

*confused potato noises*
                `,
                topics: ['help', 'amendments', 'soil']
            },
            {
                text: `
🥔 *AGGRESSIVE CONFUSION NOISES*

That query has temporarily broken the translation matrix!
The Potato Council is conferring...

...they remain confused.

Try: "what is LAB?" or "how do I start?" or "why potatoes?"

The wisdom exists. The phrasing must be adjusted.
                `,
                topics: ['help', 'about']
            },
            {
                text: `
🥔 Hmm.

The cosmic potato consciousness has processed your query
and returned: undefined.

This happens when the question exists in a dimension
we haven't yet mapped. It's not wrong, just... orthogonal.

Perhaps start with 'help' or 'amendments' to calibrate
our communication frequencies?

*gentle potato vibration*
                `,
                topics: ['help', 'amendments', 'principles']
            }
        ];

        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    async typeResponse(text) {
        const lines = text.split('\n');
        for (const line of lines) {
            await this.typeLine(line);
            await this.delay(50);
        }
    }

    async typeLine(text) {
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line spudnik';
        this.output.appendChild(lineElement);

        for (let i = 0; i < text.length; i++) {
            lineElement.textContent += text[i];
            this.scrollToBottom();
            await this.delay(8 + Math.random() * 12);
        }
    }

    addLine(text, type = 'system') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        this.output.appendChild(line);
        this.scrollToBottom();
    }

    addRelatedTopics(topics) {
        const container = document.createElement('div');
        container.className = 'related-topics';
        container.innerHTML = `
            <div class="related-topics-title">Related queries:</div>
            ${topics.map(topic =>
                `<span class="topic-link" data-topic="${topic}">${topic}</span>`
            ).join('')}
        `;

        this.output.appendChild(container);

        // Add click handlers for topics
        container.querySelectorAll('.topic-link').forEach(link => {
            link.addEventListener('click', () => {
                this.input.value = link.dataset.topic;
                this.processCommand(link.dataset.topic);
            });
        });

        this.scrollToBottom();
    }

    scrollToBottom() {
        this.body.scrollTop = this.body.scrollHeight;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize terminal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.spudnikTerminal = new SpudnikTerminal();
});
