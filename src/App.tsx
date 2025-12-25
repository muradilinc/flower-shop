// App.tsx
import React, {useEffect, useRef} from "react";
import {motion} from "framer-motion";

const photos = [
    {src: "/photo1.jpeg", text: "Ты словно луч света в этом мире, твоя улыбка озаряет всё вокруг."},
    {src: "/photo2.jpeg", text: "Твои глаза — как загадочные вселенные, в которых хочется теряться."},
    {
        src: "/photo3.jpeg",
        text: "Каждый день я хочу делать всё, чтобы ты улыбалась, потому что твоя радость — моя цель."
    },
    {src: "/photo4.jpeg", text: "Твоя красота вдохновляет меня каждый день быть лучше."},
    {src: "/photo5.jpeg", text: "С наступающим Новым годом! Пусть твоя жизнь будет полна счастья и любви."},
];

const ParallaxSection = ({src, text, reverse,}: {
    src: string;
    text: string;
    reverse?: boolean;
}) => {
    return (
        <section
            className={`relative flex flex-col sm:flex-row items-center justify-center h-auto sm:h-screen px-6 sm:px-16 py-12 sm:py-0 gap-8 ${
                reverse ? "sm:flex-row-reverse" : ""
            }`}
        >
            {/* Фото */}
            <motion.div
                className="w-full sm:w-1/2 h-64 sm:h-full rounded-xl shadow-2xl overflow-hidden"
                initial={{opacity: 0, x: reverse ? 100 : -100}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                transition={{duration: 1}}
            >
                <img
                    src={src}
                    alt="photo"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </motion.div>

            {/* Текст */}
            <motion.div
                className="w-full sm:w-1/2 max-w-lg flex items-center justify-center"
                initial={{opacity: 0, x: reverse ? -100 : 100}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                transition={{duration: 1, delay: 0.3}}
            >
                <p className="text-center sm:text-left text-lg sm:text-2xl font-semibold text-red-500 drop-shadow-[0_0_15px_red] leading-relaxed">
                    {text}
                </p>
            </motion.div>
        </section>
    );
};

const App: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const tryPlay = async () => {
            try {
                await audioRef.current?.play();
            } catch {
                console.log("Autoplay blocked — will start after first click");
            }
        };

        tryPlay();

        const enableSound = () => {
            audioRef.current?.play();
            window.removeEventListener("click", enableSound);
        };

        window.addEventListener("click", enableSound);
    }, []);

    return (
        <div className="bg-[#0D0F1A] text-white py-[30px]">
            <audio
                ref={audioRef}
                src="/runningUpHill.mp3"
                loop
                hidden
            />
            {photos.map((photo, index) => (
                <ParallaxSection
                    key={index}
                    src={photo.src}
                    text={photo.text}
                    reverse={index % 2 !== 0}
                />
            ))}
        </div>
    );
};

export default App;
