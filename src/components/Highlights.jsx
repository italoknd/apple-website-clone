import { rightImg, watchImg } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import VideoCarousel from "./VideoCarousel";

const Hightlights = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    });

    gsap.to(".link", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25, //delay animations between the containers
    });
  }, []);
  return (
    <div
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc-800"
    >
      <div className="screen-max-width mb-12 w-full md:flex items-center justify-between">
        <h1 id="title" className="section-heading">
          Get the highlights.
        </h1>
        <div className="flex flex-wrap items-end gap-5">
          <div className="flex items-center gap-2 link">
            <p>Watch the film</p>
            <img src={watchImg} alt="watch" />
          </div>
          <div className="flex items-center gap-2 link">
            <p>Watch the event</p>
            <img src={rightImg} alt="right" />
          </div>
        </div>
      </div>

      <VideoCarousel />
    </div>
  );
};

export default Hightlights;
