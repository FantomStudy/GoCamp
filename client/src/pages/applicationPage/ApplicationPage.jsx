import styles from "./ApplicationPage.module.css";
import { useState } from "react";
import { InputMask } from "primereact/inputmask";
import { toast } from "react-toast";
import Footer from "../../components/footer/Footer";
import axios from "axios";

export default function ApplicationPage() {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value.replace(/^\w/, (match) => match.toUpperCase()), //Первая буква большая всегда
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/register",
          data
        );
        console.log("Success", response.data);
        toast.success("Successfully, сheck your email!");
      } catch (error) {
        if ((error.response.message = { message: "Email already exist" })) {
          toast.error("This Email already exist!");
          console.error("Fatal", error);
        }
      }
    }
    // console.log(errors);
  };

  const validateForm = () => {
    const newErrors = {};

    if (
      !data.firstName.trim() ||
      !data.lastName.trim() ||
      !data.dateOfBirth ||
      !data.phone ||
      !data.email.trim()
    ) {
      newErrors.fields = "All fields should not be empty!";
      toast.error("All fields should not be empty!");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Enter the correct email address";
      toast.error("Enter the correct email address");
    } else if (!isValidDate(data.dateOfBirth)) {
      newErrors.dateOfBirth = "Enter a date in dd/mm/yyyy format";
      toast.error("Enter the past date in dd/mm/yyyy format");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidDate = (dateString) => {
    const dateParts = dateString.split("/");

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Month is zero-indexed
    const year = parseInt(dateParts[2], 10);

    return (
      !isNaN(day) &&
      !isNaN(month) &&
      !isNaN(year) &&
      day > 0 &&
      day <= 31 &&
      month >= 0 &&
      month <= 11 &&
      year >= 1900 &&
      new Date(year, month, day) < new Date()
    );
  };

  return (
    <>
      <section className={styles.authSect}>
        <h1 className={styles.head}>Registration of applications!</h1>
        <div className={styles.container}>
          <form className={styles.appForm} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              value={data.firstName}
              onInput={handleInputChange}
              autoSave="on"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={data.lastName}
              onChange={handleInputChange}
              autoSave="on"
            />
            <InputMask
              mask="99/99/9999"
              placeholder="dd/mm/yyyy"
              name="dateOfBirth"
              value={data.dateOfBirth}
              onChange={handleInputChange}
              autoSave="on"
              autoComplete="off"
            />
            <InputMask
              mask="+7(999)999-9999"
              placeholder="+7(000)000-0000"
              name="phone"
              value={data.phone}
              onChange={handleInputChange}
              autoSave="on"
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleInputChange}
              autoSave="on"
            />
            <button type="submit">Submit</button>
          </form>
          <img className={styles.image} src="travel.svg" alt="" />
        </div>
      </section>
      <img src="travelMask.svg" alt="" className={styles.mask} />
      <Footer />
    </>
  );
}
