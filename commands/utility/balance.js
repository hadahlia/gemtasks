const { SlashCommandBuilder, Collection } = require('discord.js');
const gems = new Collection();

// async function addBalance(id, amt) {
// 	const user = gems.get(id);

// 	if (user) {
// 		user.gems += Number(amt);
// 		return user.save();
// 	}

// 	const newUser = await Users.create({ user_id: id, gems: amt });
// 	gems.set(id, newUser);

// 	return newUser;
// }

function getBalance(id) {
	const user = gems.get(id);
	return user ? user.gems : 0;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('displays ur taskiGems! <3')
		.addUserOption((option) => option.setName('user').setDescription('member target')),
	async execute(interaction) {
		const target = interaction.options.getUser('user') ?? interaction.user;
		await interaction.reply(`${target.tag} has ${getBalance(target.id)} gems`);
	},
};