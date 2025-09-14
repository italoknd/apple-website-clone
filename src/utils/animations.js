import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export const animateWithGSAP = (target, animationProps, scrollProps) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse", //controla como a animação vai se controlar em quatro estagios da animação

      //1* estagio: Ao entrar no viewport do elemento (no caso do exemplo, a animação reinicia assim que nós chegamos na viewport do elemento)
      //2* estagio: Ao sair da viewport (nesse caso está setado para realizar a animação no reverso)
      //3* estagio: ao reentrar no viewport
      //4* estagio: ao sair novamente
      start: "top 95%", //quando o target estiver com X% de visibilidade na viewport, ativa as animações
      ...scrollProps,
    },
  });
};

export const animateWithGSAPTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );
};
