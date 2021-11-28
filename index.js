const readline = require("readline-sync")
const axios = require("axios")
const request = require("request")

const Discord = require("discord.js")
const {red, green, blueBright, main, yellow} = require("chalk")
const client = new Discord.Client()
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  async function createApp(name, teamid = null, tokenUser){
    return await axios.post('https://discord.com/api/v9/applications', {name, teamid}, {headers: {Authorization: tokenUser}}).then((res) => res.data);
  };
  
  async function createBot(id, tokenUser){
    return await axios.post(`https://discord.com/api/v9/applications/${id}/bot`, {}, {headers: {Authorization: tokenUser}}).then((res) => res.data);
  };
  async function deleteApp(id,tokenUser){
    return await axios.delete(`https://discord.com/api/v9/applications/${id}`, {headers: {Authorization: tokenUser}}).then((res) => res.data);
  };

async function start() {
    console.clear()
    console.log(red(`				
    [1] Crée un bot
    [2] Supprimé un bot

    `))
    const question = readline.question(blueBright(`Quelle parametre voulez vous utilisez : `))
    const ArrayNumber = ["1", "2"]
    if (!ArrayNumber.includes(question)) {
        console.log(red(`Ce paramètre n'existe pas`))
        setTimeout(() => {d
            start()
        }, 3000)
    }
    if(question === "1") {
        const token = readline.question(`Entrer votre token : `)
       
		const name = readline.question(`Entrer le nom du bot : `)


        await createApp(name, token).then(async (app) => {
            const bot = await createBot(app.id, token);
            console.log(green(`Bot crée : ${bot.username}#${bot.discriminator}\nToken : ${bot.token}\nLien : https://discord.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=8`))
          
        });
        
   
		   
    }
  
    if(question === "2") {
        const token = readline.question(`Entrer votre token : `)
     
		const id = readline.question(`Entrer l'id de l'aplication : `)


        await deleteApp(id, token).then(async () => {
            console.log(green(`Bot supprimé`))
          
        });
    }
 
}

start()
