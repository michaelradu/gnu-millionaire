#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who Wants To Be A GNU/Millionaire? \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        I am a process on your computer.
        If you get any question wrong I will be ${chalk.bgRed('killed')}
        So get all the questions right...
    `)
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default(){
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

async function question1(){
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'The Linux kernel first released on \n',
        choices: [
            'May 23rd, 1995',
            'Nov 24th, 1998',
            'Sep 17, 1991',
            'Dec 17, 2000'
        ]
    });

    return handleAnswer(answers.question_1 == 'Sep 17, 1991');
}

async function question2(){
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'The Free Software Foundation calls Linux \n',
        choices: [
            'Linux',
            'GNU/Linux',
            'Linux/GNU',
            'GNU + Linux'
        ]
    });

    return handleAnswer(answers.question_2 == 'GNU/Linux');
}

async function question3(){
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'The mascot of Linux is \n',
        choices: [
            'The word Linux',
            'A grinning GNU head',
            'A broken window',
            'Tux the Penguin'
        ]
    });

    return handleAnswer(answers.question_3 == 'Tux the Penguin');
}

async function question4(){
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'I use \n',
        choices: [
            'Linux btw.',
            'Arch btw.',
            'Ubuntu btw.',
            'GNU/Guix btw.'
        ]
    });

    return handleAnswer(answers.question_4 == 'Arch btw.');
}

async function question5(){
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: 'The best game ever is \n',
        choices: [
            'Doom',
            'Tux Racer',
            'Sudoku',
            'TicTacToe'
        ]
    });

    return handleAnswer(answers.question_5 == 'Tux Racer');
}

async function question6(){
    const answers = await inquirer.prompt({
        name: 'question_6',
        type: 'list',
        message: 'What did Linus do in the first episode of Daily Driver Challenge? \n',
        choices: [
            'Went back to Windows',
            'Who is Linus?',
            'Nothing, he had a fun time',
            'He nuked his desktop environment'
        ]
    });

    return handleAnswer(answers.question_6 == 'He nuked his desktop environment');
}

async function question7(){
    const answers = await inquirer.prompt({
        name: 'question_7',
        type: 'list',
        message: 'What is the best desktop environment? \n',
        choices: [
            'Gnome',
            'Kde',
            'A tiling window manager',
            'Xfce'
        ]
    });

    return handleAnswer(answers.question_7 == 'A tiling window manager');
}

async function question8(){
    const answers = await inquirer.prompt({
        name: 'question_8',
        type: 'list',
        message: 'Choose one \n',
        choices: [
            'Vim',
            'Nano',
            'Emacs',
            'Kate'
        ]
    });

    return handleAnswer(answers.question_8 == 'Vim' || answers.question_8 == 'Emacs');
}

async function question9(){
    const answers = await inquirer.prompt({
        name: 'question_9',
        type: 'list',
        message: 'This program is \n',
        choices: [
            'Fun',
            'Useless',
            'GNU/Perfect',
            '...'
        ]
    });

    return handleAnswer(answers.question_9 == 'GNU/Perfect' || answers.question_9 == 'Fun');
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's a legit answer`});
    }
    else {
        spinner.error({ text: `Game over, you lose ${playerName}!`});
        process.exit(1);
    } 
}

/* add this to it
 _____
< moo >
 -----
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

*/

function winner() {
    console.clear();
    const msg = `Congrats, ${playerName} !\n 1,000,000 $`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
await question9();

await winner();