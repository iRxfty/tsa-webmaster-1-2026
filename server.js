import express from "express";
import ViteExpress from "vite-express";
import nunjucks from "nunjucks";

import resources from "./public/resources.json" with { type: "json" }
import { resolveConfig } from "vite";

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

app.get("/", (req, res) => {
    res.render("index.html")
})

app.get("/about", (req, res) => {
    res.render("about.html")
})

app.get("/add", (req, res) => {
    res.render("add.html")
})

app.get("/register", (req, res) => {
    res.render("register.html")
})

app.get("/signIn", (req, res) => {
    res.render("signIn.html")
})

app.get("/forum", (req, res) => {
    res.render("forum.html")
})

app.get("/submit-resource", (req, res) => {
    res.render("submit-resource.html")
})

app.post("/submit-resource", (req, res) => {
    //console.log(req.body)
    console.log(req.body);
})

app.get("/directory", (req, res) => {
    res.render("directory.html", {resources: resources.resources})
})

ViteExpress.listen(app, 5173, () => {
    console.log("Server is listening...")
    console.log("Launch http://localhost:5173/")
});