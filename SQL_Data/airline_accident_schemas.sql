-- Create table for airline_accidents.csv
DROP TABLE airline_accidents;

CREATE TABLE airline_accidents (
	id SERIAL,
	event_id VARCHAR, 
	investigation_type VARCHAR,
	accident_number VARCHAR, 
	event_date VARCHAR, 
	location VARCHAR, 
	country VARCHAR, 
	latitude VARCHAR, 
	longitude VARCHAR,
	airport_code VARCHAR, 
	airport_name VARCHAR, 
	injury_severity VARCHAR, 
	aircraft_damage VARCHAR, 
	aircraft_category VARCHAR, 
	registration_number VARCHAR, 
	make VARCHAR, 
	model VARCHAR, 
	amateur_built VARCHAR, 
	number_of_engines VARCHAR, 
	engine_type VARCHAR, 
	FAR_description VARCHAR, 
	schedule VARCHAR, 
	purpose_of_flight VARCHAR, 
	air_carrier VARCHAR, 
	total_fatal_injuries VARCHAR, 
	total_serious_injuries VARCHAR, 
	total_minor_injuries VARCHAR, 
	total_uninjured VARCHAR, 
	weather_condition VARCHAR, 
	broad_phase_of_flight VARCHAR, 
	report_publication_date VARCHAR, 
	PRIMARY KEY(id)
);

COPY airline_accidents(Event_Id, 
	investigation_type,
	accident_number, 
	event_date, 
	location, 
	country, 
	latitude, 
	longitude,
	airport_code, 
	airport_name, 
	injury_severity, 
	aircraft_damage, 
	aircraft_category, 
	registration_number, 
	make, 
	model, 
	amateur_built, 
	number_of_engines, 
	engine_type, 
	FAR_description, 
	schedule, 
	purpose_of_flight, 
	air_carrier, 
	total_fatal_injuries, 
	total_serious_injuries, 
	total_minor_injuries, 
	total_uninjured, 
	weather_condition, 
	broad_phase_of_flight, 
	report_publication_date)
FROM 'C:\Users\Public\Documents\airline_accident_data\airline_accidents.csv'
DELIMITER ','
CSV HEADER;

SELECT * FROM airline_accidents;
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 

-- Create table for faa_incidents_data.csv
DROP TABLE faa_incidents_data;

CREATE TABLE faa_incidents_data (
	id SERIAL,
	AIDS_report VARCHAR, 
	local_event_date DATE,
	event_city VARCHAR, 
	event_state VARCHAR, 
	event_airport VARCHAR, 
	event_type VARCHAR, 
	aircraft_damage VARCHAR, 
	flight_phase VARCHAR, 
	aircraft_make VARCHAR, 
	aircraft_model VARCHAR,
	aircraft_series VARCHAR, 
	operator VARCHAR,
	primary_flight_type VARCHAR,
	flight_conduct_code VARCHAR, 
	flight_plan_filed_code VARCHAR,
	aircraft_registration_nbr VARCHAR,
	total_fatalities INTEGER, 
	total_injuries INTEGER,
	aircraft_engine_make VARCHAR,
	aircraft_engine_model VARCHAR, 
	engine_group_code VARCHAR, 
	nbr_of_engines INTEGER,
	PIC_certificate_type VARCHAR,
	PIC_flight_time_total_hours INTEGER,
	PIC_flight_time_total_make_model INTEGER, 
	PRIMARY KEY(id)
);

COPY faa_incidents_data (
	AIDS_report, 
	local_event_date,
	event_city, 
	event_state, 
	event_airport, 
	event_type, 
	aircraft_damage, 
	flight_phase, 
	aircraft_make, 
	aircraft_model,
	aircraft_series, 
	operator,
	primary_flight_type,
	flight_conduct_code, 
	flight_plan_filed_code,
	aircraft_registration_nbr,
	total_fatalities, 
	total_injuries,
	aircraft_engine_make,
	aircraft_engine_model, 
	engine_group_code, 
	nbr_of_engines,
	PIC_certificate_type,
	PIC_flight_time_total_hours,
	PIC_flight_time_total_make_model) 
	FROM 'C:\Users\Public\Documents\airline_accident_data\faa_incidents_data.csv'
	DELIMITER ','
	CSV HEADER;
	
SELECT * FROM faa_incidents_data;



-- Create table for ntsb_aviation_data.csv
DROP TABLE ntsb_aviation_data;

CREATE TABLE ntsb_aviation_data(
	id SERIAL, 
	ntsb_rprt_nbr VARCHAR, 
	acft_regist_nbr VARCHAR, 
	acft_serial_nbr VARCHAR, 
	ev_type_desc VARCHAR, 
	event_lcl_date VARCHAR,
	loc_state_code_std VARCHAR, 
	aprt_name_std VARCHAR, 
	fltcndct_desc VARCHAR, 
	oprtr_sched_desc VARCHAR, 
	oprtr_nsdc_name_std VARCHAR,
	acft_nsdc_make_std VARCHAR, 
	acft_csdc_model_std VARCHAR, 
	acft_nsdc_series_std VARCHAR,
	report_status VARCHAR, 
	injury_desc VARCHAR,
	flight_phase_desc VARCHAR, 
	PRIMARY KEY(id)
	
);

COPY ntsb_aviation_data (
	ntsb_rprt_nbr, 
	acft_regist_nbr, 
	acft_serial_nbr, 
	ev_type_desc, 
	event_lcl_date,
	loc_state_code_std, 
	aprt_name_std, 
	fltcndct_desc, 
	oprtr_sched_desc, 
	oprtr_nsdc_name_std,
	acft_nsdc_make_std, 
	acft_csdc_model_std, 
	acft_nsdc_series_std,
	report_status, 
	injury_desc,
	flight_phase_desc)
FROM 'C:\Users\Public\Documents\airline_accident_data\ntsb_aviation_data.csv'
DELIMITER ','
CSV HEADER;

SELECT * FROM ntsb_aviation_data;


-- Create table for world_aircraft_accident_summary.csv
DROP TABLE world_aircraft_accident_summary;

CREATE TABLE world_aircraft_accident_summary(
	id SERIAL, 
	WAAS_subset_event_id VARCHAR, 
	local_event_date VARCHAR, 
	aircraft VARCHAR, 
	aircraft_operator VARCHAR, 
	event_location VARCHAR, 
	crew_fatalities INTEGER, 
	crew_injured INTEGER,
	crew_aboard INTEGER, 
	PAX_fatalities INTEGER, 
	PAX_injuries INTEGER, 
	PAX_aboard INTEGER,
	PRIMARY KEY(id)
);

COPY world_aircraft_accident_summary(
	WAAS_subset_event_id, 
	local_event_date, 
	aircraft, 
	aircraft_operator, 
	event_location, 
	crew_fatalities, 
	crew_injured,
	crew_aboard, 
	PAX_fatalities, 
	PAX_injuries, 
	PAX_aboard)
FROM 'C:\Users\Public\Documents\airline_accident_data\world_aircraft_accident_summary.csv'
DELIMITER ','
CSV HEADER;

SELECT * FROM world_aircraft_accident_summary;


