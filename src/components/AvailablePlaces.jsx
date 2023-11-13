import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../HTTP.js";

export default function AvailablePlaces({ onSelectPlace }) {
	const [AvailablePlaces, setAvailablePlaces] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		async function fetchPlaces() {
			setIsFetching(true);
			try {
				const places = await fetchAvailablePlaces();
				navigator.geolocation.getCurrentPosition((pos) => {
					const srotedPlaces = sortPlacesByDistance(
						places,
						pos.coords.altitude,
						pos.coords.longitude
					);
					setAvailablePlaces(srotedPlaces);
					setIsFetching(false);
				});
			} catch (error) {
				setError({ message: error.message || "could not fetch places" });
				setIsFetching(false);
			}
		}
		fetchPlaces();
	}, []);

	if (error) {
		return (
			<Error
				title="An error occurred!"
				message={error.message}
			/>
		);
	}
	return (
		<Places
			title="Available Places"
			places={AvailablePlaces}
			isLoading={isFetching}
			loadingText="Fetching places data..."
			fallbackText="No places available."
			onSelectPlace={onSelectPlace}
		/>
	);
}
