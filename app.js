#! /usr/bin/env node

var prompt = require('prompt'),
    git    = require('simple-git'),
    colors = require('colors');

var wDir   = process.cwd();

function exit(msg){
    console.log(msg);
    process.exit(1);
}

function inputCommitMessage() {
    prompt.start();
    prompt.get(['Type','Scope','Description'], function (err, result){
        let cimsg = `${result.type}(${result.scope}): ${result.description}`
        commit(cimsg);
    });
}

function commit(message){
    git(wDir).commit(message, function(err, result){
        if (err){
            return console.error(err);
        }
        console.log(`Commit: ${result.commit}\n`.yellow);
        console.log(`Branch: ${result.branch}\n`.green);
        console.log(`Mensagem: ${message}\n`.white);
        exit('Sucess!');
    });
}

function checkCommit(){
    git(wDir).status(function(err, data){
        let msg = "There are no files to commit"
        if(err) {
            msg = err;
            exit(msg);
        } else if(data && data.files.length > 0) {
            data.files.map(function(file){
                if(file.index === 'M'){
                    inputCommitMessage();
                } else exit(msg);
            })
        }
    })
}

checkCommit();

