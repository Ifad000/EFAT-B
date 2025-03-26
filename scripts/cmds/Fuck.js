const fs = require("fs-extra");
const axios = require("axios");
const canvas = require("canvas");

module.exports = {
  config: {
    name: "mfk",
    aliases: ["fuck"],
    version: "1.1",
    author: "EFAT",
    countDown: 5,
    role: 0,
    shortDescription: "Create kiss image with flipped avatars",
    longDescription: "U mom and me🤤.",
    category: "funny",
    guide: "{pn} @user"
  },

  onStart: async function ({ api, message, event, args, usersData }) {
    // 🔹 এখানে ৪ জন অনুমোদিত ইউজারের UID সেট করো
    const allowedUIDs = ["61572797678150", "61573130465804", "61555701496183", "100080675502774"]; // এখানে তোমার ৪ জন অ্যাডমিনের UID বসাও

    const senderID = event.senderID;

    // 🔹 চেক করবে, ব্যবহারকারী অনুমোদিত কিনা
    if (!allowedUIDs.includes(senderID)) {
      return message.reply("abba bol taile admin dimu🫵🏼🎀");
    }

    let one, two;
    const mention = Object.keys(event.mentions);
    if (mention.length === 0) {
      return message.reply("boro vai madarchud k mention dau");
    } else if (mention.length === 1) {
      one = event.senderID;
      two = mention[0];
    } else {
      one = mention[1];
      two = mention[0];
    }

    // 🔹 Ensure temp directory exists
    const tmpDir = `${__dirname}/tmp`;
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    try {
      // 🔹 Fetch avatar URLs
      const avatarURL1 = await usersData.getAvatarUrl(one);
      const avatarURL2 = await usersData.getAvatarUrl(two);
      const kissBackgroundURL = "https://i.waifu.pics/qQ5zc7Q.com_0027.jpg";

      // 🔹 Fetch images
      const [avatar1, avatar2, kissBackground] = await Promise.all([
        axios.get(avatarURL1, { responseType: "arraybuffer" }),
        axios.get(avatarURL2, { responseType: "arraybuffer" }),
        axios.get(kissBackgroundURL, { responseType: "arraybuffer" }),
      ]);

      // 🔹 Create Canvas
      const c = canvas.createCanvas(800, 600);
      const ctx = c.getContext("2d");

      // 🔹 Load images
      const userImg1 = await canvas.loadImage(avatar1.data);
      const userImg2 = await canvas.loadImage(avatar2.data);
      const kissImg = await canvas.loadImage(kissBackground.data);

      // 🔹 Draw background and avatars
      ctx.drawImage(kissImg, 0, 0, c.width, c.height);
      ctx.drawImage(userImg2, 450, 150, 150, 150);
      ctx.drawImage(userImg1, 100, 150, 150, 150);

      // 🔹 Save the image
      const pathSave = `${tmpDir}/${one}_${two}_kiss.png`;
      const output = fs.createWriteStream(pathSave);
      const stream = c.createPNGStream();
      stream.pipe(output);

      output.on("finish", () => {
        message.reply(
          {
            body: "tor mar k xudar link eta🎀🫵🏼",
            attachment: fs.createReadStream(pathSave),
          },
          () => fs.unlinkSync(pathSave)
        );
      });
    } catch (err) {
      console.error(err);
      message.reply("❌ Error while generating the  sex image.");
    }
  }
};
