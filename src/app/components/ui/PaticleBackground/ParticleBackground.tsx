import React, { useRef, useEffect } from 'react';

const ParticleBackground = ({
	color = '#3E63DD',
	count = 50,
	speed = 0.5,
	maxSize = 2,
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
			pulseSpeed: number;
			pulseDirection: number;

			constructor() {
				this.reset();
			}

			reset() {
				this.x = Math.random() * canvas.width;
				this.y = Math.random() * canvas.height;
				this.radius = Math.random() * maxSize;
				this.speedX = (Math.random() - 0.5) * speed;
				this.speedY = (Math.random() - 0.5) * speed;
				this.opacity = Math.random() * 0.4 + 0.05;
				this.pulseSpeed = Math.random() * 0.005 + 0.001;
				this.pulseDirection = 1;
			}

			update() {
				this.x += this.speedX;
				this.y += this.speedY;

				this.opacity += this.pulseSpeed * this.pulseDirection;
				if (this.opacity >= 0.4 || this.opacity <= 0.05) {
					this.pulseDirection *= -1;
				}

				if (this.x < 0) this.x = canvas.width;
				if (this.x > canvas.width) this.x = 0;
				if (this.y < 0) this.y = canvas.height;
				if (this.y > canvas.height) this.y = 0;
			}

			draw(ctx) {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

				const r = parseInt(color.slice(1, 3), 16);
				const g = parseInt(color.slice(3, 5), 16);
				const b = parseInt(color.slice(5, 7), 16);
				ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
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
			className='fixed inset-0 z-0 pointer-events-none opacity-25'
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
