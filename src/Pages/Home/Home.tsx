import AboutMe from "./Folds/AboutMe";
import Banner from "./Folds/Banner";
import ProfileSection from "./Folds/Profile";

export default function Home() {
  return (
    <>
      <div className="py-2  ">
        <Banner />
        <ProfileSection />
        <AboutMe />
      </div>
    </>
  );
}
