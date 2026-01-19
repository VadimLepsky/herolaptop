// src/HeroPage.js
export default function HeroPage() {
  return (
    <div className="w-full h-full overflow-hidden rounded-[14px] bg-black">
      <iframe
        src="https://iframe.mediadelivery.net/embed/574718/2e1ef19b-af2e-4c5b-b1d4-62d6f67882ec?autoplay=true&loop=true&muted=true&preload=true&responsive=false"
        title="Stream video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  )
}
