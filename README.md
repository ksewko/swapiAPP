# swapiAPP - Star Wars Cards

Author: **Ksawery Kondrat**

Application created for job recruitment purposes.

Angular application designed to randomly choose 2 opponents to fight and decide which one is the winner.

You can find here the usage of:
* SWAPI - the Star Wars API
* RxJs 
* Angular 16
* Cypress - for e2e testing

## Usage

After cloning the repository please run

```bash
npm install
```
and then 
```bash
ng serve
```
to open app in local environment.

## Testing
Cypress was used for e2e testing.

So to run them properly make sure to firstly open app in you localhost.

Base url is set to '**http://localhost:4200**', so if you are using different port for ng serve purpose please change base url in "**cypress.config.ts**' file.

After setting up everyting please run:
```bash
npm run cypress:open
```

After running this command the Cypress console should appear.

Choose E2E Testing (Configure if needed) and prefered browser (ex. Chrome) and  press "**Start testing E2E...**" button.

The tab in selected browser will appear with 1 testing file to select: **spec.cy.ts**.

Click the file name and the testing will begin! 
