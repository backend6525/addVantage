import React, { useRef, useEffect } from 'react';

const ParticleBackground = ({
	color = '#4A90E2',
	count = 100,
	speed = 1,
	maxSize = 3,
}) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		// Particles class
		class Particle {
			x: number;
			y: number;
			radius: number;
			speedX: number;
			speedY: number;
			opacity: number;

			constructor() {
				this.reset();
			}

			reset() {
				this.x = Math.random() * canvas.width;
				this.y = Math.random() * canvas.height;
				this.radius = Math.random() * maxSize;
				this.speedX = (Math.random() - 0.5) * speed;
				this.speedY = (Math.random() - 0.5) * speed;
				this.opacity = Math.random() * 0.5 + 0.1;
			}

			update() {
				this.x += this.speedX;
				this.y += this.speedY;

				// Wrap around screen
				if (this.x < 0) this.x = canvas.width;
				if (this.x > canvas.width) this.x = 0;
				if (this.y < 0) this.y = canvas.height;
				if (this.y > canvas.height) this.y = 0;
			}

			draw(ctx) {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${this.opacity})`;
				ctx.fill();
			}
		}

		// Create particles
		const particles = Array.from({ length: count }, () => new Particle());

		// Resize canvas
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		// Animation loop
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			particles.forEach((particle) => {
				particle.update();
				particle.draw(ctx);
			});

			requestAnimationFrame(animate);
		};

		// Setup
		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);
		animate();

		// Cleanup
		return () => {
			window.removeEventListener('resize', resizeCanvas);
		};
	}, [color, count, speed, maxSize]);

	return (
		<canvas
			ref={canvasRef}
			className='fixed inset-0 z-0 pointer-events-none opacity-30'
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				mixBlendMode: 'screen',
			}}
			aria-hidden='true'
		/>
	);
};

export default ParticleBackground;
