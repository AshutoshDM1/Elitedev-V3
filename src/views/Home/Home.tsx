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

export default function Home() {
  return (
    <>
      <div className="py-2 pb-10">
        <Banner />
        <Profile />
        <AboutMe />
        <GitHubGraph />
        <Techstack />
        <Experience />
        <Project />
        <Blogs />
        <Quote />
        <Footer />
      </div>
    </>
  );
}
