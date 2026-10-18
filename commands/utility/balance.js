const { SlashCommandBuilder } = require('discord.js');
const { baseThreeGem } = require('../../inc/gemconversion.js');
const { getBalance } = require('../../inc/taskmanage.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('displays ur TaskiGems! <3')
		.addUserOption((option) => option.setName('user').setDescription('member target')),
	async execute(interaction) {
		const target = interaction.options.getUser('user') ?? interaction.user;
		const bal = getBalance(target.id);
		if (bal > 0) {
			await interaction.reply(`${target.tag} gems: ${baseThreeGem(bal)}`);
		} else {
			await interaction.reply(`${target.tag} has no gems :cry: :dash:`);
		}
	},
};