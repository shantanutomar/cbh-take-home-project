# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

**Assumptions/Guesses**
1. There will be a UI where facility can add/edit/delete an Agent data and API's will be there to handle the 
CRUD operations. 
2. Since the project scale is very small and I don't need to handle too many ACID operations, I will be using documentational based database
i.e. Mongo DB with Mongoose ORM to perform the operations.  
3. The tables Facilities, Agents, and Shifts can have multiple columns, with each having the ID's fields uniquely repereseting a row in that table.
4. With this requirement we will be adding a new column ```custom_agent_id``` in the Agents collection.
5. User story is something which is deliverable and can be demoed to the product without dependency on any other task. User story will have an Acceptance criteria.
6. Task is which developers will work on and there can be multiple tasks in a User story.
7. Effort is in Mandays (MD's) where 1 MD = approx 5 hours.
8. QA tasks can be created seperately by QA under there own story. The efforts include estimates for dev QA as well. 

**User stories**
1. Add Agent custom ID for a particular Agent. 
   1. Acceptance criteria:
      1. As a facility manager I should be able to add a Custom Agent ID from the UI.
      2. As a facility manager I should be able to edit a Custom Agent ID from the UI.
   
      **Tasks**
         1. [Frontend] Add a new field Custom Agent ID to the Agent User Interface.
            1. Efforts: 2 MD's
            2. Implementation details: 
               1. Add the field in UI as per the mockup from Design team. 
               2. Pass the new field custom_agent_id as an input to the insert and update Agent API's.
               3. Handle changes on UI to read new parameter from getAgents API and show the custom_agent_id in the UI. 
         2. [Backend] Handle changes in insertAgent and updateAgent API's for the new field custom_agent_id.
            1. Efforts: 2 MD's 
            2. Implementation details:
               1. Handle changes in Agents schema to add a new field custom_agent_id. 
               2. Handle the field validation for not null and string type.
               2. Handle changes in insertAgent and updateAgent endpoints to store the value of custom_agent_id in the database.



2. Generate Reports using Custom Agent ID.
    1. Acceptance criteria:
        1. As a facility manager I should be able to generate the reports using the Custom Agent field.
        2. As a facility manager I should be able to see the details of custom agent ID in the report.

       **Tasks**
        1. [Backend] Handle changes in `getShiftsByFacility` to fetch custom_agent_id information.
            1. Efforts: 1.5 MD's
            2. Implementation details:
               1. Update the agent metadata ouput to include the custom_agent_id information.  
               2. Update the output schema for `getShiftsByFacility` to include the custom_agent_id as well in the output.
        2. [Backend] Handle changes in `generateReport` API to expose the custom_agent_id to the PDF.
            1. Efforts: 1.5 MD's
            2. Implementation details:
               1.  Update the schema for `generateReport` API to add the custom_agent_id in the PDF.
