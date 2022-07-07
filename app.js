const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');
const _ = require('lodash');

const args= yargs.argv;
let exist;
// console.log(yargs.argv)

fs.readFile('./notes.json','utf-8',(err,data)=>{
      try{
          data= Array.from(JSON.parse(data)) || [];
      } catch(err){
          console.log("Error:",err);
      }  


const instr = args['_'];
if(instr.length!=1){
    console.log(chalk.bgRed("invalid command"))

}
else{
    if ((_.isEmpty(args['title'])) && (instr[0] != 'list')) {
        console.log(chalk.red("The title is required"));
    } else {
        switch (instr[0]) {
            case 'add':
                if (_.isEmpty(args['body'])) {
                    console.log(chalk.red("The body is required"));
                } else {
                    exists = false;
                    data.forEach((ele) => {
                        if (ele.title == args.title) {
                            console.log(chalk.red("This title is already taken"));
                            exists = true;
                        }
                    })
                    if (!exists) {
                        data.push({
                            title: args['title'],
                            body: args['body']
                        })
                        console.log(chalk.bgGreen("New Note Created!"))
                    }
                }
                break;
        
            case 'remove':
                const length = Object.keys(data).length;
                if (length > 0) {
                    data = data.filter(ele => ele.title != args.title)
                    if (length != data.length) {
                        console.log(chalk.bgRed("Note removed!"))
                    } else {
        
                        console.log(chalk.red("Note not found!"));
                    }
                } else {
                    console.log(chalk.red("No note has been created yet!"));
                }
                break;
        
            case 'list':
                if (_.isEmpty(data)) {
                    console.log(chalk.red("No note has been created yet!"));
                } else {
                    console.log(chalk.bgBlueBright("Your Notes:"))
                    data.forEach((ele) => {
                        console.log(chalk.blue(ele.title))
                    })
                }
                break;
            case 'read':
                exists = false;
                data.forEach((ele) => {
                    if (ele.title == args.title && !exists) {
                        console.log(chalk.bgGreenBright.whiteBright(ele.title));
                        console.log(chalk.green(ele.body))
                        exists = true;
                    }
                })
                if (!exists) {
                    console.log(chalk.red("Note not found!"));
                }
                break;
            default:
                console.log(chalk.bgRed("Invalid command!"))
        }
}

}

fs.writeFile('./notes.json', JSON.stringify(data), (err) => {
    if (err) {
        console.log(chalk.bgRed(("Something went wrong!")))
        console.log(chalk.red(err));
    }
});
});
