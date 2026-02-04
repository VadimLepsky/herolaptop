// src/HeroPage.js
export default function HeroPage() {
  return (
    <div className="w-full h-full overflow-hidden rounded-[14px] bg-black">
      <iframe
        src="https://iframe.mediadelivery.net/embed/574718/825b3059-4508-4ae5-adc7-72b00d859099?autoplay=true&loop=true&muted=true&preload=true&responsive=false"
        title="Stream video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  )
}
