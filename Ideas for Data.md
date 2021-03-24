#### Everyone can add a few links with descriptions of what kind of data they would like, and we can meet sunday to discuss #

## World Tour
#### Premise
Use this [d3 animation](https://observablehq.com/@d3/world-tour) to navigate the world by a few different categories:
* Alphabetical
* Population (highest to lowest)
* GDP?
* Latitude (North-to-South & South-to-North)
* Longitude (East-to-West & West-to-East)

#### How
1. Use an API to get all current country population and GDP data
2. Pipe that in as the dataset for d3 to use

#### User Actions
* Select different categories to order the animation by
----

## Election Results
#### Premise
Use this [d3 chart](https://observablehq.com/@d3/choropleth) to visualize the election results from as far back as we can get data

#### How
1. Pull election results data (i.e. https://electionlab.mit.edu/data)
2. Have the map update based on user-provided selections

#### User Actions
* Use a slider to navigate time
* Select Election type (Presidential, Senate, Congress)
* Stretch Goal - Select a specific state and have the state background become a red-blue gradient for how it has voted over time

----
## Olympics World Tour
### Premise 
Playing off of Andrews world tour idea, and since the Olympics are this summer, we could use this Olympics API (https://olympics.pressassociation.io/docs/phase-result) to navigate the world by a few different Olympics related categories that the API provides:
* Athlete 
* Event type (i.e "Speed skating" "swimming" etc.)
* Medal Count 
* Competitor rank

#### How 
1. Pull the desired data off of the Olympics API and plug it in as the data for D3 to use 

### User Actions
* Select different categories to order the animation by 

## Crypto Currency
#### How
1. looking at several APIs for Crypto currency and determining what cryptos currencies are more volatile then others, maybe what they are used for.
----
## Breweries around the world
1. we can map breweries around the US and see what types of beer are more common in specific states. could be fun. here is the link for the api, its free nad no auth code needed. 
2. https://api.openbrewerydb.org/breweries

----

## Data Science Postings on Glassdoor
### How
1. With this dataset we could map out all the locations that have postings, and then create some other visualizations of things like Salary v. Location, Size v. Rating, Industry v. Salary, etc. https://www.kaggle.com/rashikrahmanpritom/data-science-job-posting-on-glassdoor

----
## International Tourism Demographics
### How
1. This dataset provides data on International inbound tourists (overnight visitors), International outbound tourists, and International tourism expenditures for every (or nearly every) country from 1960 to 2020.  There are honestly a million things I feel like we could do with this data, it's a super good source and would definitely provide a lot of good visualizations with any of the data we choose. https://www.kaggle.com/ayushggarg/international-tourism-demographics

## California Housing Prices
1. https://www.kaggle.com/camnugent/california-housing-prices

## Airline accidents 
1. We could look at where around the globe airline accidents occur, and if there are any trends on types of airline or countries./regions they occur in. 
2. Could determine what airlines are most and least safe. 
3. have user input airpork code like JKF or LAX and have it filter a data table specifally for that. 
4. d3 visualization of world globe that can show where the airline wrecks are around the world based on lat and long. 
5. https://www.kaggle.com/prathamsharma123/aviation-accidents-and-incidents-ntsb-faa-waas
