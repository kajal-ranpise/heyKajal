import { useEffect } from "react";
import { useSelector } from "react-redux";
import AOS from "aos";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

function Resume() {
  const about = useSelector((state) => state.publicData.about);
  const education = useSelector((state) => state.publicData.education);
  const experience = useSelector((state) => state.publicData.experience);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const contact = [
    about.location && { label: about.location, icon: <GoLocation size={20} /> },
    about.phone && { label: about.phone, icon: <AiOutlinePhone size={20} /> },
    about.email && { label: about.email, icon: <AiOutlineMail size={20} /> },
    about.linkedin && {
      label: "LinkedIn",
      url: about.linkedin,
      icon: <FaLinkedin size={20} />,
    },
    about.github && {
      label: "GitHub",
      url: about.github,
      icon: <FaGithub size={20} />,
    },
  ].filter(Boolean);

  return (
    <main className="main resume-page">
      <section id="resume" className="resume section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Resume</h2>
          <p>Turning ideas into scalable web solutions—here's my journey.</p>
        </div>

        <div className="container">
          <div className="row">
            {/* Left Column */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <h3 className="resume-title">Summary</h3>
              <div className="resume-item pb-0">
                <h4>{about.name || ""}</h4>
                <p>
                  <em>{about.description || ""}</em>
                </p>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  {contact.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      {item.icon && <span>{item.icon}</span>}
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="resume-title">Education</h3>
              {education.map((edu) => (
                <div className="resume-item" key={edu._id}>
                  <h4>{edu.degree}</h4>
                  <h5>{edu.year}</h5>
                  <p>
                    <em>{edu.institute}</em>
                  </p>
                  {edu.description && <p>{edu.description}</p>}
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <h3 className="resume-title">Professional Experience</h3>
              {experience.map((exp) => (
                <div className="resume-item" key={exp._id}>
                  <h4>{exp.title}</h4>
                  <h5>{exp.year}</h5>
                  <p>
                    <em>{exp.company}</em>
                  </p>
                  <ul>
                    {exp.responsibilities.map((res, i) => (
                      <li key={i}>{res}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Resume;
