import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";
import { Particles } from "../components/Particles";

const Experiences = () => (
  <div className="relative w-full">
    <Particles className="absolute inset-0 -z-10" quantity={120} ease={80} color="#ffffff" refresh />
    <Timeline data={experiences} />
  </div>
);

export default Experiences;