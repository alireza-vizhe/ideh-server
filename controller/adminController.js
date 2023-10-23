const { Poor_Story } = require("next/font/google");
const Post = require("../modules/PostModel");
const { sendEmail } = require("../utils/mailer");
const Article = require("../modules/Articles");

exports.getPosts = async (req, res) => {
    try {
        res.json(await Post.find())
    } catch (error) {
        console.log(error);
    }
}

exports.newPost = async (req, res) => {
    try {
        console.log(req.body);
        await Post.create(req.body);
        res.json({ message: "نمونه کار مورد نظر ثبت شد" })
    } catch (error) {
        console.log(error);
    }
}

exports.updatePost = async (req, res) => {

    console.log(req.body);

    // const {id} = req.body;

    try {
        const post = await Post.findOne({ _id: req.body.id.params.slug});
    if(!post){
        res.json({message: "پست مورد نظر برای بروزرسانی پیدا نشد"})
        return
    }
        post.name = req.body.name;
        post.category = req.body.category;
        post.description = req.body.description;
        post.link = req.body.link;
        post.status = req.body.status;
        post.singleShow = req.body.singleShow
        post.save();
        res.json({messageSUC: "پست مورد نظر با موفقیت ویرایش یافت"})
    } catch (error) {
        console.log(error);
    }
}

exports.getSingle = async (req, res) => {
    console.log(req.body.id.params.slug);
    try {
        const post = await Post.findOne({_id: req.body.id.params.slug})
        res.json(post)
        console.log("asas");
    } catch (error) {
     console.log(error);   
    }
}

exports.deletePost = async (req, res) => {
    try {
       await Post.deleteOne({_id: req.body.id})
        res.json({messageSUC: "نمونه کار مورد نظر با موفقیت پاک شد"})
    } catch (error) {
        console.log(error);
    }
}

exports.sendSupportEmail = async (req, res) => {
      //(req.body);
  const { fullname, subject, email, message } = req.body;
  try {
    sendEmail(
      "alirezavizhe@gmail.com",
      fullname,
      subject,
      `پیامی از طرف کاربری با ایمیل ${email} دریافت شد`,
      message
    );
    res.json({ messageSUC: "پیام شما با موفقیت ارسال شد" });
  } catch (error) {
    //("error", error);
  }
} 

exports.getArticles = async (req, res) => {
    try {
      const article = await Article.find();
      res.json(article)
    } catch (error) {
      //(error);
    }
  }

  exports.editArticles = async (req, res) => {

    console.log(req.body.id.params.slug);
    console.log(req.body);

    try {
      const { recaptchaValue } = req.body;
      // axios({
      //   url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${recaptchaValue}`,
      //   method: "POST",
      // })
      //   .then(async ({ data }) => {
      //     //("data", data);
      //     if (data.success) {
            const article = await Article.updateOne(
              { _id: req.body.id.params.slug },
              { $set: req.body }
            );
            res.json({messageSUC: "مقاله با موفقیت ویرایش شد"});
            console.log(article);
            //(article);
        //   } else {
        //     res.json({ message: "مشکلی در اعتبار سنجی کپچا پیش آمد" });
        //   }
        // })
        // .catch((error) => {
        //   res.json({ message: "کپچا نا معتبر است" });
        // });
    } catch (error) {
      res.json({ message: error.message });
    }
  }
  exports.getSingleArticle = async (req, res) => {
    // //(req.params.id);
    console.log(req.body.id.params.slug);
    try {
      const article = await Article.findById({ _id: req.body.id.params.slug });
      //(article);
      res.json(article);
    } catch (error) {
      //(error);
    }
  }
  exports.deleteArticle = async (req, res) => {
    try {
      await Article.deleteOne({_id: req.body.id})
      res.json({messageSUC: "مقاله مورد نظر با موفقیت پاک شد"})
    } catch (error) {
      //(error);
    }
  }