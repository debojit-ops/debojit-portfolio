import Marquee from "../components/Marquee";
import { reviews } from "../constants";
import { Particles } from "../components/Particles";
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className="relative h-full w-64 cursor-pointer overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "linear-gradient(160deg, #161a31 0%, #06091f 100%)",
        border: "1px solid rgba(122,87,219,0.18)",
        boxShadow: "0 0 0 0 rgba(122,87,219,0), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.border = "1px solid rgba(122,87,219,0.45)";
        e.currentTarget.style.boxShadow = "0 0 24px rgba(122,87,219,0.15), inset 0 1px 0 rgba(255,255,255,0.06)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = "1px solid rgba(122,87,219,0.18)";
        e.currentTarget.style.boxShadow = "0 0 0 0 rgba(122,87,219,0), inset 0 1px 0 rgba(255,255,255,0.05)";
      }}
    >
      {/* Top accent */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(122,87,219,0.4), transparent)" }} />

      <div className="flex flex-row items-center gap-2.5 mb-3">
        <img
          className="rounded-full"
          style={{ border: "1px solid rgba(122,87,219,0.25)", background: "rgba(122,87,219,0.1)" }}
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-white leading-tight">
            {name}
          </figcaption>
          <p className="text-[11px] text-lavender/50">{username}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full mb-3" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />

      <blockquote className="text-xs text-neutral-400 leading-relaxed">{body}</blockquote>
    </figure>
  );
};

export default function Testimonial() {
  return (
    <div className="relative items-start mt-25 md:mt-35 c-space">
      <Particles className="absolute inset-0 -z-10" quantity={120} ease={80} color="#ffffff" refresh />
      <h2 className="text-heading">Beyond Work</h2>
      <div className="relative flex flex-col items-center justify-center w-full mt-12 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none bg-gradient-to-r from-primary"></div>
        <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none bg-gradient-to-l from-primary"></div>
      </div>
    </div>
  );
}
