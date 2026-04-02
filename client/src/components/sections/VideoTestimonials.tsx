// VideoTestimonials — UBC Unlimited
// Carousel of YouTube video testimonials with thumbnail + play button.
// Usage: <VideoTestimonials videos={[...]} />

import { useState } from "react";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";

export interface VideoTestimonial {
  /** YouTube video ID (e.g. "dQw4w9WgXcQ") */
  youtubeId: string;
  /** Business/client name shown as caption */
  clientName: string;
  /** Optional short quote or description */
  quote?: string;
  /** Optional duration label e.g. "2:08" */
  duration?: string;
}

interface VideoTestimonialsProps {
  videos: VideoTestimonial[];
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export default function VideoTestimonials({
  videos,
  title = "What Our Clients Are Saying",
  subtitle,
  dark = false,
}: VideoTestimonialsProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  const visible = 3;
  const canPrev = startIndex > 0;
  const canNext = startIndex + visible < videos.length;

  const visibleVideos = videos.slice(startIndex, startIndex + visible);

  return (
    <section className={`py-16 ${dark ? "bg-[#080808]" : "bg-white"}`}>
      <div className="container">
        <div className="text-center mb-10">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-3 ${dark ? "text-white" : "text-[#080808]"}`}
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className={`text-base max-w-xl mx-auto ${dark ? "text-white/60" : "text-gray-600"}`}>
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative">
          {/* Navigation */}
          {videos.length > visible && (
            <>
              <button
                onClick={() => setStartIndex((i) => Math.max(0, i - 1))}
                disabled={!canPrev}
                aria-label="Previous testimonials"
                className={`absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  canPrev
                    ? "border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10"
                    : "border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setStartIndex((i) => Math.min(videos.length - visible, i + 1))}
                disabled={!canNext}
                aria-label="Next testimonials"
                className={`absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  canNext
                    ? "border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10"
                    : "border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Video cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleVideos.map((v) => (
              <VideoCard
                key={v.youtubeId}
                video={v}
                dark={dark}
                onPlay={() => setActiveVideo(v.youtubeId)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            aria-label="Close video"
            className="absolute top-4 right-4 text-white/70 hover:text-white"
          >
            <X size={28} />
          </button>
          <div
            className="w-full max-w-3xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="Client testimonial video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}

function VideoCard({
  video,
  dark,
  onPlay,
}: {
  video: VideoTestimonial;
  dark: boolean;
  onPlay: () => void;
}) {
  return (
    <div
      className={`rounded-xl overflow-hidden border transition-all cursor-pointer group ${
        dark ? "border-white/10 bg-white/[0.03] hover:border-[#c9a84c]/40" : "border-gray-100 bg-[#f8fafc] hover:border-[#c9a84c]/40 hover:shadow-md"
      }`}
      onClick={onPlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onPlay()}
      aria-label={`Play testimonial from ${video.clientName}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-black">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={`Video testimonial from ${video.clientName}`}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          loading="lazy"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#c9a84c] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play size={22} className="text-[#080808] ml-1" fill="currentColor" aria-hidden="true" />
          </div>
        </div>
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        )}
      </div>

      {/* Caption */}
      <div className="p-4">
        <p
          className={`text-sm font-semibold ${dark ? "text-white" : "text-[#080808]"}`}
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          {video.clientName}
        </p>
        {video.quote && (
          <p className={`text-xs mt-1 leading-relaxed ${dark ? "text-white/70" : "text-gray-600"}`}>
            {video.quote}
          </p>
        )}
      </div>
    </div>
  );
}
