"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import InfiniteScroll from 'react-infinite-scroll-component';

// Dummy data for sermons (extended list)
const sermonsData = [
  {
    id: 1,
    title: 'Sermon One',
    description: 'This is a brief description of Sermon One.',
    videoId: 'Vr9WoWXkKeE',
    thumbnail: '/assets/images/videos/video-img4.png',
  },
  {
    id: 2,
    title: 'Sermon Two',
    description: 'This is a brief description of Sermon Two.',
    videoId: 'abc123XYZ',
    thumbnail: '/assets/images/videos/video-img4.png',
  },
  {
    id: 3,
    title: 'Sermon Three',
    description: 'This is a brief description of Sermon Three.',
    videoId: 'def456LMN',
    thumbnail: '/assets/images/videos/video-img4.png',
  },
  {
    id: 4,
    title: 'Sermon Four',
    description: 'This is a brief description of Sermon Four.',
    videoId: 'videoId4',
    thumbnail: '/assets/images/videos/video-img4.png',
  },
  {
    id: 5,
    title: 'Sermon Five',
    description: 'This is a brief description of Sermon Five.',
    videoId: 'videoId5',
    thumbnail: '/assets/images/videos/video-img4.png',
  },
  {
    id: 6,
    title: 'Sermon Six',
    description: 'This is a brief description of Sermon Six.',
    videoId: 'videoId6',
    thumbnail: '/assets/images/videos/video-img4.png',
  },
  {
    id: 7,
    title: 'Sermon Seven',
    description: 'This is a brief description of Sermon Seven.',
    videoId: 'videoId7',
    thumbnail: '/assets/images/videos/video-img4.png',
  },
  {
    id: 8,
    title: 'Sermon Eight',
    description: 'This is a brief description of Sermon Eight.',
    videoId: 'videoId8',
    thumbnail: '/assets/images/videos/video-img4.png',
  },
  {
    id: 9,
    title: 'Sermon Nine',
    description: 'This is a brief description of Sermon Nine.',
    videoId: 'videoId9',
    thumbnail: '/assets/images/videos/video-img4.png',
  },
  {
    id: 10,
    title: 'Sermon Ten',
    description: 'This is a brief description of Sermon Ten.',
    videoId: 'videoId10',
    thumbnail: '/assets/images/videos/video-img4.png',
  },
];

const VideoContent = () => {
  // State to track the currently active video for the modal
  const [activeVideo, setActiveVideo] = useState(null);
  // State to track how many sermons are visible; initially show 3
  const [visible, setVisible] = useState(3);

  // Handler to load more sermons when scrolled to the bottom
  const fetchMoreData = () => {
    // Simulate async loading with a timeout (if needed)
    setTimeout(() => {
      setVisible((prevVisible) => prevVisible + 3);
    }, 500);
  };

  return (
    <div className="container my-5">
      <InfiniteScroll
        dataLength={visible} // This is important to render the next batch
        next={fetchMoreData}
        hasMore={visible < sermonsData.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="row g-4">
          {sermonsData.slice(0, visible).map((sermon) => (
            <div className="col-xxl-12" key={sermon.id}>
              <div className="card h-100 p-0">
                <div className="card-header border-bottom bg-base py-16 px-24">
                  <h6 className="text-lg fw-semibold mb-0">{sermon.title}</h6>
                </div>
                <div className="card-body p-24">
                  <div className="position-relative">
                    <img
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      className="w-100 h-100 object-fit-cover radius-8"
                    />
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveVideo(sermon.videoId);
                      }}
                      className="magnific-video bordered-shadow w-56-px h-56-px bg-white rounded-circle d-flex justify-content-center align-items-center position-absolute start-50 top-50 translate-middle z-1"
                    >
                      <Icon icon="ion:play" className="text-primary-600 text-xxl" />
                    </Link>
                  </div>
                  <div className="mt-3">
                    <p>{sermon.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>

      {/* ModalVideo shows the currently active video */}
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={activeVideo !== null}
        videoId={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
};

export default VideoContent;