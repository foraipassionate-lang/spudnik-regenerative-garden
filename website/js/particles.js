/**
 * SPUDNIK FOREST PORTAL - Particle System
 * Creates falling leaves, floating spores, and fireflies
 */

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.warn('Particle canvas not found');
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.running = false;
        this.lastTime = 0;
        this.mouseX = 0;
        this.mouseY = 0;

        // Particle configurations
        this.configs = {
            leaves: {
                count: 35,
                colors: ['#8b4513', '#cd853f', '#daa520', '#b8860b', '#6b4423', '#a0522d'],
                sizeMin: 8,
                sizeMax: 18,
                speedMin: 0.3,
                speedMax: 1.2,
                rotationSpeed: 0.02,
                drift: 1.5,
                type: 'leaf'
            },
            spores: {
                count: 50,
                colors: ['rgba(255,255,255,0.6)', 'rgba(200,255,200,0.4)', 'rgba(255,255,200,0.5)'],
                sizeMin: 1,
                sizeMax: 3,
                speedMin: 0.2,
                speedMax: 0.6,
                direction: 'up',
                type: 'spore'
            },
            fireflies: {
                count: 15,
                colors: ['#ffff00', '#ffd700', '#ffec8b'],
                sizeMin: 2,
                sizeMax: 4,
                speedMin: 0.1,
                speedMax: 0.3,
                pulse: true,
                wander: true,
                type: 'firefly'
            }
        };

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Handle visibility change for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });

        this.createParticles();
        this.start();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];

        // Create leaves
        const leafConfig = this.configs.leaves;
        const leafCount = this.isMobile() ? Math.floor(leafConfig.count / 2) : leafConfig.count;
        for (let i = 0; i < leafCount; i++) {
            this.particles.push(new Particle(leafConfig, this.canvas));
        }

        // Create spores
        const sporeConfig = this.configs.spores;
        const sporeCount = this.isMobile() ? Math.floor(sporeConfig.count / 2) : sporeConfig.count;
        for (let i = 0; i < sporeCount; i++) {
            this.particles.push(new Particle(sporeConfig, this.canvas));
        }

        // Create fireflies (only at night-ish or always for effect)
        const fireflyConfig = this.configs.fireflies;
        const fireflyCount = this.isMobile() ? Math.floor(fireflyConfig.count / 2) : fireflyConfig.count;
        for (let i = 0; i < fireflyCount; i++) {
            this.particles.push(new Particle(fireflyConfig, this.canvas));
        }
    }

    isMobile() {
        return window.innerWidth < 768;
    }

    start() {
        this.running = true;
        this.animate(0);
    }

    pause() {
        this.running = false;
    }

    resume() {
        if (!this.running) {
            this.running = true;
            this.animate(0);
        }
    }

    animate(timestamp) {
        if (!this.running) return;

        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.update(deltaTime, this.canvas, this.mouseX, this.mouseY);
            particle.draw(this.ctx);
        });

        requestAnimationFrame((t) => this.animate(t));
    }
}

class Particle {
    constructor(config, canvas) {
        this.config = config;
        this.canvas = canvas;
        this.type = config.type;
        this.reset(true);
    }

    reset(initial = false) {
        const { sizeMin, sizeMax, speedMin, speedMax, colors } = this.config;

        this.size = sizeMin + Math.random() * (sizeMax - sizeMin);
        this.speed = speedMin + Math.random() * (speedMax - speedMin);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * (this.config.rotationSpeed || 0.02);
        this.opacity = 0.7 + Math.random() * 0.3;

        // Initial position
        if (initial) {
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
        } else {
            if (this.config.direction === 'up') {
                this.x = Math.random() * this.canvas.width;
                this.y = this.canvas.height + 20;
            } else {
                this.x = Math.random() * this.canvas.width;
                this.y = -20;
            }
        }

        // Drift properties for leaves
        this.driftPhase = Math.random() * Math.PI * 2;
        this.driftSpeed = 0.01 + Math.random() * 0.02;

        // Wander properties for fireflies
        this.wanderAngle = Math.random() * Math.PI * 2;
        this.wanderSpeed = 0.02;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update(deltaTime, canvas, mouseX, mouseY) {
        if (this.type === 'leaf') {
            this.updateLeaf(deltaTime, canvas);
        } else if (this.type === 'spore') {
            this.updateSpore(deltaTime, canvas);
        } else if (this.type === 'firefly') {
            this.updateFirefly(deltaTime, canvas, mouseX, mouseY);
        }
    }

    updateLeaf(deltaTime, canvas) {
        // Vertical movement
        this.y += this.speed;

        // Horizontal drift (sine wave)
        this.driftPhase += this.driftSpeed;
        const drift = Math.sin(this.driftPhase) * (this.config.drift || 1);
        this.x += drift * 0.5;

        // Rotation
        this.rotation += this.rotationSpeed;

        // Reset when off screen
        if (this.y > canvas.height + 30) {
            this.reset(false);
        }

        // Wrap horizontally
        if (this.x < -30) this.x = canvas.width + 30;
        if (this.x > canvas.width + 30) this.x = -30;
    }

    updateSpore(deltaTime, canvas) {
        // Float upward
        this.y -= this.speed;

        // Gentle horizontal movement
        this.driftPhase += 0.01;
        this.x += Math.sin(this.driftPhase) * 0.3;

        // Fade as it rises
        const progress = 1 - (this.y / canvas.height);
        this.opacity = Math.max(0, Math.min(1, progress * 1.5));

        // Reset when off screen
        if (this.y < -20) {
            this.reset(false);
        }
    }

    updateFirefly(deltaTime, canvas, mouseX, mouseY) {
        // Random wandering
        this.wanderAngle += (Math.random() - 0.5) * 0.3;
        this.x += Math.cos(this.wanderAngle) * this.speed * 2;
        this.y += Math.sin(this.wanderAngle) * this.speed * 2;

        // Pulsing glow
        this.pulsePhase += 0.05;
        this.opacity = 0.3 + Math.sin(this.pulsePhase) * 0.5 + 0.2;

        // Slight attraction to mouse (very subtle)
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 50) {
            this.x += (dx / dist) * 0.1;
            this.y += (dy / dist) * 0.1;
        }

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) {
            this.wanderAngle = Math.PI - this.wanderAngle;
            this.x = Math.max(0, Math.min(canvas.width, this.x));
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.wanderAngle = -this.wanderAngle;
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        if (this.type === 'leaf') {
            this.drawLeaf(ctx);
        } else if (this.type === 'spore') {
            this.drawSpore(ctx);
        } else if (this.type === 'firefly') {
            this.drawFirefly(ctx);
        }

        ctx.restore();
    }

    drawLeaf(ctx) {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw leaf shape
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(
            this.size * 0.8, -this.size * 0.5,
            this.size * 0.8, this.size * 0.5,
            0, this.size
        );
        ctx.bezierCurveTo(
            -this.size * 0.8, this.size * 0.5,
            -this.size * 0.8, -this.size * 0.5,
            0, -this.size
        );
        ctx.fill();

        // Draw stem/vein
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(0, this.size);
        ctx.stroke();
    }

    drawSpore(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    drawFirefly(ctx) {
        // Outer glow
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 4
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.3, 'rgba(255, 255, 0, 0.3)');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particle system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('particle-canvas')) {
        window.particleSystem = new ParticleSystem('particle-canvas');
    }
});
