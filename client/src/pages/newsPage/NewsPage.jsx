import styles from "./NewsPage.module.css";
import Footer from "../../components/footer/Footer";

export default function NewsPage() {
  return (
    <>
      <section>
        <div className={styles.intro}>
          <div className={styles.textBlock}>
            <h1>
              THIS IS
              <span style={{ color: "var(--primary)" }}> NEWS!</span>
            </h1>
            <p>Stay tuned to keep up to date with all the news!</p>
          </div>
          <img src="megaphone.svg" alt="" className={styles.introImg} />
        </div>
        <img src="maskMeg.svg" alt="" className={styles.mask} />
      </section>
      <section>
        <div className={styles.phoneBlock}>
          <img src="inst.svg" alt="" className={styles.phoneMask1} />
          <img src="pint.svg" alt="" className={styles.phoneMask2} />
          <img src="phone.svg" alt="" className={styles.introImg} />
          <div className={styles.textBlock}>
            <h1>
              STAY IN
              <span style={{ color: "var(--primary)" }}> TOUCH!</span>
            </h1>
            <p>Follow the updates of Summer Camp’24 on networks!</p>
            <div className={styles.imageContainer}>
              <a href="">
                <img src="tg.svg" alt="" className={styles.imgSoc} />
              </a>
              <a href="">
                <img src="inst.svg" alt="" className={styles.imgSoc} />
              </a>
              <a href="">
                <img src="facebook.svg" alt="" className={styles.imgSoc} />
              </a>
              <a href="">
                <img src="pint.svg" alt="" className={styles.imgSoc} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}
