import AboutMe from "./Folds/AboutMe";
import Banner from "./Folds/Banner";
import Blogs from "./Folds/Blogs";
import Experience from "./Folds/Experience";
import GitHubGraph from "./Folds/Github";
import Profile from "./Folds/Profile";
import Project from "./Folds/Project";
import Quote from "./Folds/Quote";
import Techstack from "./Folds/TechStack";
import Footer from "./Folds/Footer";
import PageScrollerPointer from "../../components/PageScrollerPointer";

export default function Home() {
  return (
    <>
      <div className="py-2 pb-10">
        <div className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-7xl pointer-events-none z-40 hidden xl:block">
          <div className="relative w-full h-0">
            <PageScrollerPointer className="absolute right-10 top-0 pointer-events-auto" />
          </div>
        </div>
        <Banner />
        <div id="profile">
          <Profile />
        </div>
        <div id="aboutMe">
          <AboutMe />
        </div>
        <div id="github">
          <GitHubGraph />
        </div>
        <div id="techstack">
          <Techstack />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="projects">
          <Project />
        </div>
        <div id="blogs">
          <Blogs />
        </div>
        <div id="quote">
          <Quote />
        </div>
        <Footer />
      </div>
    </>
  );
}
