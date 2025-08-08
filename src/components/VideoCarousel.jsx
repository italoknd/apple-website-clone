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
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }));
      },
    });
    
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.lenght > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [videoId, startPlay, isPlaying, loadedData]);

  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {},
        onComplete: () => {},
      });
    }
  }, [videoId, startPlay]);

  const handleLoadedMetadata = (index, event) =>
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
          isPlaying: false,
          videoId: index + 1,
        }));
        break;

      default:
        return video;
    }
  };
  return (
    <>
      <div className="flex items-center">
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
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 lef-[5%] z-10 ml-10">
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
