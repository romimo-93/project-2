SELECT * FROM airline_accidents
FULL OUTER JOIN ntsb_aviation_data
ON airline_accidents.registration_number = ntsb_aviation_data.acft_regist_nbr;

SELECT * FROM faa_incidents_data 
FULL OUTER JOIN world_aircraft_accident_summary
ON faa_incidents_data.operator = world_aircraft_accident_summary.aircraft_operator;