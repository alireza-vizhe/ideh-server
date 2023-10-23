const express = require("express");

const adminController = require("../controller/adminController");

const route = express.Router();

route.get("/posts", adminController.getPosts);
// route.post("/new-post", adminController.newPost);
route.post("/update-post", adminController.updatePost);
route.post("/single-post", adminController.getSingle)
route.post("/delete-post", adminController.deletePost);
route.post("/send-support-email", adminController.sendSupportEmail)
route.get("/articles" , adminController.getArticles);
route.post("/singe-article", adminController.getSingleArticle);
route.post("/edit-article" , adminController.editArticles);
route.post("/delete-article", adminController.deleteArticle);

module.exports = route;