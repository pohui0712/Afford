import gsap from "gsap";

export const scrollAnimation = (position, target, onUpdate) => {
  const tl = gsap.timeline();

  tl.to(position, {
    x: 3.24,
    y: 1.152,
    z: 5.84,
    scrollTrigger: {
      trigger: "#service",
      start: "top bottom",
      end: "top top",
      scrub: 1,
      immediateRender: false,
    },
    onUpdate,
  })
    .to(target, {
      x: -0.849,
      y: -0.0305,
      z: 0.657,
      scrollTrigger: {
        trigger: "#service",
        start: "top bottom",
        end: "top top",
        scrub: 1,
        immediateRender: false,
      },
    })
    .to("#serviceContent", {
      opacity: 1,
      scrollTrigger: {
        trigger: "#service",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    })
    .to(".webgi-canvas-container", {
      opacity: 0,
      scrollTrigger: {
        trigger: "#planning",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    })
    .to("#planningContent", {
      opacity: 1,
      scrollTrigger: {
        trigger: "#planning",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
};
