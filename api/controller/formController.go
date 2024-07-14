package controller

import (
	"github.com/FantomStudy/GoCamp/database"
	"github.com/FantomStudy/GoCamp/models"
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/go-mail/mail"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func validateEmail(email string) bool{
	Re:= regexp.MustCompile(`[a-z0-9._%+\-]+@[a-z0-9._%+\-]+\.[a-z0-9._%+\-]`)
	return Re.MatchString(email)
}

func validateDate(dateString string) bool {
    // Проверка формата dd/mm/yyyy
    if !regexp.MustCompile(`^\d{2}/\d{2}/\d{4}$`).MatchString(dateString) {
        return false
    }

    // Преобразование строки в дату
    date, err := time.Parse("02/01/2006", dateString)
    if err != nil {
        return false
    }

    // Проверка, что дата еще не наступила
    return date.Before(time.Now())
}

func SendRegistrationEmail(email, firstName string) error {
    err := godotenv.Load(".env")
    if err != nil {
        log.Fatal("Error loading .env file")
    }

	smtpHost := os.Getenv("SMTP_HOST")
    smtpPort, err := strconv.Atoi(os.Getenv("SMTP_PORT"))
    if err != nil {
        log.Printf("Invalid SMTP_PORT value: %v", err)
        return err
    }
    smtpUsername := os.Getenv("SMTP_USERNAME")
    smtpPassword := os.Getenv("SMTP_PASSWORD")

    // Create a new SMTP client
    d := mail.NewDialer(smtpHost, smtpPort, smtpUsername, smtpPassword)

    // Create email message
    m := mail.NewMessage()
    m.SetHeader("From", os.Getenv("SMTP_USERNAME"))
    m.SetHeader("To", email)
    m.SetHeader("Subject", "Welcome to Camp!")

    m.SetBody("text/html", fmt.Sprintf(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome to Camp!</title>
        </head>
        <body>
            <h1>Welcome, %s!</h1>
            <p>You have successfully registered for Summer Camp.</p>
            <p>Start exploring all the amazing features!</p>
        </body>
        </html>
    `, firstName))

    // Send the email
    if err := d.DialAndSend(m); err != nil {
        log.Println("Error sending email:", err)
        return err
    }
    log.Println("Email sent successfully!")
    return nil
}

func Register(c *fiber.Ctx) error {
	var data map[string]interface{}
	var userData models.Form
	if err:=c.BodyParser(&data);err!=nil{
		fmt.Println("Unable to parse body")
	}

	if !validateEmail(strings.TrimSpace(data["email"].(string))){
		c.Status(400)
		return c.JSON(fiber.Map{
			"message":"Invalid Email Address",
		})
	}

	if !validateDate(data["dateOfBirth"].(string)) {
		c.Status(400)
        return c.JSON(fiber.Map{
            "message": "Invalid Date of Birth",
        })
	}

	database.DB.Where("email=?", strings.TrimSpace(data["email"].(string))).First(&userData)
	if userData.Id!=0{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message":"Email already exist",
		})
	}

	form:=models.Form{
		FirstName: data["firstName"].(string),
		LastName: data["lastName"].(string),
		DateOfBirth: data["dateOfBirth"].(string),
		Phone: data["phone"].(string),
		Email: strings.TrimSpace(data["email"].(string)),
	}
	if err:=SendRegistrationEmail(form.Email, form.FirstName); err != nil {
        c.Status(400)
		return c.JSON(fiber.Map{
			"message":"Letter can`t send",
		})
    }
	err:=database.DB.Create(&form)
	if err != nil {
		log.Println(err)
	}
	c.Status(200)
		return c.JSON(fiber.Map{
			"form":form,
			"message":"Form created successfully",
		})
}

