import "./home.css";
import NavBar from '../../components/nav-bar/NavBar';

const HomePage = () => {
  return (
    <main>
      <NavBar />
      <div className="home-container">
        <div className="left-side">
          <h1>Welcome to Nss</h1>
          <p>National service scheme (NSS) is a central sector scheme of the Government of India, Ministry of youth affairs & sports. It produces opportunity to the student youth to take part in various government led community services and program. With this organization the students are able to build their character, maintain discipline, create leadership and become a person who understand human nature.</p>
          <h1>Motto</h1>
          <p>The Motto of NSS "Not Me But You", reflects the essence of democratic living and upholds the need for self-less service. NSS helps the students development & appreciation to other person's point of view and also show consideration towards other living beings.</p>
        </div>
        <div className="right-side">
          <div className="right-side-logo">

            <img
              src="https://www.kmctartskuttippuram.org/images/student-subcat/imageimageb13fe39cb1dd9ba9678a02c0b1c43fe6fbf8f667.jpg"
              alt="Logo"
              style={{ height: "230px", paddingLeft: "40px" }}
            />

          </div>
          <h1>A brief history of unit 325</h1>
          <p>The National Service Scheme (NSS) at KMCT Arts and Science College is a part of the nationwide NSS program initiated by the Government of India. The NSS aims to promote a sense of social responsibility and leadership among students by engaging them in community service and development activities.
            At KMCT Arts and Science College, the NSS unit typically undertakes a variety of activities that contribute to social welfare and personal development.</p>

        </div>
      </div>
    </main>
  );
};

export default HomePage;
