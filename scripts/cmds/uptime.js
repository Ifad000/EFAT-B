const os = require('os'); // To get system uptime
const moment = require('moment'); // For formatted time
const { performance } = require('perf_hooks'); // For process uptime

module.exports = {
    config: {
        name: "up",
        aliases: ["upt"],
        version: "1.0",
        author: "efat",
        countDown: 5,
        role: 0, // Everyone
        shortDescription: "Shows real system uptime and bot uptime",
        longDescription: "This command shows the real system uptime and bot uptime with a cute loading message before the real info.",
        category: "fun"
    },

    onStart: async function ({ api, event }) {
        // Send the cute loading message
        const loadingMessage = await api.sendMessage({
            body: "💫 Loading... Please wait, I'm preparing something special for you! 🌸"
        }, event.threadID);

        // Wait for 3 seconds before sending the system info
        setTimeout(async () => {
            const botName = "আই লাভ ইউ"; // Bot name
            const botPrefix = "-"; // Bot prefix
            const botVersion = "1.0"; // Bot version
            const adminLink = "https://m.me/Efuu.chen"; // Admin link (replace with actual)

            // Get the system uptime
            const systemUptimeSeconds = os.uptime();
            const systemUptimeString = formatUptime(systemUptimeSeconds);

            // Get the bot uptime
            const botUptimeSeconds = process.uptime();
            const botUptimeString = formatUptime(botUptimeSeconds);

            // Prepare the uptime message
            const replyMessage = `
💖╭─✦ 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 ✦─💖
├‣ 🤖 Bot Name: ${botName}
├‣ ⏰ Bot Prefix: ${botPrefix}
├‣ 📌 Bot Version: ${botVersion}
├‣ 🧑🏻‍💻 admin id link: ${adminLink}
╰───────────⧕

🐾╭─✦ 𝗨𝗣𝗧𝗜𝗠𝗘 𝗜𝗡𝗙𝗢 ✦─🐾
├‣ 🕒 System Uptime: ${systemUptimeString}
├‣ ⏱ Process Uptime: ${botUptimeString}
╰───────────⧕

🦋╭─✦ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗜𝗡𝗙𝗢✦─🦋
├‣ 📡 OS: Windows 10
├‣ 🖥 CPU: 3.5 GHz (4 cores)
├‣ 🌡 CPU Temperature: 40°C
├‣ 📈 Total Memory: 8 GB
├‣ 📉 Free Memory: 5 GB
╰───────────⧕

✨[rest of your system info]✨`;

            // Delete the loading message and send the real info
            await api.deleteMessage(loadingMessage.messageID);
            await api.sendMessage({ body: replyMessage }, event.threadID);
        }, 3000); // 3-second delay
    },

    onChat: async function ({ event, message }) {
        if (event.body && event.body.toLowerCase() === "uptime") {
            this.onStart({ event, message });
        }
    }
};

// Function to format uptime in a user-friendly way
function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = Math.floor(seconds % 60);

    const uptimeStringParts = [];
    if (days > 0) uptimeStringParts.push(`${days} days`);
    if (hours > 0) uptimeStringParts.push(`${hours} hours`);
    if (minutes > 0) uptimeStringParts.push(`${minutes} minutes`);
    if (secondsLeft > 0) uptimeStringParts.push(`${secondsLeft} seconds`);

    return uptimeStringParts.join(', ');
}
