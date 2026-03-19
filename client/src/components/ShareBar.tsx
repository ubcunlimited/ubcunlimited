// Design: UBC Unlimited — deep black / gold palette
// ShareBar — inline share row for blog posts: LinkedIn, Facebook, copy-link

import { useState } from "react";
import { Linkedin, Facebook, Link2, Check } from "lucide-react";

interface ShareBarProps {
  title: string;
  /** Absolute URL of the page being shared. Falls back to window.location.href. */
  url?: string;
}

export default function ShareBar({ title, url }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const pageUrl =
    url ?? (typeof window !== "undefined" ? window.location.href : "");

  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);

  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = pageUrl;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex items-center gap-3 pt-6 mt-8 border-t border-gray-100">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">
        Share
      </span>

      {/* LinkedIn */}
      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0A66C2] text-white text-xs font-semibold hover:bg-[#004182] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2"
      >
        <Linkedin size={13} aria-hidden="true" />
        LinkedIn
      </a>

      {/* Facebook */}
      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1877F2] text-white text-xs font-semibold hover:bg-[#0b5fcc] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] focus-visible:ring-offset-2"
      >
        <Facebook size={13} aria-hidden="true" />
        Facebook
      </a>

      {/* Copy link */}
      <button
        onClick={handleCopy}
        aria-label={copied ? "Link copied!" : "Copy link to clipboard"}
        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 ${
          copied
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-gray-100 text-gray-600 hover:bg-[#c9a84c]/10 hover:text-[#c9a84c] border border-gray-200"
        }`}
      >
        {copied ? (
          <>
            <Check size={13} aria-hidden="true" />
            Copied!
          </>
        ) : (
          <>
            <Link2 size={13} aria-hidden="true" />
            Copy link
          </>
        )}
      </button>
    </div>
  );
}
