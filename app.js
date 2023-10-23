const express = require("express");
const connectDB = require("./config/db");

const dotenv = require("dotenv");
const { setHeaders } = require("./middlewares/headers");
const multer = require("multer");
const sharp = require("sharp");
const Post = require("./modules/PostModel");
const Articles = require("./modules/Articles");

const app = express();

app.use(express.json())
app.use(setHeaders);
dotenv.config({ path: "./config/config.env" })

connectDB();


//! Upload Image
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/new-post", upload.single("textImage"), function (req, res) {
    console.log("filre", req.file, "dataaaaaaa", req.body);
    const { recaptchaValue } = req.body;
    // axios({
    //   url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${recaptchaValue}`,
    //   method: "POST",
    // })
    //   .then(async ({ data }) => {
    //     if (!data.success) {
    //       console.log("datablulu", data);
    try {
        sharp(req.file.buffer)
            .resize(1080, 1080)
            .jpeg({ quality: 30 })
            .toBuffer()
            .then((data) => {
                console.log(req.file, "adsdasadasdadsadadasdsada");
                const saveImage = new Post({
                    ...req.body,
                    pName: req.body.pName,
                    img: {
                        data: data,
                        contentType: req.file.mimeType,
                    },
                    // category: req.body.category,
                    // pPrice: req.body.pPrice,
                    // pAmount: req.body.pAmount
                    // user: req.userId,
                    // userId: req.body.userId,
                    // for: req.body.for,
                });
                // saveImage.inTheFuture = req.body.inTheFuture
                saveImage
                    .save()
                    .then(() => {
                        console.log("saved");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                res.json({ messageSUC: "savedddd" });
            });
    } catch (error) {
        console.log("fgfgfgfgfg");
    }
    //   } else {
    //     res.json({ message: "  در اعتبار سنجی کپچا پیش آمد" });
    //   }
    // })
    // .catch((error) => {
    //   res.json({ message: "کپچا نا معتبر است" });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
});



//* upload Articles image
app.post("/upload-image-article", upload.single("textImage"), function (req, res) {
    console.log("filre", req.file, "dataaaaaaa", req.body);
    const { recaptchaValue } = req.body;
    // axios({
    //   url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${recaptchaValue}`,
    //   method: "POST",
    // })
    //   .then(async ({ data }) => {
    //     if (data.success) {
          // console.log("datablulu", data);
          try {
            sharp(req.file.buffer)
              .resize(1080, 1080)
              .jpeg({ quality: 30 })
              .toBuffer()
              .then((data) => {
                console.log(req.file, "adsdasadasdadsadadasdsada");
                const saveImage = new Articles({
                  ...req.body,
                  category: req.body.category,
                  nameImg: req.body.articleName,
                  img: {
                    data: data,
                    contentType: req.file.mimeType,
                  },
                  // user: req.userId,
                  // userId: req.body.userId,
                  // for: req.body.for,
                });
                saveImage
                  .save()
                  .then(() => {
                    console.log("saved");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                res.json({ messageSUC: "مقاله جدید ایجاد شد" });
              });
          } catch (error) {
            console.log("fgfgfgfgfg");
          }
      //   } else {
      //     res.json({ message: "  در اعتبار سنجی کپچا پیش آمد" });
      //   }
      // })
      // .catch((error) => {
      //   res.json({ message: "کپچا نا معتبر است" });
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  });


app.use(require("./routes/admin"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server has Started on Port: ${PORT}`));