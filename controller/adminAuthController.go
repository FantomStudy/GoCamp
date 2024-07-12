package controller

import (
	"github.com/FantomStudy/GoCamp/database"
	"github.com/FantomStudy/GoCamp/models"
	"fmt"
	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func AdminRegister(c *fiber.Ctx) error {
	var data map[string]interface{}
	var adminData models.Admin
	if err := c.BodyParser(&data); err != nil {
		fmt.Println("Unable to parse body")
	}

	//Check if password is less than 8 characters
	if len(data["password"].(string)) <= 7 {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Password must be minimum 8 characters",
		})
	}

	//Check if login already exist in database
	database.DB.Where("login=?", strings.TrimSpace(data["login"].(string))).First(&adminData)
	if adminData.Id != 0 {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Login already exist",
		})
	}
	admin := models.Admin{
		Login: data["login"].(string),
	}
	admin.SetPassword(data["password"].(string))
	err := database.DB.Create(&admin)
	if err != nil {
		log.Println(err)
	}
	c.Status(200)
	return c.JSON(fiber.Map{
		"admin":    admin,
		"message": "Admin created successfully",
	})
}