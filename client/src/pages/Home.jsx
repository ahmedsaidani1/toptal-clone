import Hero from "../components/Hero"
import Companies from "../components/Companies"
import Courses from "../components/Courses"
import Achievement from "../components/Achievement"
import Categories from "../components/Categories"
import Feedback from "../components/Feedback"
import CTA from "../components/CTA"
import Price from "../components/Price"


export default function Home() {
  return (
    <div>
      <div id="home" className="pt-[80px]">
        <Hero />
      </div>
       <Companies />
      <div id="courses">
        <Courses />
      </div>
      <div id="achievement">
        <Achievement />
      </div>
      <div id="categories">
        <Categories />
      </div>
      <div id="feedback">
        <Feedback />
      </div>
      <div id="cta">
        <CTA />
      </div>
      <div id="price">
        <Price />
      </div>
    </div>
  );
};
