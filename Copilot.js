/*Copilot.js v1*/
/*Made by Etim Daniel*/

const fs = require('fs')
const path = require('path')
const readline = require("readline");
const { exec } = require("child_process");

const config = require("./config");
const path = config[0].path

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


function subProcess2(nameOfRepository){
  const accessToken = config[0].accessToken
  const userName = config[0].userName
  const githubLink = config[0].githubLink + userName
  const tempRepo = githubLink.replace('[]', accessToken)
  
  const repoUrl = tempRepo + '/' + nameOfRepository
  
  exec(`git remote add ${nameOfRepository} ${repoUrl}`, (error, stdout, stderr) => {
    if(error){
      console.log(error)
    }else{
      exec(`git branch -m ${config[0].branch}`, (error, stdout, stderr) => {
        if(error){
          console.log(error)
        }else{
          exec(`git commit -m "${config[0].commitMessage}"`, (error, stdout, stderr) => {
            if(error){
              console.log(error)
            }else{
              exec(`git push -u ${nameOfRepository} main`, (error, stdout, stderr) => {
                if(error){
                  console.log(error)
                }else{
                  console.log(stdout)
                  console.log(`Successfully pushed to repo ${nameOfRepository}`)
                }
              })
            }
          })
        }
      })
    }
  })
}

//function to initialize git
function subProcess1() {
  exec("git -v", (error, stdout, stderr) => {
    if (error) {
      exec("apt install git", (error, stdout, stderr) => {
        if (error) {
          console.log(error)
        }
      })
    }
    exec(`git init`, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
      }
      exec(
        `git config --add user.email "${config[0].userEmail}"`,
        (error, stdout, stderr) => {
          if (error) {
            console.log(error)
          }
          exec(
            `git config --add user.name "${config[0].userName}"`,
            (error, stdout, stderr) => {
              if (error) {
                console.log(error)
              }
              exec(`git add .`, (error, stdout, stderr) => {
                if(error){
                  console.log(error)
                }
              })
            }
          )
        }
      )
    })
  })
}

function changeDir(dir){
  
  if (fs.existsSync(dir)) {
    process.chdir(dir)
    
    console.log(`Current path is ${path}`)
    console.log("•~• welcome! to copilot")
    console.log(`What do want me to do for you \n 1. Push to repository\n 2. Delete repository\n`)
  
   rl.question("~> ", (answer) => {
     switch (Number(answer)) {
       case 1:
         console.log(`You are about to push to repository ${config[0].nameOfRepository}`)
         subProcess1()
         subProcess2(config[0].nameOfRepository)
         break;
      
       case 2:
         console.log('Feature is still under development')
         break;
    
      default:
         console.log("Invalid response")
  }
  rl.close()
})
  }else{
    console.error(`Directory ${path} does not exist, recheck the path provided in ths config file`)
  }

}

changeDir(path)


