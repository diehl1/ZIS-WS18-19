const { Client, logger } = require('camunda-external-task-client-js');

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'rechnung'
client.subscribe('rechnung', async function({ task, taskService }) {
  // Put your business logic here

  // Get a process variable
  const ware = task.variables.get('ware');
  const menge = task.variables.get('menge');
  const gewicht = task.variables.get('gewicht');
  const versandkosten = task.variables.get('versandkosten');
  var gefahrentransport = task.variables.get('gefahrentransport');
  const prioritaet = task.variables.get('prioritaet');
  const zusatzgebuehr = task.variables.get('zusatzgebuehr');
  
  if (gefahrentransport) {
	  gefahrentransport = 'Gefahrentransport';
  } else {
	  gefahrentransport = 'kein Gefahrentransport';
  }
  
  console.log(`Der Auftrag der Ware ${ware} mit der Menge ${menge} sowie dem Gewicht von ${gewicht}kg ist erfolgreich abgeschlossen. Dafür werden Versandkosten in Höhe von ${versandkosten}€ und zusätzliche Gebühren in Höhe von ${zusatzgebuehr}€ fällig. Priorität: ${prioritaet}, ${gefahrentransport}.`);

  // Complete the task
  await taskService.complete(task);
});