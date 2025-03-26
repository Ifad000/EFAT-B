module.exports = {
    config: {
        name: "rohanMention",
        version: "1.0",
        author: "Tawsik",
        countDown: 5,
        role: 0, // সবার জন্য উন্মুক্ত
        shortDescription: "Replies when 'rohan' is mentioned",
        longDescription: "If the user mentions 'rohan' anywhere in a message, it replies with 'Rohan নাই!'",
        category: "fun"
    },

    onStart: async function () {
        // onStart রাখা হয়েছে যেন Error না দেয়, কিন্তু এখানে কিছু করবে না।
    },

    onChat: async function ({ event, message }) {
        if (event.body && event.body.toLowerCase().includes("rohan")) {
            return message.reply("রোহান তো নাই 🤡,রোহান রোহান এর মায়ের জানাযা পড়াতে গেছে 😆, কিছু দিন আগে ইফাত ৭ ইঞ্চি ধ*নের চো*দা খাইয়া রোহান এর মা অসুস্থ হয়ে মারা গেছে 💔😊🥹");
        }
    }
};
