package routes

import (
	"github.com/FantomStudy/GoCamp/controller"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controller.Register)
	app.Post("/api/adminRegister", controller.AdminRegister)
}