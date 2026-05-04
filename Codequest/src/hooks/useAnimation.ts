import { useEffect } from "react";

const useAnimation = (callback: () => void) => {

    useEffect(() => {

        let animationFrameId: number; //variável para armazenar o ID da animação, que será usada para cancelar a animação quando o componente for desmontado

        const animate = () => {
            callback(); //chama a função de callback passada como argumento para executar a lógica de animação

            animationFrameId = requestAnimationFrame(animate); //chama a função animate novamente para criar um loop de animação

        };

        animationFrameId = requestAnimationFrame(animate); //chama a função animate pela primeira vez para iniciar a animação

        return () => {
            cancelAnimationFrame(animationFrameId); //cancela a animação quando o componente for desmontado para evitar vazamentos de memória
        }

    }, [callback]); //o array de dependências [callback] garante que a animação seja reiniciada apenas quando a função de callback for alterada, evitando chamadas desnecessárias à função de animação.
}

export default useAnimation;