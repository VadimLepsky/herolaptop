// src/HeroPage.js
export default function HeroPage() {
  return (
    <div className="w-full h-full overflow-hidden rounded-[14px] bg-black">
      <iframe
        src="https://iframe.videodelivery.net/b73e4bb737df2f222da96cba765e87d1?autoplay=true&muted=true&loop=true&controls=false"
        title="Stream video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  )
}
