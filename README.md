# project-2

![image](https://user-images.githubusercontent.com/73146401/111664589-2bef1180-87cf-11eb-9e81-c57b077bb4c4.png)

## Airline accidents
1. We could look at where around the globe airline accidents occur, and if there are any trends on types of airline or countries./regions they occur in.
2. Could determine what airlines are most and least safe.
3. have user input airpork code like JKF or LAX and have it filter a data table specifally for that.
4. d3 visualization of world globe that can show where the airline wrecks are around the world based on lat and long.

### Proposal

[Airline Dataset](https://www.kaggle.com/prathamsharma123/aviation-accidents-and-incidents-ntsb-faa-waas)  
Initial View: [Calendar View](https://observablehq.com/@d3/calendar-view)  
User Action - click calendar square: [World Animation](https://observablehq.com/@d3/world-tour)

1. Who is our audience? 
    * General Public
    * Travelers, FAA, DSB,
    * Specific Airlines
3. Which decision is going to be made and when? 
    * General public/travelers before they go on a flight. 
    * FAA, DSB, Airlines while determining regulations and flight paths. 
4. Why is it important? 
    * Could save lives
    * Be more informed. 
    * Viewing trends that can minimize crashes in the future. 
5. What actions can be taken? 
    * Avoid specific airlines
    * Training for pilots based on times of the year wrecks occur most.
---
### Requirements:
1. Database: MongoDB or SQL --> https://cloud.google.com/sql/docs --> Jenny/Andrew
2. "A custom "creative" D3.js Project"
3.  New JS library --> TBD
4.  menus, dropdowns, textboxes
    * Table with user input for airline. 

### Vizualizations
1. Calendar view --> https://observablehq.com/@d3/calendar-view
    * when we zoom in have it run a different file (animation) with new data based on the specific day that is clicked on.
2. Global view --> https://observablehq.com/@d3/world-tour
