import styles from "./AboutPage.module.css";
import Footer from "../../components/footer/Footer";
import { useMediaQuery } from "react-responsive";

export default function AboutPage() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      <section>
        <div className={styles.intro}>
          <img src="umbrella.svg" alt="" className={styles.introImg} />
          <div className={styles.textBlock}>
            <h1>YOU NEED</h1>
            <h1 style={{ fontWeight: "300" }}>
              VISIT <span style={{ color: "var(--primary)" }}>OUR</span> CAMP
            </h1>
            <p>
              If you've never been to places like this, we'll show you how cool
              it is!
            </p>
          </div>
        </div>
        <img src="maskUmb.svg" alt="" className={styles.introMask} />
      </section>

      <section>
        <div className={styles.descript}>
          <h2>
            MORE than just a
            <span style={{ color: "var(--primary)" }}> Summer Camp!</span>
          </h2>
          {isMobile ? (
            <p>
              A safe and enriching environment for youth to discover their
              passions, build lifelong friendships, and develop essential life
              skills.
            </p>
          ) : (
            <p>
              Summer Camp’24 is an experience that will shape you, challenge
              you, and leave you with memories that will last a lifetime. We aim
              to create a safe, inclusive, and enriching environment where
              individuals can discover their passions, build lifelong
              friendships, and develop essential life skills. We believe in
              empowering youth to embrace their individuality, foster
              creativity, and cultivate a sense of community.
            </p>
          )}

          <img src="camera.svg" alt="" className={styles.descImg} />
        </div>
      </section>

      <img src="maskCal.svg" alt="" className={styles.descMaskRight} />
      <section>
        <div className={styles.descript}>
          <h2>
            How long will <span style={{ color: "var(--primary)" }}>it</span>{" "}
            take?
          </h2>
          {isMobile ? (
            <p>
              Join us from August 2 to 16 for a summer filled with activities
              that will challenge and inspire you.
            </p>
          ) : (
            <p>
              It will be held from August 2 to 16 inclusive. The program
              includes activities that develop your different sides from
              creativity and intelligence to physical activity and
              communication. We offer a variety of workshops, games, trainings,
              sports activities and much more.
            </p>
          )}
          <img src="calender.svg" alt="" className={styles.descImg} />
        </div>
      </section>

      <img src="maskBag.svg" alt="" className={styles.descMaskLeft} />
      <section>
        <div className={styles.descript}>
          <h2>
            What should I take with{" "}
            <span style={{ color: "var(--primary)" }}>Me</span>?
          </h2>
          {isMobile ? (
            <p>
              Pack comfortable, weather-appropriate clothing for outdoor
              activities, including swimsuits. Don’t forget bedding, toiletries,
              insect repellent, and a flashlight.
            </p>
          ) : (
            <p>
              If this is your first time going camping, don't worry. We will
              tell you what you need. We recommend that you bring comfortable
              and weather-appropriate clothing for various outdoor activities,
              including swimsuits. In addition, you will need bedding (sleeping
              bag and pillow), toiletries, sunscreen, insect repellent and a
              flashlight. Optionally, you can take camera, journal, games, and
              books.
            </p>
          )}
          <img src="bag.svg" alt="" className={styles.descImg} />
        </div>
      </section>

      <Footer />
    </>
  );
}
