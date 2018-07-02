const Command = require("../../structures/Command.js");
const {
    MessageEmbed
} = require("discord.js");
const urban = require('urban.js');

class Urban extends Command {
    constructor(...args) {
        super(...args, {
            name: "urban",
            usage: "urban",
            description: "Urban Dictionary",
            cooldown: 5
        });
    }

    async run(message, args) {

        urban(args.join(""))
            .then(def => {
                if (def.example != "") {
                    const defEmbed = new MessageEmbed()
                        .setColor(message.guild.setting.embedcolor)
                        .addField(message.getText("URBAN_DEFINITION", capitalize(def.word)), `${capitalize(def.definition)}`)
                        .addField(message.getText("URBAN_EXAMPLE"), `*${capitalize(def.example)}*`);
                    return message.channel.send({ embed: defEmbed });
                } else {
                    const defXEmbed = new MessageEmbed()
                        .setColor(message.guild.setting.embedcolor)
                        .addField(message.getText("URBAN_DEFINITION", capitalize(def.word)), `${capitalize(def.definition)}`);
                    return message.channel.send({ embed: defXEmbed });
                }
            })
            .catch(e => { // eslint-disable-line no-unused-vars
                const noDefEmbed = new MessageEmbed()
                    .setColor(message.guild.setting.badembedcolor)
                    .setDescription(message.getText("URBAN_WORD_NOT_FOUND"));
                message.channel.send({ embed: noDefEmbed });
            });

    }
}

function capitalize(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

module.exports = Urban;