import AboutMe from "./Folds/AboutMe";
import Banner from "./Folds/Banner";
import Blogs from "./Folds/Blogs";
import Experience from "./Folds/Experience";
import GitHubGraph from "./Folds/Github";
import Profile from "./Folds/Profile";
import Project from "./Folds/Project";
import Quote from "./Folds/Quote";

export default function Home() {
  return (
    <>
      <div className="py-2 pb-60 ">
        <Banner />
        <Profile />
        <AboutMe />
        <GitHubGraph />
        <Experience />
        <Project />
        <Blogs />
        <Quote />
      </div>
    </>
  );
}
