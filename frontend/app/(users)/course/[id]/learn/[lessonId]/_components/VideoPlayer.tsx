'use client';
import {
  VideoPlayer as ShadcnVideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from '@/components/ui/shadcn-io/video-player';

export const VideoPlayer = ({ lessonData }: { lessonData: any }) => {
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*$/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeVideoId = lessonData.videoUrl ? getYouTubeVideoId(lessonData.videoUrl) : null;

  if (youtubeVideoId) {
    return (
      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  if (lessonData.videoUrl) {
    return (
      <ShadcnVideoPlayer className="overflow-hidden rounded-lg border">
        <VideoPlayerContent
          crossOrigin=""
          preload="auto"
          slot="media"
          src={lessonData.videoUrl}
        />
        <VideoPlayerControlBar>
          <VideoPlayerPlayButton />
          <VideoPlayerSeekBackwardButton />
          <VideoPlayerSeekForwardButton />
          <VideoPlayerTimeRange />
          <VideoPlayerTimeDisplay showDuration />
          <VideoPlayerMuteButton />
          <VideoPlayerVolumeRange />
        </VideoPlayerControlBar>
      </ShadcnVideoPlayer>
    );
  }

  return (
    <div className="bg-black aspect-video relative flex items-center justify-center text-white">
      <p>Nenhum vídeo disponível para esta lição.</p>
    </div>
  );
};
