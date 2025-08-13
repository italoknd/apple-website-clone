import { useEffect, useRef, useState } from "react";
import { highlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true })); //only plays the video when the user reaches the video container
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [videoId, startPlay, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "#fff",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });

            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      videoId === 0 && anim.restart();

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            highlightsSlides[videoId].videoDuration
        );
      };

      isPlaying ? gsap.ticker.add(animUpdate) : gsap.ticker.remove(animUpdate);
      gsap.ticker.remove(animUpdate);
    }
  }, [videoId, startPlay]);

  const handleLoadedMetadata = (_, event) =>
    setLoadedData((prev) => [...prev, event]);

  const handleProcess = (processType, index) => {
    switch (processType) {
      case "end":
        setVideo((video) => ({ ...video, isEnd: true, videoId: index + 1 }));
        break;

      case "last":
        setVideo((video) => ({ ...video, isLastVideo: true }));
        break;

      case "reset":
        setVideo((video) => ({ ...video, isLastVideo: false, videoId: 0 }));
        break;

      case "play":
        setVideo((video) => ({
          ...video,
          isPlaying: !video.isPlaying,
        }));
        break;

      case "pause":
        setVideo((video) => ({
          ...video,
          isPlaying: !video.isPlaying,
        }));
        break;

      default:
        return video;
    }
  };
  return (
    <>
      <div className="flex items-center md:ml-[18vw]">
        {highlightsSlides.map((list, index) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  ref={(el) => (videoRef.current[index] = el)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onEnded={() =>
                    index !== 3
                      ? handleProcess("end", index)
                      : handleProcess("last")
                  }
                  className={`${
                    list.id === 2 && "translate-x-44"
                  } pointer-events-none`}
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 lef-[5%] z-10 md:ml-5 ml-2">
                {list.textLists.map((text, idx) => (
                  <p key={idx} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="py-5 px-7 flex-center bg-gray-500 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="mx-2 w-3 h-3 bg-gray-300 rounded-full relative cursor-pointer"
            >
              <span
                ref={(el) => (videoSpanRef.current[i] = el)}
                className="absolute h-full w-full rounded-full"
              />
            </span>
          ))}
        </div>

        <div
          className="control-btn cursor-pointer"
          onClick={
            isLastVideo
              ? () => handleProcess("reset")
              : !isPlaying
              ? () => handleProcess("play")
              : () => handleProcess("pause")
          }
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
          />
        </div>
      </div>
    </>
  );
};

export default VideoCarousel;
