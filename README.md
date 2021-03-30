# Airline accidents
1. Where around the globe do airline accidents occur most
2. Are there any trends on types of airline or countries/regions they occur in.
3. Could determine what airlines are most and least safe.
4. Have user input an airport code like JKF or LAX and have it filter a data table specifically for that.
5. d3 visualization of world globe that can show where the airline wrecks are around the world based on lat and long.

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
    * Training for pilots based on accident reports.
---
### Requirements:
1. Database: SQL --> https://cloud.google.com/sql/docs --> **Jenny**
2. Flask: app.py to host the data. Bellybutton hw html --> **Tanlin/Andrew** 
3. A custom "creative" D3.js Project
4.  New JS library --> TBD (i.e. [animeJS](https://animejs.com/) or [premonish](https://mathisonian.github.io/premonish/))


### Vizualizations
1. Calendar view --> https://observablehq.com/@d3/calendar-view --> **Andrew**
    * when we zoom in have it run a different file (animation) with new data based on the specific day that is clicked on.
2. Global view --> https://observablehq.com/@d3/world-tour --> **Tanlin**
3. menus, dropdowns, textboxes --> **Romi**
    * Table with user input for airline. 
4. Data comparisons/ side by side comparisons with bar,scatter --> **Jenny**
    * Comparisons of airline(groupby) and fatalities

### Time Line
* Complete Flask: **March 31st**
* Complete SQL: **April 1st**
* Visualizations worked on in own time
* Milestone: **April 3rd**: By end of day have calendar complete and functions figured out. Add in a JS library.
* Complete Project by: **April 7th**
* Visualizations worked on in own time
* Presentation: **April 10th**
  
