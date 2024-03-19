import React, { useState, useEffect, useRef } from 'react';

const BallGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [balls, setBalls] = useState<any[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Функция отрисовки шаров
        const drawBalls = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            balls.forEach(ball => {
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                ctx.fillStyle = ball.color;
                ctx.fill();
                ctx.closePath();
            });
        };

        // Обработчик события клика по шару
        const handleBallClick = (event: MouseEvent) => {
            const clickedBall = balls.find(ball => {
                const distance = Math.sqrt((event.offsetX - ball.x) ** 2 + (event.offsetY - ball.y) ** 2);
                return distance <= ball.radius;
            });

            if (clickedBall) {
                // Открываем менюшку для смены цвета шара
                console.log('Меню для смены цвета шара');
            }
        };

        canvas.addEventListener('click', handleBallClick);

        return () => {
            canvas.removeEventListener('click', handleBallClick);
        };
    }, [balls]);

    return (
        <div>
            <canvas ref={canvasRef} width={800} height={600}></canvas>
        </div>
    );
};

export default BallGame;